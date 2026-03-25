import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DataConnection } from 'peerjs';
import { 
  BoardState, 
  Player, 
  Position, 
  Move, 
  createInitialBoard, 
  getValidMoves, 
  applyMove, 
  getPlayer 
} from '../lib/checkers';
import { cn } from '../lib/utils';
import { Crown, AlertCircle, History, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { getBotMove } from '../lib/bot';
import SocialShare from './SocialShare';
import { getTranslation, Language } from '../lib/i18n';

interface ChatMessage {
  sender: string;
  text: string;
  isMine: boolean;
}

interface GameProps {
  connection?: DataConnection | null;
  isHost: boolean;
  playerName: string;
  isBotMode?: boolean;
  onQuit?: () => void;
  lang: Language;
}

export default function Game({ connection, isHost, playerName, isBotMode, onQuit, lang }: GameProps) {
  const t = getTranslation(lang);
  const myPlayer: Player = isHost ? 1 : 2;
  const [board, setBoard] = useState<BoardState>(createInitialBoard());
  const [turn, setTurn] = useState<Player>(1);
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Map<string, Move[]>>(new Map());
  const [capturedP1, setCapturedP1] = useState(0); // Pieces P1 has captured
  const [capturedP2, setCapturedP2] = useState(0); // Pieces P2 has captured
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [opponentName, setOpponentName] = useState<string>(isBotMode ? t.botName : t.waiting);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Send our name to the opponent when the game component mounts
    if (connection) {
      connection.send({ type: 'SET_NAME', payload: { name: playerName } });
    }
  }, [connection, playerName]);

  useEffect(() => {
    // Recalculate valid moves whenever turn or board changes
    if (turn === myPlayer && !gameOver) {
      const moves = getValidMoves(board, myPlayer);
      setValidMoves(moves);
      
      // Check for game over (no valid moves)
      if (moves.size === 0) {
        handleGameOver(myPlayer === 1 ? 2 : 1);
      }
    } else {
      setValidMoves(new Map());
      setSelectedPos(null);
    }
  }, [board, turn, myPlayer, gameOver]);

  const boardRef = useRef<BoardState>(board);
  const turnRef = useRef<Player>(turn);

  useEffect(() => {
    boardRef.current = board;
    turnRef.current = turn;
  }, [board, turn]);

  useEffect(() => {
    if (!connection) return;

    const handleData = (data: any) => {
      if (data.type === 'MOVE') {
        const { from, move } = data.payload;
        
        // Use refs to get the latest state
        const currentBoard = boardRef.current;
        const currentTurn = turnRef.current;
        
        // Security Validation
        if (currentTurn === myPlayer) {
          console.warn('Jogada ignorada: O adversário tentou jogar fora da sua vez.');
          return;
        }

        const opponentValidMoves = getValidMoves(currentBoard, currentTurn);
        const possibleMoves = opponentValidMoves.get(`${from.r},${from.c}`);
        
        const isValidMove = possibleMoves?.some(m => 
          m.to.r === move.to.r && 
          m.to.c === move.to.c &&
          m.captured.length === move.captured.length
        );

        if (!isValidMove) {
          console.warn('Batota detetada: Movimento ilegal ignorado.');
          return;
        }

        const { newBoard, promoted } = applyMove(currentBoard, from, move);
        setBoard(newBoard);

        if (move.captured.length > 0) {
          if (currentTurn === 1) setCapturedP1(prev => prev + move.captured.length);
          else setCapturedP2(prev => prev + move.captured.length);
        }

        // End turn
        setSelectedPos(null);
        setTurn(currentTurn === 1 ? 2 : 1);
        
      } else if (data.type === 'GAME_OVER') {
        setGameOver(true);
        setWinner(data.payload.winner);
      } else if (data.type === 'SET_NAME') {
        setOpponentName(data.payload.name);
        // Reply with our name so they get it too
        connection.send({ type: 'SET_NAME_REPLY', payload: { name: playerName } });
      } else if (data.type === 'SET_NAME_REPLY') {
        setOpponentName(data.payload.name);
      } else if (data.type === 'CHAT_MESSAGE') {
        setMessages(prev => [...prev, { sender: data.payload.sender, text: data.payload.text, isMine: false }]);
      }
    };

    connection.on('data', handleData);
    
    return () => {
      connection.off('data', handleData);
    };
  }, [connection]);

  const handleGameOver = (winnerPlayer: Player) => {
    setGameOver(true);
    setWinner(winnerPlayer);
    if (connection) {
      connection.send({ type: 'GAME_OVER', payload: { winner: winnerPlayer } });
    }
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const text = chatInput.trim();
    setMessages(prev => [...prev, { sender: playerName, text, isMine: true }]);
    if (connection) {
      connection.send({ type: 'CHAT_MESSAGE', payload: { sender: playerName, text } });
    } else if (isBotMode) {
      // Bot replies randomly
      setTimeout(() => {
        const replies = [t.botReply1, t.botReply2, t.botReply3, t.botReply4];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages(prev => [...prev, { sender: t.botName, text: randomReply, isMine: false }]);
      }, 1000);
    }
    setChatInput('');
  };

  const executeMove = (from: Position, move: Move, isLocal: boolean) => {
    const { newBoard, promoted } = applyMove(board, from, move);
    setBoard(newBoard);

    if (move.captured.length > 0) {
      if (turn === 1) setCapturedP1(prev => prev + move.captured.length);
      else setCapturedP2(prev => prev + move.captured.length);
    }

    // End turn
    setSelectedPos(null);
    setTurn(turn === 1 ? 2 : 1);

    if (isLocal && connection) {
      connection.send({ type: 'MOVE', payload: { from, move } });
    }
  };

  useEffect(() => {
    if (isBotMode && turn === 2 && !gameOver) {
      const timer = setTimeout(() => {
        const botMove = getBotMove(board, 2);
        if (botMove) {
          executeMove(botMove.from, botMove.move, false);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [turn, board, isBotMode, gameOver]);

  const handleSquareClick = (r: number, c: number) => {
    if (turn !== myPlayer || gameOver) return;

    const posKey = `${r},${c}`;
    const piece = board[r][c];

    // If clicking on a valid move destination
    if (selectedPos) {
      const movesForSelected = validMoves.get(`${selectedPos.r},${selectedPos.c}`);
      const move = movesForSelected?.find(m => m.to.r === r && m.to.c === c);
      
      if (move) {
        executeMove(selectedPos, move, true);
        return;
      }
    }

    // If clicking on own piece
    if (getPlayer(piece) === myPlayer) {
      if (validMoves.has(posKey)) {
        setSelectedPos({ r, c });
      } else {
        // Provide feedback that this piece can't move
        setSelectedPos(null);
      }
    } else {
      setSelectedPos(null);
    }
  };

  const renderSquare = (r: number, c: number) => {
    const isDark = (r + c) % 2 === 1;
    const piece = board[r][c];
    const isSelected = selectedPos?.r === r && selectedPos?.c === c;
    
    let isHighlight = false;
    let isCaptureHighlight = false;

    if (selectedPos) {
      const moves = validMoves.get(`${selectedPos.r},${selectedPos.c}`);
      const move = moves?.find(m => m.to.r === r && m.to.c === c);
      if (move) {
        isHighlight = true;
        isCaptureHighlight = move.captured.length > 0;
      }
    }

    const isSelectable = validMoves.has(`${r},${c}`);

    return (
      <div
        key={`${r}-${c}`}
        onClick={() => handleSquareClick(r, c)}
        className={cn(
          "w-full aspect-square relative",
          isDark ? "bg-stone-800" : "bg-stone-200",
          isHighlight && "cursor-pointer",
          isSelectable && getPlayer(piece) === myPlayer && "cursor-pointer"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-2">
          {/* Highlight overlay */}
          {isHighlight && (
            <div className={cn(
              "absolute inset-0 opacity-40",
              isCaptureHighlight ? "bg-red-500" : "bg-green-500"
            )} />
          )}

          {/* Piece */}
          {piece !== 0 && (
            <div
              className={cn(
                "w-full h-full rounded-full shadow-md flex items-center justify-center transition-transform",
                (piece === 1 || piece === 3) ? "bg-red-600" : "bg-stone-100",
                isSelected && "ring-4 ring-yellow-400 scale-110 z-10",
                isSelectable && !isSelected && "hover:scale-105"
              )}
            >
              {/* Inner detail */}
              <div className={cn(
                "w-3/4 h-3/4 rounded-full border-2 opacity-50",
                (piece === 1 || piece === 3) ? "border-red-800" : "border-stone-300"
              )} />
              
              {/* King Crown */}
              {(piece === 3 || piece === 4) && (
                <Crown 
                  className={cn(
                    "absolute w-1/2 h-1/2",
                    piece === 3 ? "text-red-200" : "text-stone-400"
                  )} 
                  strokeWidth={2.5}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col items-center justify-center p-4 gap-8 font-sans transition-colors duration-300">
      
      {/* Top Banner with Quit button */}
      <div className="w-full max-w-5xl flex justify-between items-center bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-sm border border-transparent dark:border-stone-800 transition-colors">
        <h1 className="text-2xl font-outfit font-extrabold text-stone-800 dark:text-stone-100 tracking-tight">{t.title}</h1>
        {onQuit && (
          <button 
            onClick={onQuit}
            className="flex items-center gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition"
          >
            <ArrowLeft size={18} />
            {isBotMode ? t.quitStatus : t.backStatus}
          </button>
        )}
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
        {/* Main Game Area */}
        <div className="flex-1 max-w-2xl w-full space-y-6">
          {/* Header / Status */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm flex items-center justify-between border border-transparent dark:border-stone-800 transition-colors">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-4 h-4 rounded-full",
              myPlayer === 1 ? "bg-red-600" : "bg-stone-200 dark:bg-stone-700 border border-stone-300 dark:border-stone-600"
            )} />
            <div>
              <h2 className="font-bold text-stone-800 dark:text-white text-lg truncate max-w-[120px] sm:max-w-[200px]">{playerName}</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">{myPlayer === 1 ? t.reds : t.whites}</p>
            </div>
          </div>

          <div className="text-center px-6 py-2 rounded-full bg-stone-100 dark:bg-stone-800 font-medium text-stone-700 dark:text-stone-200">
            {gameOver ? (
              <span className="text-red-600 dark:text-red-400 font-bold">
                {winner === myPlayer ? t.youWon : t.youLost}
              </span>
            ) : turn === myPlayer ? (
              <span className="text-green-600 dark:text-green-400 flex items-center gap-2">
                <AlertCircle size={18} /> {t.yourTurn}
              </span>
            ) : (
              <span className="flex items-center gap-2 opacity-70 text-stone-600 dark:text-stone-300">
                <div className="w-2 h-2 rounded-full bg-stone-500 dark:bg-stone-400 animate-pulse" />
                {t.waiting}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <h2 className="font-bold text-stone-800 dark:text-white text-lg truncate max-w-[120px] sm:max-w-[200px]">{opponentName}</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">{myPlayer === 1 ? t.whites : t.reds}</p>
            </div>
            <div className={cn(
              "w-4 h-4 rounded-full",
              myPlayer === 1 ? "bg-stone-200 dark:bg-stone-700 border border-stone-300 dark:border-stone-600" : "bg-red-600"
            )} />
          </div>
        </div>

        {/* Board */}
        <div className="bg-white dark:bg-stone-900 p-4 sm:p-6 rounded-2xl shadow-xl border border-transparent dark:border-stone-800 transition-colors">
          <div className="grid grid-cols-8 grid-rows-8 border-4 border-stone-800 dark:border-stone-950 rounded-sm overflow-hidden">
            {Array.from({ length: 8 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, c) => renderSquare(r, c))
            )}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-full md:w-80 bg-white dark:bg-stone-900 rounded-2xl shadow-sm p-6 flex flex-col h-[600px] border border-transparent dark:border-stone-800 transition-colors">
        <div className="flex items-center gap-2 text-stone-800 dark:text-stone-100 font-bold text-xl border-b border-stone-100 dark:border-stone-800 pb-4 shrink-0">
          <History className="text-stone-400 dark:text-stone-500" />
          {t.stats}
        </div>

        <div className="space-y-4 mt-6 shrink-0">
          <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl flex justify-between items-center transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 shadow-sm" />
              <span className="font-medium text-stone-700 dark:text-stone-300">{t.reds}</span>
            </div>
            <div className="text-2xl font-bold text-stone-800 dark:text-white">
              {12 - (myPlayer === 1 ? capturedP2 : capturedP1)}
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl flex justify-between items-center transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 shadow-sm" />
              <span className="font-medium text-stone-700 dark:text-stone-300">{t.whites}</span>
            </div>
            <div className="text-2xl font-bold text-stone-800 dark:text-white">
              {12 - (myPlayer === 2 ? capturedP2 : capturedP1)}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800 shrink-0">
          <p className="text-xs text-stone-400 dark:text-stone-500 text-center">
            {t.rules}
          </p>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col mt-6 border-t border-stone-100 dark:border-stone-800 pt-6 min-h-0">
          <div className="flex items-center gap-2 text-stone-800 dark:text-stone-100 font-bold text-lg mb-4 shrink-0">
            <MessageSquare className="text-stone-400 dark:text-stone-500" size={20} />
            {t.chat}
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col", msg.isMine ? "items-end" : "items-start")}>
                <span className="text-[10px] text-stone-400 dark:text-stone-500 mb-1 px-1">{msg.sender}</span>
                <div className={cn("px-3 py-2 max-w-[90%]", msg.isMine ? "bg-stone-900 dark:bg-stone-700 text-white rounded-2xl rounded-tr-sm" : "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-2xl rounded-tl-sm")}>
                  <p className="text-sm break-words">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendChatMessage} className="flex gap-2 shrink-0">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t.message}
              className="flex-1 px-3 py-2 border border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-600 text-sm transition-colors"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="p-2 bg-stone-900 dark:bg-stone-700 text-white rounded-lg hover:bg-stone-800 dark:hover:bg-stone-600 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
      </div>
      
      {/* Social Share Footer */}
      <div className="w-full max-w-5xl bg-white dark:bg-stone-900 rounded-2xl shadow-sm px-6 py-6 border border-transparent dark:border-stone-800 transition-colors">
        <SocialShare className="" lang={lang} />
      </div>
    </div>
  );
}
