import React from 'react';
import { useMusic } from '../context/useMusic';
import { X, Check, Sparkles, Zap, Shield, Flame } from 'lucide-react';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, setUpgradeModalOpen, showToast } = useMusic();

  if (!isUpgradeModalOpen) return null;

  const handleSimulateUpgrade = (tierName: string) => {
    showToast(`Subscribed to Melody ${tierName}! Demo activation complete.`);
    setUpgradeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-900/30 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setUpgradeModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800/60 hover:bg-zinc-700/60 transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Melody SaaS Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Unlock High-Fidelity Audio & Pro Perks
          </h2>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Experience uncompressed 24-bit lossless streaming, unlimited offline playlists, and AI-powered vibe generation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="flex flex-col justify-between p-6 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div>
              <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Current Tier</div>
              <h3 className="text-xl font-bold text-white mt-1">Free Streamer</h3>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-3xl font-black">$0</span>
                <span className="text-zinc-400 text-sm ml-1">/forever</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">Essential features for casual music lovers.</p>

              <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-zinc-500" /> Standard 160kbps audio
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-zinc-500" /> Unlimited browser playlists
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-zinc-500" /> LocalStorage persistence
                </li>
                <li className="flex items-center gap-2 text-zinc-600">
                  <X size={14} /> Lossless FLAC streaming
                </li>
                <li className="flex items-center gap-2 text-zinc-600">
                  <X size={14} /> Multi-device audio sync
                </li>
              </ul>
            </div>

            <button
              disabled
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-zinc-800 text-zinc-400 font-semibold text-xs tracking-wide cursor-not-allowed text-center"
            >
              Active Plan
            </button>
          </div>

          {/* Pro Tier (Popular) */}
          <div className="relative flex flex-col justify-between p-6 rounded-xl border-2 border-purple-500 bg-gradient-to-b from-purple-950/40 via-zinc-900/80 to-zinc-950 shadow-lg shadow-purple-950/50">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow">
              Most Popular
            </div>

            <div>
              <div className="text-sm font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                <Zap size={14} /> Melody Pro
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Audiophile</h3>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-3xl font-black">$9.99</span>
                <span className="text-zinc-400 text-sm ml-1">/month</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">Crystal clear music with zero restrictions.</p>

              <ul className="mt-6 space-y-3 text-xs text-zinc-200">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" /> 24-bit / 96kHz Lossless FLAC
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" /> Zero advertisements or interruptions
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" /> Unlimited offline downloads
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" /> Cross-device real-time sync
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" /> Exclusive artist release previews
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSimulateUpgrade('Pro (Audiophile)')}
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-md shadow-purple-900/50 hover:shadow-purple-700/50 transition-all text-center cursor-pointer"
            >
              Start 30-Day Free Trial
            </button>
          </div>

          {/* Studio Tier */}
          <div className="flex flex-col justify-between p-6 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <div>
              <div className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Flame size={14} /> Melody Studio
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Creator & Producer</h3>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-3xl font-black">$24.99</span>
                <span className="text-zinc-400 text-sm ml-1">/month</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">For sound designers, DJs, and commercial creators.</p>

              <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-400" /> Everything in Melody Pro
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-400" /> AI Stems & Vocal Isolator
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-400" /> Royalty-free commercial license
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-400" /> Direct upload & creator royalties
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-indigo-400" /> 24/7 Priority Sound Support
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSimulateUpgrade('Studio')}
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs tracking-wide transition-colors text-center cursor-pointer"
            >
              Upgrade to Studio
            </button>
          </div>
        </div>

        {/* Future Architecture Notice */}
        <div className="mt-8 p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 text-xs text-zinc-400 flex items-start gap-3">
          <Shield size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-purple-300">SaaS Integration Ready: </span>
            Designed to seamlessly connect with Supabase Auth, PostgreSQL Row Level Security (RLS), and Stripe / Lemon Squeezy billing webhooks in production.
          </div>
        </div>
      </div>
    </div>
  );
};
