import { useState } from 'react';
import { ActiveTab } from '../types';
import { Sun, Moon, Sparkles, BookOpen, Layers, HelpCircle, Gamepad2, Menu, X } from 'lucide-react';
import { playTapSound } from '../utils/audio';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Navbar({ activeTab, setActiveTab }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: typeof Sun; badge?: string }[] = [
    { id: 'beranda', label: 'Beranda', icon: BookOpen },
    { id: 'syamsiyah', label: 'Syamsiyah', icon: Sun },
    { id: 'qamariyah', label: 'Qamariyah', icon: Moon },
    { id: 'perbandingan', label: 'Perbandingan', icon: Layers },
    { id: 'latihan', label: 'Latihan Kuis', icon: HelpCircle },
    { id: 'game', label: 'Game Huruf', icon: Gamepad2, badge: 'Seru!' },
  ];

  const handleSelect = (tab: ActiveTab) => {
    playTapSound();
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title with Bento Style */}
          <button 
            onClick={() => handleSelect('beranda')} 
            className="flex items-center gap-3 text-left focus:outline-hidden group"
            id="brand-logo-button"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xs font-arabic group-hover:scale-105 transition-transform">
              ال
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold leading-none text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Belajar Tajwid
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  Bento Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Alif Lam Syamsiyah &amp; Qamariyah
              </p>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  id={`nav-tab-${item.id}`}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive 
                      ? 'text-indigo-600'
                      : 'text-slate-400'
                  }`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[9px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelect('syamsiyah')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-xs transition-colors"
              id="header-start-btn"
            >
              <span>Mulai Belajar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden md:hidden"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                id={`mobile-nav-${item.id}`}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${
                    isActive 
                      ? 'text-indigo-600' 
                      : 'text-slate-400'
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
