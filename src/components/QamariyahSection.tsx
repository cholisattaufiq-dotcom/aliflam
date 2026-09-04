import { useState } from 'react';
import { motion } from 'motion/react';
import { QAMARIYAH_LETTERS, FEATURED_EXAMPLES, MNEMONIC_QAMARIYAH } from '../data/tajwidData';
import { TajwidLetter, ExampleWord } from '../types';
import { Moon, Sparkles, Volume2, Info, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playTapSound, speakArabic } from '../utils/audio';

interface Props {
  onSelectWord: (word: ExampleWord) => void;
}

export default function QamariyahSection({ onSelectWord }: Props) {
  const [selectedLetter, setSelectedLetter] = useState<TajwidLetter | null>(null);

  const qamariyahFeatured = FEATURED_EXAMPLES.filter(e => e.type === 'qamariyah');

  const handleLetterClick = (letter: TajwidLetter) => {
    playTapSound();
    setSelectedLetter(letter);

    const wordObj: ExampleWord = {
      id: `qamar-${letter.id}`,
      arabic: letter.sampleWord,
      transliteration: letter.sampleWordRead,
      meaning: letter.sampleMeaning,
      type: 'qamariyah',
      letter: letter.letter,
      letterName: letter.name,
      explanation: letter.explanation,
      parts: {
        al: 'الْـ',
        highlightLetter: letter.letter + 'َ',
        hasTasydid: false,
        rest: letter.sampleWord.replace(/^ال[َُِّْ]?/, '').replace(letter.letter, '')
      }
    };
    onSelectWord(wordObj);
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-6xl mx-auto px-4">
      {/* Bento Header Banner */}
      <div className="rounded-[32px] bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-800 text-white p-6 sm:p-10 shadow-sm relative overflow-hidden border border-sky-500">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/15 backdrop-blur-xs text-sky-100 text-xs font-semibold">
            <Moon className="w-3.5 h-3.5 text-sky-200" />
            <span>Bab Tajwid: Alif Lam Qamariyah</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" id="qamariyah-title">
              Alif Lam Qamariyah
            </h1>
            <span className="font-arabic text-3xl text-sky-100 font-bold" dir="rtl">
              الـ الْقَمَرِيَّة
            </span>
          </div>

          {/* 3. Definisi Sesuai Prompt */}
          <p className="text-sky-50 text-base sm:text-lg leading-relaxed pt-2">
            Alif Lam Qamariyah adalah <strong>ال</strong> yang apabila bertemu dengan salah satu dari <strong>14 huruf Qamariyah</strong>, maka huruf <strong>ل (lam) dibaca dengan jelas (izhar)</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 bg-white/20 rounded-full font-medium">
              🌙 Filosofi: Bagaikan bulan (qamar) di malam hari yang tidak menutupi cahaya bintang (lam), sehingga tetap jelas tampak.
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full font-medium">
              📖 Nama lain: Izhar Qamari (إظهار قمري)
            </span>
          </div>
        </div>
      </div>

      {/* Jembatan Keledai / Mnemonic Penghafal - Bento Style */}
      <section className="bg-sky-100/80 border-2 border-sky-200 rounded-[32px] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 bg-sky-200 text-sky-900 rounded-full text-xs font-bold border border-sky-300">
              💡 Rumus Hafalan Cepat
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-sky-950">
              Kalimat Pengingat 14 Huruf Qamariyah
            </h3>
            <p className="text-sm text-sky-800">
              Para ulama tajwid merangkai seluruh 14 huruf Qamariyah dalam satu kalimat indah:
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-xs border border-sky-300 text-center w-full md:w-auto shrink-0">
            <p className="font-quran text-3xl sm:text-4xl text-sky-800 font-bold tracking-wide" dir="rtl">
              {MNEMONIC_QAMARIYAH.arabic}
            </p>
            <p className="text-xs font-mono font-semibold text-slate-600 mt-2">
              &ldquo;{MNEMONIC_QAMARIYAH.latin}&rdquo;
            </p>
            <p className="text-[11px] text-sky-700 italic mt-0.5">
              {MNEMONIC_QAMARIYAH.meaning}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Examples with Color-Coded Anatomy - Bento Style */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Contoh Utama Alif Lam Qamariyah
            </h2>
            <p className="text-xs text-slate-500">
              Ketuk contoh kata di bawah untuk melihat rincian tanda warna dan mendengar pelafalannya
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> Lam berharakat sukun (jelas)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Huruf Qamariyah (tanpa tasydid)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {qamariyahFeatured.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                playTapSound();
                onSelectWord(item);
              }}
              className="cursor-pointer bg-white rounded-[28px] border-2 border-sky-200/90 hover:border-sky-400 p-6 shadow-xs hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between"
              id={`qamariyah-example-${item.id}`}
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-sky-900 bg-sky-100 px-3 py-0.5 rounded-full">
                  Huruf {item.letterName} ({item.letter})
                </span>
                <span className="text-slate-500 flex items-center gap-1 group-hover:text-sky-700 font-medium">
                  Detail <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Large Arabic with color markings */}
              <div className="text-center py-4 bg-sky-50/50 rounded-2xl mb-3 border border-sky-100">
                <div className="font-quran text-4xl text-slate-800 leading-normal" dir="rtl">
                  {/* Lam dibaca jelas */}
                  <span className="text-sky-700 font-bold" title="Lam berharakat sukun dibaca jelas">
                    {item.parts.al}
                  </span>
                  {/* Huruf Qamariyah */}
                  <span className="text-indigo-900 font-extrabold bg-indigo-50 px-1.5 py-0.5 rounded-md" title="Huruf Qamariyah tidak bertasydid">
                    {item.parts.highlightLetter}
                  </span>
                  <span>{item.parts.rest}</span>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="font-mono text-sm font-bold text-slate-800">
                  {item.arabic} → <span className="text-sky-700">{item.transliteration}</span>
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
                  className="p-2 rounded-full bg-sky-100 text-sky-900 hover:bg-sky-200 transition-colors"
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

      {/* 14 Huruf Qamariyah Bento Grid */}
      <section className="bg-sky-100/70 rounded-[32px] p-6 sm:p-8 border-2 border-sky-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌙</span>
              <h2 className="text-xl sm:text-2xl font-bold text-sky-950">
                14 Huruf Qamariyah
              </h2>
            </div>
            <p className="text-xs text-sky-800 mt-1">
              Sentuh kartu huruf untuk melihat contoh kata dalam Al-Qur&apos;an dan penjelasan cara membacanya.
            </p>
          </div>

          <div className="text-xs font-mono bg-white/80 px-3 py-1 rounded-full border border-sky-300 text-sky-900 font-arabic text-base" dir="rtl">
            ا ب ج ح خ ع غ ف ق ك م هـ و ي
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {QAMARIYAH_LETTERS.map((item, idx) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleLetterClick(item)}
              id={`qamariyah-letter-${item.id}`}
              className="bg-white hover:bg-sky-50 border border-sky-200 hover:border-sky-400 rounded-2xl p-4 text-center transition-all shadow-xs group flex flex-col items-center justify-between cursor-pointer"
            >
              <div className="w-full flex justify-between items-center text-[10px] text-slate-400 mb-1">
                <span>#{idx + 1}</span>
                <span className="font-semibold text-sky-900">{item.name}</span>
              </div>

              {/* Huge Arabic Character */}
              <div className="font-quran text-5xl text-sky-700 my-1 group-hover:scale-110 transition-transform">
                {item.letter}
              </div>

              <div className="w-full mt-2 pt-2 border-t border-slate-100 text-center">
                <p className="font-quran text-sm text-slate-800 font-bold truncate">
                  {item.sampleWord}
                </p>
                <p className="text-[10px] font-mono text-sky-900 font-semibold truncate">
                  {item.sampleWordRead}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="p-4 bg-white/70 rounded-2xl text-xs text-sky-900 border border-sky-200/80 flex items-center justify-between">
          <span>Huruf Qamariyah dibaca jelas dan Lam memiliki tanda <strong>Sukun ( ْ )</strong>.</span>
          <span className="text-lg font-bold text-sky-700">ْ</span>
        </div>
      </section>

      {/* Qamariyah Rule Recap Bento Box */}
      <section className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200 shadow-xs flex items-start gap-4">
        <div className="p-3 bg-sky-600 text-white rounded-2xl shrink-0 mt-0.5 shadow-xs">
          <Info className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-sm text-slate-700">
          <h4 className="font-bold text-base text-slate-900">
            Kunci Mengingat Alif Lam Qamariyah
          </h4>
          <p className="leading-relaxed">
            Huruf Lam pada Alif Lam Qamariyah <strong>selalu memiliki tanda sukun ( ْ )</strong> di atasnya. Huruf setelahnya tidak memakai tasydid karena hukum Alif Lam Qamariyah dibaca terang dan terpisah (izhar).
          </p>
        </div>
      </section>
    </div>
  );
}
