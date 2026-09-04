import { motion, AnimatePresence } from 'motion/react';
import { ExampleWord } from '../types';
import { Volume2, X, Sun, Moon, CheckCircle2, Sparkles } from 'lucide-react';
import { speakArabic, playTapSound } from '../utils/audio';

interface Props {
  example: ExampleWord | null;
  onClose: () => void;
}

export default function InteractiveWordModal({ example, onClose }: Props) {
  if (!example) return null;

  const isSyamsiyah = example.type === 'syamsiyah';

  const handlePlayVoice = () => {
    playTapSound();
    speakArabic(example.arabic);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        onClick={onClose}
        id="example-modal-backdrop"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full max-w-lg overflow-hidden bg-white rounded-[32px] shadow-2xl border border-slate-200"
          onClick={(e) => e.stopPropagation()}
          id="example-modal-card"
        >
          {/* Header */}
          <div className={`px-6 py-5 flex items-center justify-between text-white ${
            isSyamsiyah 
              ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
              : 'bg-gradient-to-r from-sky-600 to-indigo-700'
          }`}>
            <div className="flex items-center gap-3">
              {isSyamsiyah ? (
                <div className="p-2 bg-amber-400/30 rounded-2xl">
                  <Sun className="w-5 h-5 text-amber-100" />
                </div>
              ) : (
                <div className="p-2 bg-sky-500/30 rounded-2xl">
                  <Moon className="w-5 h-5 text-sky-100" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm tracking-wide">
                  {isSyamsiyah ? 'Alif Lam Syamsiyah' : 'Alif Lam Qamariyah'}
                </h3>
                <p className="text-xs opacity-90 font-arabic" dir="rtl">
                  {isSyamsiyah ? 'الـ الشَّمْسِيَّة' : 'الـ الْقَمَرِيَّة'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playTapSound();
                onClose();
              }}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Tutup modal"
              id="close-modal-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            {/* Arabic Big Display with Color Coding */}
            <div className="text-center py-6 px-4 bg-slate-50 rounded-[28px] border border-slate-200/80">
              <div 
                className="font-quran text-5xl sm:text-6xl text-slate-800 leading-relaxed tracking-wider mb-2 select-none"
                dir="rtl"
              >
                {/* Visual highlight on ال */}
                <span 
                  className={`transition-colors font-bold ${
                    isSyamsiyah 
                      ? 'text-slate-400 opacity-60 underline decoration-amber-400/40 decoration-wavy' 
                      : 'text-sky-700 font-bold'
                  }`}
                  title={isSyamsiyah ? 'Alif Lam tidak dibaca (lebur)' : 'Alif Lam dibaca jelas (sukun)'}
                >
                  {example.parts.al}
                </span>

                {/* Highlight on the special letter and tasydid */}
                <span 
                  className={`inline-block px-1 rounded-lg ${
                    isSyamsiyah 
                      ? 'text-amber-600 bg-amber-100 font-extrabold ring-1 ring-amber-300' 
                      : 'text-indigo-900 bg-indigo-50 font-extrabold ring-1 ring-indigo-200'
                  }`}
                  title={`Huruf ${example.letterName} (${isSyamsiyah ? 'Syamsiyah' : 'Qamariyah'})`}
                >
                  {example.parts.highlightLetter}
                </span>

                {/* Remaining word */}
                <span className="text-slate-700">
                  {example.parts.rest}
                </span>
              </div>

              {/* Color Legend for Visual Learner */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  isSyamsiyah ? 'bg-slate-200 text-slate-700' : 'bg-sky-100 text-sky-900'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>{example.parts.al} : {isSyamsiyah ? 'Lam tidak dibaca' : 'Lam dibaca jelas'}</span>
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  isSyamsiyah ? 'bg-amber-100 text-amber-900 font-medium' : 'bg-indigo-100 text-indigo-900 font-medium'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>
                    Huruf {example.letterName} ({example.letter}) {isSyamsiyah ? '+ Tasydid' : ''}
                  </span>
                </span>
              </div>

              {/* Audio Listen Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handlePlayVoice}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50/50 shadow-xs transition-all active:scale-95 cursor-pointer"
                  id="listen-pronunciation-button"
                >
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Dengarkan Pelafalan</span>
                </button>
              </div>
            </div>

            {/* Structured Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Cara Membaca
                </p>
                <p className="text-base font-bold text-slate-800 font-mono">
                  {example.transliteration}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Arti: &ldquo;{example.meaning}&rdquo;
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Jenis Hukum
                </p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                  <CheckCircle2 className={`w-4 h-4 ${isSyamsiyah ? 'text-amber-500' : 'text-sky-600'}`} />
                  <span>{isSyamsiyah ? 'Alif Lam Syamsiyah' : 'Alif Lam Qamariyah'}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-arabic">
                  {isSyamsiyah ? 'الـ + حروف شمسية' : 'الـ + حروف قمرية'}
                </p>
              </div>
            </div>

            {/* Explanation box */}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
              isSyamsiyah 
                ? 'bg-amber-50/80 border-amber-200 text-amber-950' 
                : 'bg-sky-50/80 border-sky-200 text-sky-950'
            }`}>
              <div className="flex items-start gap-2.5">
                <Sparkles className={`w-4 h-4 mt-0.5 shrink-0 ${isSyamsiyah ? 'text-amber-600' : 'text-indigo-600'}`} />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide mb-1">
                    Penjelasan Tajwid:
                  </h4>
                  <p>{example.explanation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer button */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                playTapSound();
                onClose();
              }}
              className="px-6 py-2 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              id="close-modal-footer-button"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
