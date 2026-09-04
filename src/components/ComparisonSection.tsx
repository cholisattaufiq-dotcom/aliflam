import { motion } from 'motion/react';
import { Sun, Moon, Check, X as XIcon, HelpCircle, ArrowRight } from 'lucide-react';
import { playTapSound, speakArabic } from '../utils/audio';
import { ExampleWord } from '../types';

interface Props {
  onSelectWord: (word: ExampleWord) => void;
  onGoToQuiz: () => void;
}

export default function ComparisonSection({ onSelectWord, onGoToQuiz }: Props) {
  const syamsuWord: ExampleWord = {
    id: 'comp-syamsu',
    arabic: 'الشَّمْسُ',
    transliteration: 'asy-syamsu',
    meaning: 'Matahari',
    type: 'syamsiyah',
    letter: 'ش',
    letterName: 'Syin',
    explanation: 'Lam tidak dibaca (lebur), huruf Syin bertasydid sehingga langsung dibaca asy-syamsu.',
    parts: {
      al: 'الـ',
      highlightLetter: 'شَّ',
      hasTasydid: true,
      rest: 'مْسُ'
    }
  };

  const qamaruWord: ExampleWord = {
    id: 'comp-qamaru',
    arabic: 'الْقَمَرُ',
    transliteration: 'al-qamaru',
    meaning: 'Bulan',
    type: 'qamariyah',
    letter: 'ق',
    letterName: 'Qaf',
    explanation: 'Lam berharakat sukun dibaca jelas, huruf Qaf tidak bertasydid sehingga dibaca al-qamaru.',
    parts: {
      al: 'الْـ',
      highlightLetter: 'قَ',
      hasTasydid: false,
      rest: 'مَرُ'
    }
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-5xl mx-auto px-4">
      {/* Title Header Bento Style */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">
          Perbandingan Visual Tajwid
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900" id="comparison-title">
          Apa Bedanya?
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Memahami perbedaan utama antara Alif Lam Syamsiyah dan Alif Lam Qamariyah secara mudah dan menyenangkan.
        </p>
      </div>

      {/* 4. Side-by-Side Visual Comparison - Bento Grid Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Syamsiyah Column Bento Box */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-[32px] bg-white border-2 border-amber-200 p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col justify-between"
          id="comparison-syamsiyah-card"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-xs">
                  <Sun className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Syamsiyah ☀️
                  </h2>
                  <p className="text-xs font-arabic text-amber-800 font-bold">
                    اللام الشَّمْسِيَّة
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                14 Huruf
              </span>
            </div>

            {/* List of characteristics */}
            <div className="space-y-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                  <XIcon className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Lam tidak dibaca
                  </p>
                  <p className="text-xs text-slate-600">
                    Bunyi &apos;L&apos; melebur (idgham) langsung ke huruf berikutnya.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Huruf setelah ال bertasydid ( ّ )
                  </p>
                  <p className="text-xs text-slate-600">
                    Ditekan dan dibaca ganda dengan harakat tasydid.
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Example */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Contoh Utama
              </p>
              <div 
                className="font-quran text-4xl text-slate-800 my-2 cursor-pointer hover:text-amber-700 transition-colors"
                dir="rtl"
                onClick={() => {
                  playTapSound();
                  onSelectWord(syamsuWord);
                }}
                title="Klik untuk detail"
              >
                <span className="text-slate-400 opacity-50">الـ</span>
                <span className="text-amber-600 font-bold bg-amber-100 px-1 rounded-sm">شَّ</span>
                <span>مْسُ</span>
              </div>
              <p className="font-mono text-base font-bold text-slate-800">
                الشَّمْسُ → <span className="text-amber-600">asy-syamsu</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                (Bukan &ldquo;al-syamsu&rdquo;, huruf L langsung melebur ke Sy)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTapSound();
              onSelectWord(syamsuWord);
            }}
            className="w-full mt-6 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>Bedah Kata الشَّمْسُ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Qamariyah Column Bento Box */}
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-[32px] bg-white border-2 border-sky-200 p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col justify-between"
          id="comparison-qamariyah-card"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 shadow-xs">
                  <Moon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Qamariyah 🌙
                  </h2>
                  <p className="text-xs font-arabic text-sky-900 font-bold">
                    اللام الْقَمَرِيَّة
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold border border-sky-200">
                14 Huruf
              </span>
            </div>

            {/* List of characteristics */}
            <div className="space-y-3 bg-sky-50/70 p-4 rounded-2xl border border-sky-200/80">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Lam dibaca jelas (izhar)
                  </p>
                  <p className="text-xs text-slate-600">
                    Huruf ل diberi tanda sukun ( ْ ) dan bunyi &apos;L&apos; terdengar terang.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-200 flex items-center justify-center text-sky-800 shrink-0 mt-0.5">
                  <XIcon className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Huruf setelah ال tidak bertasydid
                  </p>
                  <p className="text-xs text-slate-600">
                    Karena hukum Alif Lam Qamariyah dibaca terpisah dan jelas.
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Example */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Contoh Utama
              </p>
              <div 
                className="font-quran text-4xl text-slate-800 my-2 cursor-pointer hover:text-sky-700 transition-colors"
                dir="rtl"
                onClick={() => {
                  playTapSound();
                  onSelectWord(qamaruWord);
                }}
                title="Klik untuk detail"
              >
                <span className="text-sky-700 font-bold">الْـ</span>
                <span className="text-indigo-900 font-bold bg-indigo-50 px-1 rounded-sm">قَ</span>
                <span>مَرُ</span>
              </div>
              <p className="font-mono text-base font-bold text-slate-800">
                الْقَمَرُ → <span className="text-sky-700">al-qamaru</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                (Bunyi &ldquo;al-&rdquo; terbaca jelas dan tegas)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTapSound();
              onSelectWord(qamaruWord);
            }}
            className="w-full mt-6 py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>Bedah Kata الْقَمَرُ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Summary Table Bento Box */}
      <section className="bg-white rounded-[32px] border border-slate-200/90 p-6 sm:p-8 shadow-xs overflow-x-auto">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          Tabel Ringkasan Perbedaan
        </h3>

        <table className="w-full text-left text-sm border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b-2 border-slate-200 text-xs uppercase text-slate-500">
              <th className="py-3 px-4">Aspek</th>
              <th className="py-3 px-4 text-amber-800 bg-amber-50/70 rounded-tl-xl font-bold">☀️ Syamsiyah</th>
              <th className="py-3 px-4 text-sky-900 bg-sky-50/70 rounded-tr-xl font-bold">🌙 Qamariyah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3.5 px-4 font-semibold text-slate-700">Arti Harfiah</td>
              <td className="py-3.5 px-4 text-slate-600 bg-amber-50/20">Matahari (Syams)</td>
              <td className="py-3.5 px-4 text-slate-600 bg-sky-50/20">Bulan (Qamar)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-slate-700">Pelafalan Huruf Lam (ل)</td>
              <td className="py-3.5 px-4 text-amber-800 font-medium bg-amber-50/20">Tidak dibaca (melebur)</td>
              <td className="py-3.5 px-4 text-sky-900 font-medium bg-sky-50/20">Dibaca jelas (terdengar L)</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-slate-700">Tanda di Huruf Berikutnya</td>
              <td className="py-3.5 px-4 text-amber-800 font-medium bg-amber-50/20">Wajib Tasydid ( ّ )</td>
              <td className="py-3.5 px-4 text-sky-900 font-medium bg-sky-50/20">Tanpa Tasydid</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-slate-700">Tanda pada Huruf Lam</td>
              <td className="py-3.5 px-4 text-slate-600 bg-amber-50/20">Kosong (tanpa sukun)</td>
              <td className="py-3.5 px-4 text-sky-900 font-medium bg-sky-50/20">Ada Sukun ( ْ )</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-slate-700">Jumlah Huruf</td>
              <td className="py-3.5 px-4 text-slate-600 bg-amber-50/20">14 Huruf</td>
              <td className="py-3.5 px-4 text-slate-600 bg-sky-50/20">14 Huruf</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-slate-700">Hukum Bacaan</td>
              <td className="py-3.5 px-4 text-slate-600 bg-amber-50/20">Idgham Syamsi</td>
              <td className="py-3.5 px-4 text-slate-600 bg-sky-50/20">Izhar Qamari</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Call to Action to Quiz */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            playTapSound();
            onGoToQuiz();
          }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-all active:scale-95"
          id="goto-quiz-button"
        >
          <span>Sudah Paham? Coba Uji Pemahaman di Kuis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
