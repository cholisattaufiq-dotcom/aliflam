import { useState } from 'react';
import { ActiveTab, ExampleWord } from './types';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import SyamsiyahSection from './components/SyamsiyahSection';
import QamariyahSection from './components/QamariyahSection';
import ComparisonSection from './components/ComparisonSection';
import QuizSection from './components/QuizSection';
import SortingGame from './components/SortingGame';
import InteractiveWordModal from './components/InteractiveWordModal';
import { Sun, Moon, BookOpen, Heart } from 'lucide-react';
import { playTapSound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [selectedWord, setSelectedWord] = useState<ExampleWord | null>(null);

  const handleSelectWord = (word: ExampleWord) => {
    setSelectedWord(word);
  };

  const handleCloseModal = () => {
    setSelectedWord(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'beranda' && (
          <HomeSection 
            onStartLearning={(tab) => setActiveTab(tab)} 
            onSelectWord={handleSelectWord}
          />
        )}

        {activeTab === 'syamsiyah' && (
          <SyamsiyahSection 
            onSelectWord={handleSelectWord}
          />
        )}

        {activeTab === 'qamariyah' && (
          <QamariyahSection 
            onSelectWord={handleSelectWord}
          />
        )}

        {activeTab === 'perbandingan' && (
          <ComparisonSection 
            onSelectWord={handleSelectWord}
            onGoToQuiz={() => setActiveTab('latihan')}
          />
        )}

        {activeTab === 'latihan' && (
          <QuizSection 
            onPlayGame={() => setActiveTab('game')}
          />
        )}

        {activeTab === 'game' && (
          <SortingGame />
        )}
      </main>

      {/* Interactive Word Modal */}
      <InteractiveWordModal 
        example={selectedWord} 
        onClose={handleCloseModal} 
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-500">
              <Sun className="w-4 h-4" />
              <Moon className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-semibold text-slate-700">
              Alif Lam Syamsiyah (الـ الشَّمْسِيَّة) &amp; Alif Lam Qamariyah (الـ الْقَمَرِيَّة)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                playTapSound();
                setActiveTab('syamsiyah');
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              14 Huruf Syamsiyah
            </button>
            <span>•</span>
            <button
              onClick={() => {
                playTapSound();
                setActiveTab('qamariyah');
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              14 Huruf Qamariyah
            </button>
            <span>•</span>
            <button
              onClick={() => {
                playTapSound();
                setActiveTab('latihan');
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              Kuis
            </button>
            <span>•</span>
            <button
              onClick={() => {
                playTapSound();
                setActiveTab('game');
              }}
              className="hover:text-emerald-700 transition-colors"
            >
              Game
            </button>
          </div>

          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            Media Pembelajaran Tajwid Ramah Anak &amp; Pemula
          </p>
        </div>
      </footer>
    </div>
  );
}
