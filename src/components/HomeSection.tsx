import { useState } from 'react';
import { motion } from 'motion/react';
import { ActiveTab, ExampleWord } from '../types';
import { FEATURED_EXAMPLES, SYAMSIYAH_LETTERS, QAMARIYAH_LETTERS } from '../data/tajwidData';
import { Sun, Moon, ArrowRight, Sparkles, CheckCircle2, HelpCircle, Gamepad2, Volume2, RotateCcw } from 'lucide-react';
import { playTapSound, playSuccessSound, playWrongSound, speakArabic } from '../utils/audio';

interface Props {
  onStartLearning: (tab: ActiveTab) => void;
  onSelectWord: (word: ExampleWord) => void;
}

export default function HomeSection({ onStartLearning, onSelectWord }: Props) {
  const syamsiyahExamples = FEATURED_EXAMPLES.filter(e => e.type === 'syamsiyah');
  const qamariyahExamples = FEATURED_EXAMPLES.filter(e => e.type === 'qamariyah');

  // Mini live quiz state inside the Bento Box
  const quizWords = [
    { word: 'الشَّمْسُ', type: 'syamsiyah', read: 'asy-syamsu' },
    { word: 'الْقَمَرُ', type: 'qamariyah', read: 'al-qamaru' },
    { word: 'الرَّحْمٰنُ', type: 'syamsiyah', read: 'ar-raḥmānu' },
    { word: 'الْكِتَابُ', type: 'qamariyah', read: 'al-kitābu' },
    { word: 'النَّاسُ', type: 'syamsiyah', read: 'an-nāsu' },
    { word: 'الْحَمْدُ', type: 'qamariyah', read: 'al-ḥamdu' },
  ];

  const [quizIdx, setQuizIdx] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [bentoScore, setBentoScore] = useState(120);

  const activeQuestion = quizWords[quizIdx];

  const handleMiniQuizAnswer = (chosenType: 'syamsiyah' | 'qamariyah') => {
    if (chosenType === activeQuestion.type) {
      playSuccessSound();
      setQuizFeedback('correct');
      setBentoScore(prev => prev + 20);
      setTimeout(() => {
        setQuizIdx(prev => (prev + 1) % quizWords.length);
        setQuizFeedback(null);
      }, 1600);
    } else {
      playWrongSound();
      setQuizFeedback('wrong');
    }
  };

  return (
    <div className="py-6 sm:py-8 space-y-6">
      {/* Primary Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Bento Box 1: Col-span-8 - Main Introduction */}
        <section 
          className="col-span-1 lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-8 shadow-xs border border-slate-200/90 flex flex-col justify-between relative overflow-hidden min-h-[380px]"
          id="bento-intro-card"
        >
          {/* Subtle background glow effect */}
          <div className="absolute -right-8 -top-8 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
                PANDUAN TAJWID INTERAKTIF
              </span>
              <span className="font-arabic text-xl sm:text-2xl text-indigo-900 font-bold" dir="rtl">
                اللامُ الشَّمْسِيَّةُ وَ اللامُ الْقَمَرِيَّةُ
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Kenali Perbedaan <br />
                Membaca Alif Lam
              </h2>
              <p className="text-slate-600 mt-2 max-w-lg text-sm sm:text-base leading-relaxed">
                Pahami hukum tajwid Alif Lam Syamsiyah dan Qamariyah dengan cara yang seru, interaktif, dan mudah dimengerti!
              </p>
            </div>
          </div>

          {/* Sub-cards: Syamsiyah & Qamariyah Quick Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 z-10">
            {/* Syamsiyah Sub-card */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-2xl">☀️</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Idgham Syamsi
                  </span>
                </div>
                <h3 className="font-bold text-amber-950 text-base">Syamsiyah</h3>
                <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                  Lam tidak dibaca (lebur). Suara langsung masuk ke huruf berikutnya bertanda <strong>tasydid ( ّ )</strong>.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-amber-900">
                  Contoh: الشَّمْسُ
                </span>
                <button
                  onClick={() => {
                    playTapSound();
                    if (syamsiyahExamples[0]) onSelectWord(syamsiyahExamples[0]);
                  }}
                  className="text-xs text-amber-900 font-semibold underline hover:text-amber-700"
                >
                  Bedah Kata →
                </button>
              </div>
            </div>

            {/* Qamariyah Sub-card */}
            <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-2xl">🌙</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    Izhar Qamari
                  </span>
                </div>
                <h3 className="font-bold text-sky-950 text-base">Qamariyah</h3>
                <p className="text-xs text-sky-800/90 mt-1 leading-relaxed">
                  Lam dibaca jelas (idzhar). Huruf Lam berharakat <strong>sukun ( ْ )</strong> terdengar bunyi &apos;L&apos; mantap.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-sky-200/60 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-sky-900">
                  Contoh: الْقَمَرُ
                </span>
                <button
                  onClick={() => {
                    playTapSound();
                    if (qamariyahExamples[0]) onSelectWord(qamariyahExamples[0]);
                  }}
                  className="text-xs text-sky-900 font-semibold underline hover:text-sky-700"
                >
                  Bedah Kata →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3 z-10 pt-2">
            <button
              onClick={() => {
                playTapSound();
                onStartLearning('syamsiyah');
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-2"
              id="bento-start-btn"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playTapSound();
                onStartLearning('perbandingan');
              }}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm font-semibold border border-slate-200 transition-colors"
              id="bento-compare-btn"
            >
              Lihat Apa Bedanya?
            </button>
          </div>
        </section>

        {/* Bento Box 2: Col-span-4 - Tantangan Kuis (Indigo 900) */}
        <section 
          className="col-span-1 lg:col-span-4 bg-indigo-900 rounded-[32px] p-6 text-white flex flex-col justify-between shadow-md relative overflow-hidden"
          id="bento-quiz-challenge"
        >
          {/* Header row */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <h3 className="font-bold text-lg tracking-wide">Tantangan Kuis</h3>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-mono font-bold">
              Skor: {bentoScore}
            </span>
          </div>

          {/* Interactive Question Center */}
          <div className="flex-grow flex flex-col items-center justify-center text-center my-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div 
                className="text-5xl sm:text-6xl font-quran text-indigo-100 font-bold py-2 tracking-wide" 
                dir="rtl"
              >
                {activeQuestion.word}
              </div>
              <button
                onClick={() => speakArabic(activeQuestion.word)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-indigo-200 transition-colors"
                title="Dengar Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-indigo-300 text-xs sm:text-sm mb-6 font-medium">
              Kata di atas termasuk hukum tajwid apa?
            </p>

            {/* Answer Action Buttons */}
            <div className="w-full space-y-3">
              <button 
                onClick={() => handleMiniQuizAnswer('syamsiyah')}
                className="w-full py-3.5 bg-white text-indigo-950 rounded-2xl font-bold text-sm hover:bg-amber-300 hover:text-amber-950 transition-colors shadow-xs active:scale-98"
                id="mini-answer-syamsiyah"
              >
                ☀️ Alif Lam Syamsiyah
              </button>
              <button 
                onClick={() => handleMiniQuizAnswer('qamariyah')}
                className="w-full py-3.5 bg-indigo-800/90 border border-indigo-700/80 rounded-2xl font-bold text-sm text-indigo-100 hover:bg-sky-400 hover:text-sky-950 hover:border-sky-300 transition-colors shadow-xs active:scale-98"
                id="mini-answer-qamariyah"
              >
                🌙 Alif Lam Qamariyah
              </button>
            </div>

            {/* Live Feedback Message */}
            <div className="min-h-[30px] mt-4 flex items-center justify-center">
              {quizFeedback === 'correct' && (
                <div className="text-xs sm:text-sm flex items-center gap-2 text-emerald-400 font-semibold animate-bounce">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Benar! MasyaAllah. (+20 Skor)
                </div>
              )}
              {quizFeedback === 'wrong' && (
                <div className="text-xs sm:text-sm flex items-center gap-2 text-rose-300 font-semibold">
                  <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                  Belum tepat. Coba perhatikan huruf setelah ال.
                </div>
              )}
              {!quizFeedback && (
                <p className="text-[11px] text-indigo-300/80">
                  Ketuk salah satu pilihan di atas untuk menguji pemahamanmu
                </p>
              )}
            </div>
          </div>

          {/* Bottom link to full quiz */}
          <div className="pt-2 border-t border-indigo-800/80 flex items-center justify-between text-xs">
            <span className="text-indigo-300">Soal {quizIdx + 1} dari {quizWords.length}</span>
            <button
              onClick={() => {
                playTapSound();
                onStartLearning('latihan');
              }}
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1"
            >
              <span>Kuis Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Bento Box 3: Col-span-4 - 14 Huruf Syamsiyah (Amber-100) */}
        <section 
          className="col-span-1 md:col-span-6 lg:col-span-4 bg-amber-100 rounded-[32px] p-6 border-2 border-amber-200 flex flex-col justify-between shadow-xs"
          id="bento-syamsiyah-letters"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">☀️</span>
                <h3 className="font-bold text-amber-950 text-base sm:text-lg">
                  14 Huruf Syamsiyah
                </h3>
              </div>
              <button
                onClick={() => {
                  playTapSound();
                  onStartLearning('syamsiyah');
                }}
                className="text-xs font-bold text-amber-900 hover:text-amber-700 underline"
              >
                Lihat Detail
              </button>
            </div>

            {/* 7x2 Tile Grid */}
            <div className="grid grid-cols-7 gap-2" dir="rtl">
              {SYAMSIYAH_LETTERS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playTapSound();
                    speakArabic(item.letter);
                    onSelectWord({
                      id: `bento-syams-${item.id}`,
                      arabic: item.sampleWord,
                      transliteration: item.sampleWordRead,
                      meaning: item.sampleMeaning,
                      type: 'syamsiyah',
                      letter: item.letter,
                      letterName: item.name,
                      explanation: item.explanation,
                      parts: {
                        al: 'الـ',
                        highlightLetter: item.letter + 'َّ',
                        hasTasydid: true,
                        rest: item.sampleWord.replace(/^ال[َُِّْ]?/, '').replace(item.letter, '')
                      }
                    });
                  }}
                  className="aspect-square bg-white rounded-xl flex flex-col items-center justify-center font-bold text-lg sm:text-xl text-amber-800 shadow-xs hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all cursor-pointer font-arabic"
                  title={`Huruf ${item.name} (${item.sampleWord}) - Klik untuk bedah kata`}
                >
                  <span>{item.letter}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/60 rounded-xl text-xs text-amber-900 border border-amber-200/60 flex items-center justify-between">
            <span>Huruf Syamsiyah memiliki tanda <strong>Tasydid ( ّ )</strong> setelah Alif Lam.</span>
            <span className="text-base font-bold text-amber-700 ml-1">ّ</span>
          </div>
        </section>

        {/* Bento Box 4: Col-span-4 - 14 Huruf Qamariyah (Sky-100) */}
        <section 
          className="col-span-1 md:col-span-6 lg:col-span-4 bg-sky-100 rounded-[32px] p-6 border-2 border-sky-200 flex flex-col justify-between shadow-xs"
          id="bento-qamariyah-letters"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌙</span>
                <h3 className="font-bold text-sky-950 text-base sm:text-lg">
                  14 Huruf Qamariyah
                </h3>
              </div>
              <button
                onClick={() => {
                  playTapSound();
                  onStartLearning('qamariyah');
                }}
                className="text-xs font-bold text-sky-900 hover:text-sky-700 underline"
              >
                Lihat Detail
              </button>
            </div>

            {/* 7x2 Tile Grid */}
            <div className="grid grid-cols-7 gap-2" dir="rtl">
              {QAMARIYAH_LETTERS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playTapSound();
                    speakArabic(item.letter);
                    onSelectWord({
                      id: `bento-qamar-${item.id}`,
                      arabic: item.sampleWord,
                      transliteration: item.sampleWordRead,
                      meaning: item.sampleMeaning,
                      type: 'qamariyah',
                      letter: item.letter,
                      letterName: item.name,
                      explanation: item.explanation,
                      parts: {
                        al: 'الْـ',
                        highlightLetter: item.letter + 'َ',
                        hasTasydid: false,
                        rest: item.sampleWord.replace(/^ال[َُِّْ]?/, '').replace(item.letter, '')
                      }
                    });
                  }}
                  className="aspect-square bg-white rounded-xl flex flex-col items-center justify-center font-bold text-lg sm:text-xl text-sky-800 shadow-xs hover:bg-sky-50 hover:scale-105 active:scale-95 transition-all cursor-pointer font-arabic"
                  title={`Huruf ${item.name} (${item.sampleWord}) - Klik untuk bedah kata`}
                >
                  <span>{item.letter}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/60 rounded-xl text-xs text-sky-900 border border-sky-200/60 flex items-center justify-between">
            <span>Huruf Qamariyah dibaca jelas dan Lam memiliki tanda <strong>Sukun ( ْ )</strong>.</span>
            <span className="text-base font-bold text-sky-700 ml-1">ْ</span>
          </div>
        </section>

        {/* Bento Box 5: Col-span-4 - Progres Belajar (Emerald-50) */}
        <section 
          className="col-span-1 lg:col-span-4 bg-emerald-50 rounded-[32px] p-6 border border-emerald-200/80 flex flex-col justify-between shadow-xs"
          id="bento-progress-box"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xs">
                  ✓
                </div>
                <h4 className="font-bold text-emerald-950 text-base">Progres Belajar</h4>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                Level 1: Dasar
              </span>
            </div>

            <div className="w-full bg-emerald-200/80 h-2.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[70%] transition-all duration-500 rounded-full"></div>
            </div>
            <p className="text-[11px] text-emerald-800 mt-2 font-semibold uppercase tracking-tight">
              70% Materi &amp; Pengenalan Huruf Terselesaikan
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 text-center">
                <span className="text-xs text-slate-500 font-medium block">Total Huruf</span>
                <span className="text-lg font-bold text-emerald-800">28 Huruf</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 text-center">
                <span className="text-xs text-slate-500 font-medium block">Rumus Tajwid</span>
                <span className="text-lg font-bold text-emerald-800">2 Kaidah</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center gap-2">
            <button
              onClick={() => {
                playTapSound();
                onStartLearning('game');
              }}
              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs text-center transition-colors shadow-xs flex items-center justify-center gap-1.5"
              id="bento-game-shortcut"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Mainkan Game</span>
            </button>
            <button
              onClick={() => {
                playTapSound();
                onStartLearning('latihan');
              }}
              className="py-2 px-3 bg-white hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl text-xs text-center transition-colors border border-emerald-200 flex items-center justify-center gap-1.5"
              id="bento-quiz-shortcut"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Kuis</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
