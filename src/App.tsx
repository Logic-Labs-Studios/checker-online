import { useState, useEffect } from 'react';
import { Peer } from 'peerjs';
import Game from './components/Game';
import SocialShare from './components/SocialShare';
import { Copy, Users, Play, Bot, Moon, Sun, Monitor } from 'lucide-react';
import { getTranslation, Language, languages } from './lib/i18n';

type Theme = 'light' | 'dark' | 'system';

export default function App() {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerId, setPeerId] = useState<string>('');
  const [connection, setConnection] = useState<any>(null);
  const [joinId, setJoinId] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [isBotMode, setIsBotMode] = useState<boolean>(false);

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && languages.some(l => l.code === saved)) return saved;
    const browserLang = navigator.language.split('-')[0] as Language;
    return languages.some(l => l.code === browserLang) ? browserLang : 'en';
  });

  const t = getTranslation(lang);

  useEffect(() => {
    document.title = t.seoTitle;
    document.documentElement.lang = lang;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.seoDescription);
    }
    localStorage.setItem('lang', lang);
  }, [lang, t]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Check URL for room ID
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
    if (room) {
      setJoinId(room);
    }
  }, []);

  const createGame = () => {
    if (!playerName.trim()) {
      setError(t.errorName);
      return;
    }
    setError('');
    const newPeer = new Peer();
    newPeer.on('open', (id) => {
      setPeerId(id);
      setIsHost(true);
      setPeer(newPeer);
    });

    newPeer.on('connection', (conn) => {
      conn.on('open', () => {
        setConnection(conn);
        setGameStarted(true);
      });
    });

    newPeer.on('error', (err) => {
      setError(t.errorCreate + err.message);
    });
  };

  const joinGame = () => {
    if (!playerName.trim()) {
      setError(t.errorName);
      return;
    }
    if (!joinId) return;
    setError('');
    
    const newPeer = new Peer();
    newPeer.on('open', () => {
      const conn = newPeer.connect(joinId);
      conn.on('open', () => {
        setConnection(conn);
        setIsHost(false);
        setGameStarted(true);
      });
      conn.on('error', (err) => {
        setError('Connection error: ' + err.message);
      });
    });

    newPeer.on('error', (err) => {
      setError(t.errorJoin + err.message);
    });
    
    setPeer(newPeer);
  };

  const copyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('room', peerId);
    navigator.clipboard.writeText(url.toString());
  };

  const startBotGame = () => {
    if (!playerName.trim()) {
      setError(t.errorName);
      return;
    }
    setError('');
    setIsBotMode(true);
    setIsHost(true);
    setGameStarted(true);
  };

  const handleQuitGame = () => {
    setGameStarted(false);
    setConnection(null);
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setJoinId('');
    setPeerId('');
  };

  if (gameStarted && (connection || isBotMode)) {
    return <Game connection={connection} isHost={isHost} playerName={playerName} isBotMode={isBotMode} onQuit={handleQuitGame} lang={lang} />;
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col items-center justify-center p-4 font-sans relative transition-colors duration-300">
      {/* Top right controls */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {/* Language Select */}
        <select 
          value={lang} 
          onChange={(e) => setLang(e.target.value as Language)}
          className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-600 cursor-pointer shadow-sm transition-colors"
        >
          {languages.map(l => (
            <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
          ))}
        </select>

        {/* Theme Switcher */}
        <div className="bg-white dark:bg-stone-800 rounded-full shadow-sm border border-stone-200 dark:border-stone-700 flex overflow-hidden">
          <button onClick={() => setTheme('light')} className={`p-2 transition-colors ${theme === 'light' ? 'bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'}`} title="Modo Claro"><Sun size={18} /></button>
          <button onClick={() => setTheme('dark')} className={`p-2 transition-colors ${theme === 'dark' ? 'bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'}`} title="Modo Escuro"><Moon size={18} /></button>
          <button onClick={() => setTheme('system')} className={`p-2 transition-colors ${theme === 'system' ? 'bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'}`} title="Sistema"><Monitor size={18} /></button>
        </div>
      </div>

      <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-8 space-y-8 border border-transparent dark:border-stone-800 transition-colors duration-300 my-8">
        <div className="text-center space-y-2">
          <img src="/logo.png" alt="Damas Online Logo" className="w-24 h-24 mx-auto drop-shadow-sm rounded-2xl mb-4 pointer-events-none" />
          <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-100 tracking-tight">{t.title}</h1>
          <p className="text-stone-500 dark:text-stone-400">{t.subtitle}</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800/50">
            {error}
          </div>
        )}

        {!peerId ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300 block">{t.yourName}</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={t.enterName}
                className="w-full px-4 py-3 border border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-600 transition-all"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={createGame}
                disabled={!playerName.trim()}
                className="w-full py-4 px-6 bg-stone-900 dark:bg-stone-700 hover:bg-stone-800 dark:hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Users size={20} />
                {t.createGame}
              </button>

              <button
                onClick={startBotGame}
                disabled={!playerName.trim()}
                className="w-full py-4 px-6 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed text-stone-800 dark:text-stone-100 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Bot size={20} />
                {t.playComputer}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200 dark:border-stone-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400">{t.or}</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300 block">{t.joinExisting}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                  placeholder={t.roomId}
                  className="flex-1 px-4 py-3 border border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-600 transition-all"
                />
                <button
                  onClick={joinGame}
                  disabled={!joinId || !playerName.trim()}
                  className="px-6 py-3 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed text-stone-800 dark:text-white rounded-xl font-medium transition-colors"
                >
                  {t.enter}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-700 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-stone-200 dark:bg-stone-700 rounded-full flex items-center justify-center animate-pulse">
                  <Users className="text-stone-500 dark:text-stone-400" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-stone-800 dark:text-stone-100">{t.waitingOpponent}</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{t.shareLink}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-white dark:bg-stone-900 p-2 rounded-lg border border-stone-200 dark:border-stone-700">
                <input 
                  type="text" 
                  readOnly 
                  value={`${window.location.origin}?room=${peerId}`}
                  className="flex-1 bg-transparent text-sm text-stone-600 dark:text-stone-300 outline-none px-2"
                />
                <button 
                  onClick={copyLink}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors text-stone-600 dark:text-stone-400"
                  title={t.copyLink}
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <SocialShare lang={lang} />
      </div>
    </div>
  );
}
