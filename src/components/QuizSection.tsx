import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/tajwidData';
import { TajwidType } from '../types';
import { CheckCircle2, XCircle, Volume2, RotateCcw, ArrowRight, Trophy, Sparkles, Sun, Moon } from 'lucide-react';
import { playSuccessSound, playWrongSound, playTapSound, speakArabic } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  onPlayGame: () => void;
}

export default function QuizSection({ onPlayGame }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<TajwidType | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleAnswer = (choice: TajwidType) => {
    if (isAnswered) return;

    setSelectedAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      playSuccessSound();
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Safe fallback
      }
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    playTapSound();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      if (score >= QUIZ_QUESTIONS.length * 0.7) {
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch {
          // Safe fallback
        }
      }
    }
  };

  const handleRestart = () => {
    playTapSound();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const isCurrentCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-3xl mx-auto px-4">
      {/* Header Bento Style */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">
          Latihan Interaktif
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900" id="quiz-title">
          Kuis Tajwid Alif Lam
        </h1>
        <p className="text-slate-600 text-sm">
          Uji ketelitianmu dalam menentukan apakah suatu kata termasuk Syamsiyah atau Qamariyah.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-100">
            <span className="font-semibold text-slate-700">
              Pertanyaan {currentIndex + 1} dari {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              <Trophy className="w-3.5 h-3.5 text-indigo-600" />
              <span>Skor: {score}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-2 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text in format: “الشَّمْسُ termasuk Alif Lam apa?” */}
          <div className="text-center py-6 px-4 bg-slate-50 rounded-[28px] border border-slate-200/80 space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
              &ldquo;<span className="font-quran text-3xl sm:text-4xl text-indigo-950 font-bold px-1.5 inline-block" dir="rtl">{currentQuestion.wordArabic}</span>&rdquo; termasuk Alif Lam apa?
            </h2>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-semibold">{currentQuestion.wordLatin}</span>
              <span>•</span>
              <span>Artinya: &ldquo;{currentQuestion.meaning}&rdquo;</span>
              <button
                onClick={() => {
                  playTapSound();
                  speakArabic(currentQuestion.wordArabic);
                }}
                className="p-1 rounded-full hover:bg-slate-200 text-slate-600 ml-1 transition-colors"
                title="Dengarkan pelafalan"
                aria-label={`Dengarkan pelafalan ${currentQuestion.wordArabic}`}
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
          </div>

          {/* 2 Main Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option 1: Syamsiyah */}
            <button
              onClick={() => handleAnswer('syamsiyah')}
              disabled={isAnswered}
              id="quiz-option-syamsiyah"
              className={`p-5 rounded-2xl border-2 text-left transition-all font-bold flex items-center justify-between cursor-pointer ${
                !isAnswered
                  ? 'border-amber-200 hover:border-amber-400 bg-amber-50/40 hover:bg-amber-50 text-slate-800 active:scale-98 shadow-xs'
                  : currentQuestion.correctAnswer === 'syamsiyah'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                  : selectedAnswer === 'syamsiyah'
                  ? 'border-rose-400 bg-rose-50 text-rose-900'
                  : 'border-slate-200 bg-slate-50 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-200/70 text-amber-800">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base">Alif Lam Syamsiyah</p>
                  <p className="text-xs font-arabic text-slate-500 font-normal">الـ الشَّمْسِيَّة</p>
                </div>
              </div>

              {isAnswered && (
                <div>
                  {currentQuestion.correctAnswer === 'syamsiyah' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : selectedAnswer === 'syamsiyah' ? (
                    <XCircle className="w-6 h-6 text-rose-500" />
                  ) : null}
                </div>
              )}
            </button>

            {/* Option 2: Qamariyah */}
            <button
              onClick={() => handleAnswer('qamariyah')}
              disabled={isAnswered}
              id="quiz-option-qamariyah"
              className={`p-5 rounded-2xl border-2 text-left transition-all font-bold flex items-center justify-between cursor-pointer ${
                !isAnswered
                  ? 'border-sky-200 hover:border-sky-400 bg-sky-50/40 hover:bg-sky-50 text-slate-800 active:scale-98 shadow-xs'
                  : currentQuestion.correctAnswer === 'qamariyah'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                  : selectedAnswer === 'qamariyah'
                  ? 'border-rose-400 bg-rose-50 text-rose-900'
                  : 'border-slate-200 bg-slate-50 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-200/70 text-sky-900">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base">Alif Lam Qamariyah</p>
                  <p className="text-xs font-arabic text-slate-500 font-normal">الـ الْقَمَرِيَّة</p>
                </div>
              </div>

              {isAnswered && (
                <div>
                  {currentQuestion.correctAnswer === 'qamariyah' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : selectedAnswer === 'qamariyah' ? (
                    <XCircle className="w-6 h-6 text-rose-500" />
                  ) : null}
                </div>
              )}
            </button>
          </div>

          {/* Feedback Display */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-5 rounded-2xl border space-y-2 ${
                  isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
                id="quiz-feedback-box"
              >
                <div className="flex items-center gap-2 font-bold text-base">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>✅ Benar! MasyaAllah.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-700" />
                      <span>❌ Belum tepat. Coba perhatikan huruf setelah ال.</span>
                    </>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-slate-700 pl-7">
                  {currentQuestion.explanation}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    id="quiz-next-button"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz Finished Result Screen Bento Style */
        <div className="bg-white rounded-[32px] border border-slate-200 p-8 text-center space-y-6 shadow-xs" id="quiz-result-screen">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Kuis Selesai! Barakallahu fiik 🎉
            </h2>
            <p className="text-slate-600 text-sm">
              Kamu berhasil menyelesaikan seluruh {QUIZ_QUESTIONS.length} pertanyaan kuis.
            </p>
          </div>

          <div className="inline-block bg-slate-50 border border-slate-200 rounded-3xl p-6 min-w-[220px]">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Skor Kamu
            </p>
            <p className="text-5xl font-extrabold text-indigo-600 my-1 font-mono">
              {score} <span className="text-2xl text-slate-400 font-normal">/ {QUIZ_QUESTIONS.length}</span>
            </p>
            <p className="text-xs font-semibold text-slate-600">
              {score === QUIZ_QUESTIONS.length 
                ? 'Sempurna! Kamu memahami Alif Lam dengan sangat baik.' 
                : score >= QUIZ_QUESTIONS.length * 0.7 
                ? 'Hebat! Terus pertahankan belajarnya.' 
                : 'Bagus! Coba ulangi lagi untuk semakin lancar.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
              id="restart-quiz-button"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              onClick={() => {
                playTapSound();
                onPlayGame();
              }}
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
              id="try-game-button"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mainkan Game Mengelompokkan Huruf</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
