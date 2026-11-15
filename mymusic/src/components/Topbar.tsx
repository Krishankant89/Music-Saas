import React, { useState } from 'react';
import { useMusic } from '../context/useMusic';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Sparkles,
  Menu,
  LogOut,
  Sliders,
} from 'lucide-react';

interface TopbarProps {
  onToggleMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileMenu }) => {
  const {
    activeView,
    setActiveView,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    searchQuery,
    setSearchQuery,
    setUpgradeModalOpen,
    showToast,
  } = useMusic();

  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleSearchFocus = () => {
    if (activeView.type !== 'search') {
      setActiveView({ type: 'search' });
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/80 px-4 sm:px-8 flex items-center justify-between gap-4 select-none">
      {/* Left: Mobile Menu Toggle & Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            aria-label="Go back"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              canGoBack
                ? 'bg-zinc-900 hover:bg-zinc-800 text-white'
                : 'bg-zinc-900/40 text-zinc-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            aria-label="Go forward"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              canGoForward
                ? 'bg-zinc-900 hover:bg-zinc-800 text-white'
                : 'bg-zinc-900/40 text-zinc-600 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="flex-1 max-w-md mx-2">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeView.type !== 'search') {
                setActiveView({ type: 'search' });
              }
            }}
            placeholder="Search tracks, artists, moods..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800/80 focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 text-white placeholder-zinc-500 text-xs sm:text-sm outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-zinc-500 hover:text-white"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Right: Upgrade button & User Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setUpgradeModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-900/40 hover:shadow-purple-700/50 transition-all cursor-pointer"
        >
          <Sparkles size={13} />
          <span>Explore Plans</span>
        </button>

        {/* User Profile Avatar with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-purple-700/60 border border-purple-500/40 flex items-center justify-center text-purple-200">
              <User size={14} />
            </div>
            <span className="hidden md:inline-block text-xs font-medium text-zinc-200">
              Alex Rivera
            </span>
          </button>

          {isProfileMenuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-zinc-900 border border-purple-500/20 shadow-2xl shadow-black/80 p-2 z-50 text-xs text-zinc-200 backdrop-blur-md animate-fade-in"
              onClick={() => setProfileMenuOpen(false)}
            >
              <div className="px-3 py-2 border-b border-zinc-800/80 mb-1">
                <div className="font-semibold text-white">Alex Rivera</div>
                <div className="text-[11px] text-zinc-400">alex.rivera@example.com</div>
                <span className="inline-block mt-1 text-[10px] font-bold text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Free Tier (SaaS Ready)
                </span>
              </div>

              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-zinc-800 text-purple-300 font-medium transition-colors"
              >
                <Sparkles size={14} className="text-purple-400" />
                <span>Upgrade to Melody Pro</span>
              </button>

              <button
                onClick={() => showToast('Preferences will be connected to PostgreSQL & Supabase.')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-zinc-800 text-zinc-300 transition-colors"
              >
                <Sliders size={14} className="text-zinc-400" />
                <span>Audio Quality & Settings</span>
              </button>

              <div className="h-px bg-zinc-800 my-1" />

              <button
                onClick={() => showToast('Demo session. Authentication ready for Supabase Auth.')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <LogOut size={14} />
                <span>Log out (Demo)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
