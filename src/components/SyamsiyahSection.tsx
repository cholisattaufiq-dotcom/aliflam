import { useState } from 'react';
import { motion } from 'motion/react';
import { SYAMSIYAH_LETTERS, FEATURED_EXAMPLES } from '../data/tajwidData';
import { TajwidLetter, ExampleWord } from '../types';
import { Sun, Sparkles, Volume2, Info, ArrowUpRight } from 'lucide-react';
import { playTapSound, speakArabic } from '../utils/audio';

interface Props {
  onSelectWord: (word: ExampleWord) => void;
}

export default function SyamsiyahSection({ onSelectWord }: Props) {
  const [selectedLetter, setSelectedLetter] = useState<TajwidLetter | null>(null);

  const syamsiyahFeatured = FEATURED_EXAMPLES.filter(e => e.type === 'syamsiyah');

  const handleLetterClick = (letter: TajwidLetter) => {
    playTapSound();
    setSelectedLetter(letter);

    // Also construct an ExampleWord format to allow direct inspection
    const wordObj: ExampleWord = {
      id: `syams-${letter.id}`,
      arabic: letter.sampleWord,
      transliteration: letter.sampleWordRead,
      meaning: letter.sampleMeaning,
      type: 'syamsiyah',
      letter: letter.letter,
      letterName: letter.name,
      explanation: letter.explanation,
      parts: {
        al: 'الـ',
        highlightLetter: letter.letter + 'َّ',
        hasTasydid: true,
        rest: letter.sampleWord.replace(/^ال[َُِّْ]?/, '').replace(letter.letter, '')
      }
    };
    onSelectWord(wordObj);
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-6xl mx-auto px-4">
      {/* Bento Header Banner */}
      <div className="rounded-[32px] bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white p-6 sm:p-10 shadow-sm relative overflow-hidden border border-amber-400">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/15 backdrop-blur-xs text-amber-100 text-xs font-semibold">
            <Sun className="w-3.5 h-3.5 text-amber-200" />
            <span>Bab Tajwid: Alif Lam Syamsiyah</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" id="syamsiyah-title">
              Alif Lam Syamsiyah
            </h1>
            <span className="font-arabic text-3xl text-amber-100 font-bold" dir="rtl">
              الـ الشَّمْسِيَّة
            </span>
          </div>

          {/* 2. Definisi Sesuai Prompt */}
          <p className="text-amber-50 text-base sm:text-lg leading-relaxed pt-2">
            Alif Lam Syamsiyah adalah <strong>ال</strong> yang apabila bertemu dengan salah satu dari <strong>14 huruf Syamsiyah</strong>, maka huruf <strong>ل (lam) tidak dibaca</strong>, dan huruf setelahnya <strong>dibaca dengan tasydid ( ّ )</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 bg-white/20 rounded-full font-medium">
              ☀️ Filosofi: Bagaikan bintang yang tidak terlihat di siang hari karena terangnya matahari.
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full font-medium">
              📖 Nama lain: Idgham Syamsi (إدغام شمسي)
            </span>
          </div>
        </div>
      </div>

      {/* Featured Examples with Color-Coded Anatomy - Bento Style */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Contoh Utama Alif Lam Syamsiyah
            </h2>
            <p className="text-xs text-slate-500">
              Ketuk contoh kata di bawah untuk melihat rincian tanda warna dan mendengar pelafalannya
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Lam pudar/lebur
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Huruf + Tasydid
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {syamsiyahFeatured.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                playTapSound();
                onSelectWord(item);
              }}
              className="cursor-pointer bg-white rounded-[28px] border-2 border-amber-200/90 hover:border-amber-400 p-6 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between"
              id={`syamsiyah-example-${item.id}`}
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                  Huruf {item.letterName} ({item.letter})
                </span>
                <span className="text-slate-500 flex items-center gap-1 group-hover:text-amber-600 font-medium">
                  Detail <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Large Arabic with color markings */}
              <div className="text-center py-4 bg-amber-50/50 rounded-2xl mb-3 border border-amber-100">
                <div className="font-quran text-4xl text-slate-800 leading-normal" dir="rtl">
                  {/* Lam tidak dibaca */}
                  <span className="text-slate-400 opacity-60 font-semibold" title="Lam tidak dibaca">
                    {item.parts.al}
                  </span>
                  {/* Huruf bertasydid */}
                  <span className="text-amber-600 font-extrabold bg-amber-100 px-1.5 py-0.5 rounded-md" title="Huruf Syamsiyah bertasydid">
                    {item.parts.highlightLetter}
                  </span>
                  <span>{item.parts.rest}</span>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="font-mono text-sm font-bold text-slate-800">
                  {item.arabic} → <span className="text-amber-700">{item.transliteration}</span>
                </p>
                <p className="text-xs text-slate-500">
                  Artinya: &ldquo;{item.meaning}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 italic truncate max-w-[200px]">
                  {item.explanation}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playTapSound();
                    speakArabic(item.arabic);
                  }}
                  className="p-2 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
                  title="Dengarkan suara"
                  aria-label={`Dengar pelafalan ${item.arabic}`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 14 Huruf Syamsiyah Bento Grid */}
      <section className="bg-amber-100/70 rounded-[32px] p-6 sm:p-8 border-2 border-amber-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">☀️</span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
                14 Huruf Syamsiyah
              </h2>
            </div>
            <p className="text-xs text-amber-800 mt-1">
              Sentuh kartu huruf untuk melihat contoh kata dalam Al-Qur&apos;an dan penjelasan cara membacanya.
            </p>
          </div>

          <div className="text-xs font-mono bg-white/80 px-3 py-1 rounded-full border border-amber-300 text-amber-900 font-arabic text-base" dir="rtl">
            ت ث د ذ ر ز س ش ص ض ط ظ ل ن
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {SYAMSIYAH_LETTERS.map((item, idx) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleLetterClick(item)}
              id={`syamsiyah-letter-${item.id}`}
              className="bg-white hover:bg-amber-50 border border-amber-200 hover:border-amber-400 rounded-2xl p-4 text-center transition-all shadow-xs group flex flex-col items-center justify-between cursor-pointer"
            >
              <div className="w-full flex justify-between items-center text-[10px] text-slate-400 mb-1">
                <span>#{idx + 1}</span>
                <span className="font-semibold text-amber-800">{item.name}</span>
              </div>

              {/* Huge Arabic Character */}
              <div className="font-quran text-5xl text-amber-600 my-1 group-hover:scale-110 transition-transform">
                {item.letter}
              </div>

              <div className="w-full mt-2 pt-2 border-t border-slate-100 text-center">
                <p className="font-quran text-sm text-slate-800 font-bold truncate">
                  {item.sampleWord}
                </p>
                <p className="text-[10px] font-mono text-amber-900 font-semibold truncate">
                  {item.sampleWordRead}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="p-4 bg-white/70 rounded-2xl text-xs text-amber-900 border border-amber-200/80 flex items-center justify-between">
          <span>Huruf Syamsiyah memiliki tanda <strong>Tasydid ( ّ )</strong> setelah Alif Lam.</span>
          <span className="text-lg font-bold text-amber-700">ّ</span>
        </div>
      </section>

      {/* Syamsiyah Rule Recap Bento Box */}
      <section className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200 shadow-xs flex items-start gap-4">
        <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0 mt-0.5 shadow-xs">
          <Info className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-sm text-slate-700">
          <h4 className="font-bold text-base text-slate-900">
            Kunci Mengingat Alif Lam Syamsiyah
          </h4>
          <p className="leading-relaxed">
            Dalam mushaf Al-Qur&apos;an standar (seperti Rasm Utsmani), huruf Syamsiyah selalu ditandai dengan tanda <strong>Tasydid ( ّ )</strong> tepat setelah huruf Alif Lam. Huruf Lam tidak memiliki harakat sukun karena suaranya sudah melebur ke huruf tersebut.
          </p>
        </div>
      </section>
    </div>
  );
}
