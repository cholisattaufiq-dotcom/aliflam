import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYAMSIYAH_LETTERS, QAMARIYAH_LETTERS } from '../data/tajwidData';
import { TajwidLetter, TajwidType } from '../types';
import { Sun, Moon, RotateCcw, Trophy, Flame, CheckCircle, XCircle, Sparkles, Volume2 } from 'lucide-react';
import { playSuccessSound, playWrongSound, playTapSound, speakArabic } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GameItem {
  letter: TajwidLetter;
  id: string;
}

export default function SortingGame() {
  // Pool of all 28 letters
  const allLetters: TajwidLetter[] = useMemo(() => {
    return [...SYAMSIYAH_LETTERS, ...QAMARIYAH_LETTERS];
  }, []);

  const [queue, setQueue] = useState<TajwidLetter[]>([]);
  const [currentLetter, setCurrentLetter] = useState<TajwidLetter | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; message: string; letter: string } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('tajwid_game_highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10) || 0);
    }
  }, []);

  // Shuffle & start game
  const initGame = () => {
    playTapSound();
    const shuffled = [...allLetters].sort(() => Math.random() - 0.5);
    setQueue(shuffled.slice(1));
    setCurrentLetter(shuffled[0]);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setLastFeedback(null);
    setGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, [allLetters]);

  const handleClassify = (chosenType: TajwidType) => {
    if (!currentLetter || gameOver) return;

    const isCorrect = currentLetter.type === chosenType;

    if (isCorrect) {
      playSuccessSound();
      const points = 10 + streak * 2;
      const newScore = score + points;
      const newCorrect = correctCount + 1;
      const newStreak = streak + 1;

      setScore(newScore);
      setCorrectCount(newCorrect);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('tajwid_game_highscore', newScore.toString());
      }

      setLastFeedback({
        isCorrect: true,
        message: `Benar! Huruf ${currentLetter.name} (${currentLetter.letter}) adalah huruf ${chosenType === 'syamsiyah' ? 'Syamsiyah ☀️' : 'Qamariyah 🌙'}.`,
        letter: currentLetter.letter
      });

      // Micro confetti on streak milestone
      if (newStreak % 5 === 0) {
        try {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 }
          });
        } catch {
          // Ignore
        }
      }
    } else {
      playWrongSound();
      setWrongCount(prev => prev + 1);
      setStreak(0);

      setLastFeedback({
        isCorrect: false,
        message: `Kurang tepat. Huruf ${currentLetter.name} (${currentLetter.letter}) sebenarnya adalah huruf ${currentLetter.type === 'syamsiyah' ? 'Syamsiyah ☀️' : 'Qamariyah 🌙'}!`,
        letter: currentLetter.letter
      });
    }

    // Move to next letter or finish
    if (queue.length > 0) {
      const next = queue[0];
      setQueue(queue.slice(1));
      setCurrentLetter(next);
    } else {
      // Game completed
      setGameOver(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // Ignore
      }
    }
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-4xl mx-auto px-4">
      {/* Title Header Bento Style */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">
          Game Tajwid Edukatif
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900" id="game-title">
          Masukkan Huruf ke Kelompok yang Tepat
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Perhatikan huruf hijaiyah yang muncul secara acak, lalu masukkan ke dalam kelompok <strong>Syamsiyah ☀️</strong> atau <strong>Qamariyah 🌙</strong>!
        </p>
      </div>

      {/* Stats Board Bento Box */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-[32px] border border-slate-200/90 shadow-xs">
        <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Skor Saat Ini</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-mono" id="game-score-display">
            {score}
          </p>
        </div>

        <div className="text-center p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
          <p className="text-[11px] font-semibold text-emerald-800 uppercase">Jawaban Benar</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono" id="game-correct-count">
            {correctCount}
          </p>
        </div>

        <div className="text-center p-3 rounded-2xl bg-amber-50 border border-amber-100">
          <div className="flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <p className="text-[11px] font-semibold text-amber-800 uppercase">Streak</p>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
            {streak}🔥
          </p>
        </div>

        <div className="text-center p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
          <div className="flex items-center justify-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-indigo-600" />
            <p className="text-[11px] font-semibold text-indigo-900 uppercase">Rekor</p>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono">
            {highScore}
          </p>
        </div>
      </div>

      {!gameOver && currentLetter ? (
        <div className="space-y-6">
          {/* Main Card Arena Bento Box */}
          <div className="relative bg-white rounded-[32px] border-2 border-slate-200 p-8 text-center shadow-xs overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
            {/* Progress indicator */}
            <div className="absolute top-4 left-6 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Sisa huruf: {queue.length + 1}
            </div>

            <button
              onClick={() => {
                playTapSound();
                speakArabic(currentLetter.letter);
              }}
              className="absolute top-4 right-6 p-2.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-colors cursor-pointer"
              title="Dengarkan pengucapan huruf"
              aria-label={`Dengarkan huruf ${currentLetter.letter}`}
            >
              <Volume2 className="w-5 h-5" />
            </button>

            {/* Huge Random Arabic Letter with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLetter.id}
                initial={{ scale: 0.6, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="select-none flex flex-col items-center py-4"
              >
                <div 
                  className="font-quran text-7xl sm:text-8xl text-slate-800 font-bold drop-shadow-xs"
                  dir="rtl"
                >
                  {currentLetter.letter}
                </div>
                <p className="text-lg font-bold text-slate-800 mt-3">
                  Huruf {currentLetter.name} ({currentLetter.transliteration})
                </p>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Contoh: {currentLetter.sampleWord} ({currentLetter.sampleWordRead})
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Classification Buttons / Drop Target Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Syamsiyah Target */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClassify('syamsiyah')}
              id="game-btn-syamsiyah"
              className="p-6 rounded-[28px] bg-gradient-to-br from-amber-400 to-amber-500 text-white font-bold text-left shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer border border-amber-300"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sun className="w-6 h-6 text-amber-100 group-hover:rotate-45 transition-transform" />
                  <span className="text-xl">Syamsiyah ☀️</span>
                </div>
                <p className="text-xs text-amber-50 font-normal">
                  Lam tidak dibaca (lebur ke tasydid)
                </p>
              </div>
              <span className="font-arabic text-2xl opacity-95" dir="rtl">الشَّمْسِيَّة</span>
            </motion.button>

            {/* Qamariyah Target */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClassify('qamariyah')}
              id="game-btn-qamariyah"
              className="p-6 rounded-[28px] bg-gradient-to-br from-sky-600 to-indigo-700 text-white font-bold text-left shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer border border-sky-400"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Moon className="w-6 h-6 text-sky-200 group-hover:-rotate-12 transition-transform" />
                  <span className="text-xl">Qamariyah 🌙</span>
                </div>
                <p className="text-xs text-sky-100 font-normal">
                  Lam dibaca jelas (sukun)
                </p>
              </div>
              <span className="font-arabic text-2xl opacity-95" dir="rtl">الْقَمَرِيَّة</span>
            </motion.button>
          </div>

          {/* Feedback banner */}
          <AnimatePresence>
            {lastFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                  lastFeedback.isCorrect 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
                id="game-feedback-banner"
              >
                {lastFeedback.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span>{lastFeedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Game Over Screen Bento Style */
        <div className="bg-white rounded-[32px] border border-slate-200 p-8 text-center space-y-6 shadow-xs" id="game-over-screen">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Permainan Selesai! MasyaAllah 🌟
            </h2>
            <p className="text-slate-600 text-sm">
              Kamu telah mengelompokkan seluruh 28 huruf hijaiyah dengan sangat baik.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase">Total Skor</p>
              <p className="text-3xl font-bold text-slate-800 font-mono">{score}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-xs text-emerald-800 font-bold uppercase">Benar</p>
              <p className="text-3xl font-bold text-emerald-600 font-mono">{correctCount}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 col-span-2 sm:col-span-1">
              <p className="text-xs text-amber-800 font-bold uppercase">Streak Terbaik</p>
              <p className="text-3xl font-bold text-amber-600 font-mono">{maxStreak}🔥</p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={initGame}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xs transition-all active:scale-95 cursor-pointer"
              id="play-again-game-button"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Main Lagi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
