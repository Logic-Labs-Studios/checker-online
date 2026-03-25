export type Player = 1 | 2;
export type PieceType = 0 | 1 | 2 | 3 | 4; // 0: empty, 1: P1, 2: P2, 3: P1 King, 4: P2 King
export type BoardState = PieceType[][];

export interface Position {
  r: number;
  c: number;
}

export interface Move {
  to: Position;
  captured: Position[];
}

export const getPlayer = (piece: PieceType): Player | 0 => {
  if (piece === 1 || piece === 3) return 1;
  if (piece === 2 || piece === 4) return 2;
  return 0;
};

export const isKing = (piece: PieceType): boolean => piece === 3 || piece === 4;

const isValidPos = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;

export const createInitialBoard = (): BoardState => {
  const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(0));
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 1) {
        if (r < 3) board[r][c] = 2; // Player 2 (Black) at top
        else if (r > 4) board[r][c] = 1; // Player 1 (Red) at bottom
      }
    }
  }
  return board;
};

export const getValidMoves = (board: BoardState, player: Player): Map<string, Move[]> => {
  const moves = new Map<string, Move[]>();
  let canCapture = false;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (getPlayer(piece) !== player) continue;

      const pos = { r, c };
      const pieceMoves = getPieceMoves(board, pos, piece);
      
      if (pieceMoves.length > 0) {
        const captures = pieceMoves.filter(m => m.captured.length > 0);
        if (captures.length > 0) {
          canCapture = true;
          moves.set(`${r},${c}`, captures);
        } else if (!canCapture) {
          moves.set(`${r},${c}`, pieceMoves);
        }
      }
    }
  }

  // If any piece can capture, filter out non-capturing moves
  if (canCapture) {
    for (const [pos, posMoves] of moves.entries()) {
      const captures = posMoves.filter(m => m.captured.length > 0);
      if (captures.length === 0) {
        moves.delete(pos);
      } else {
        moves.set(pos, captures);
      }
    }
  }

  return moves;
};

const getPieceMoves = (board: BoardState, pos: Position, piece: PieceType): Move[] => {
  const moves: Move[] = [];
  const player = getPlayer(piece);
  const king = isKing(piece);
  const directions = [];

  if (player === 1 || king) directions.push({ dr: -1, dc: -1 }, { dr: -1, dc: 1 });
  if (player === 2 || king) directions.push({ dr: 1, dc: -1 }, { dr: 1, dc: 1 });

  // Check simple moves
  for (const dir of directions) {
    const nr = pos.r + dir.dr;
    const nc = pos.c + dir.dc;
    if (isValidPos(nr, nc) && board[nr][nc] === 0) {
      moves.push({ to: { r: nr, c: nc }, captured: [] });
    }
  }

  // Check jumps (captures)
  const jumps = getJumps(board, pos, piece, []);
  moves.push(...jumps);

  return moves;
};

const getJumps = (board: BoardState, pos: Position, piece: PieceType, capturedSoFar: Position[]): Move[] => {
  const jumps: Move[] = [];
  const player = getPlayer(piece);
  const king = isKing(piece);
  const directions = [];

  if (player === 1 || king) directions.push({ dr: -1, dc: -1 }, { dr: -1, dc: 1 });
  if (player === 2 || king) directions.push({ dr: 1, dc: -1 }, { dr: 1, dc: 1 });

  let canJumpFurther = false;

  for (const dir of directions) {
    const nr = pos.r + dir.dr;
    const nc = pos.c + dir.dc;
    const jr = pos.r + dir.dr * 2;
    const jc = pos.c + dir.dc * 2;

    if (isValidPos(jr, jc)) {
      const targetPiece = board[nr][nc];
      const jumpSquare = board[jr][jc];
      
      if (targetPiece !== 0 && getPlayer(targetPiece) !== player && jumpSquare === 0) {
        // Ensure we haven't already captured this piece in this sequence
        if (!capturedSoFar.some(c => c.r === nr && c.c === nc)) {
          canJumpFurther = true;
          const newCaptured = [...capturedSoFar, { r: nr, c: nc }];
          
          // Create a temporary board to check for further jumps
          const tempBoard = board.map(row => [...row]);
          tempBoard[pos.r][pos.c] = 0;
          tempBoard[nr][nc] = 0;
          tempBoard[jr][jc] = piece;

          // If it's a normal piece and it reaches the end, it promotes and ends the turn
          let promoted = false;
          if (!king && ((player === 1 && jr === 0) || (player === 2 && jr === 7))) {
            promoted = true;
          }

          if (!promoted) {
            const furtherJumps = getJumps(tempBoard, { r: jr, c: jc }, piece, newCaptured);
            if (furtherJumps.length > 0) {
              jumps.push(...furtherJumps);
            } else {
              jumps.push({ to: { r: jr, c: jc }, captured: newCaptured });
            }
          } else {
            jumps.push({ to: { r: jr, c: jc }, captured: newCaptured });
          }
        }
      }
    }
  }

  return jumps;
};

export const applyMove = (board: BoardState, from: Position, move: Move): { newBoard: BoardState, promoted: boolean } => {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[from.r][from.c];
  
  newBoard[from.r][from.c] = 0;
  newBoard[move.to.r][move.to.c] = piece;

  for (const cap of move.captured) {
    newBoard[cap.r][cap.c] = 0;
  }

  let promoted = false;
  const player = getPlayer(piece);
  if (!isKing(piece)) {
    if ((player === 1 && move.to.r === 0) || (player === 2 && move.to.r === 7)) {
      newBoard[move.to.r][move.to.c] = player === 1 ? 3 : 4;
      promoted = true;
    }
  }

  return { newBoard, promoted };
};
