import React, { useState } from 'react';
import { useMusic } from '../context/useMusic';
import {
  Home,
  Search,
  Library,
  Heart,
  Plus,
  Music,
  Trash2,
  Sparkles,
  Database,
  Radio,
} from 'lucide-react';
import { PlaylistModal } from './PlaylistModal';

interface SidebarProps {
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenOnMobile, onCloseMobile }) => {
  const {
    activeView,
    setActiveView,
    playlists,
    createPlaylist,
    deletePlaylist,
    likedTrackIds,
    setUpgradeModalOpen,
  } = useMusic();

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleCreatePlaylist = (title: string, description: string) => {
    const id = createPlaylist(title, description);
    setActiveView({ type: 'playlist', playlistId: id });
    if (onCloseMobile) onCloseMobile();
  };

  const isHomeActive = activeView.type === 'home';
  const isSearchActive = activeView.type === 'search';
  const isLibraryActive = activeView.type === 'library';
  const isLikedActive = activeView.type === 'liked';

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-purple-950/40 p-4 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          isOpenOnMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ paddingBottom: '100px' }} // Room above player
      >
        <div className="flex flex-col gap-6">
          {/* Logo & Brand Header */}
          <div
            onClick={() => {
              setActiveView({ type: 'home' });
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center gap-2.5 px-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-900/50 group-hover:scale-105 transition-transform">
              <Radio size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-zinc-100 to-purple-300 bg-clip-text text-transparent">
                  Melody
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium">SaaS Music Streaming</p>
            </div>
          </div>

          {/* Primary Navigation Menu */}
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => {
                setActiveView({ type: 'home' });
                if (onCloseMobile) onCloseMobile();
              }}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                isHomeActive
                  ? 'bg-purple-900/30 text-white font-semibold shadow-inner border border-purple-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
              }`}
            >
              <Home size={20} className={isHomeActive ? 'text-purple-400' : ''} />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setActiveView({ type: 'search' });
                if (onCloseMobile) onCloseMobile();
              }}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                isSearchActive
                  ? 'bg-purple-900/30 text-white font-semibold shadow-inner border border-purple-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
              }`}
            >
              <Search size={20} className={isSearchActive ? 'text-purple-400' : ''} />
              <span>Search</span>
            </button>

            <button
              onClick={() => {
                setActiveView({ type: 'library' });
                if (onCloseMobile) onCloseMobile();
              }}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                isLibraryActive
                  ? 'bg-purple-900/30 text-white font-semibold shadow-inner border border-purple-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
              }`}
            >
              <Library size={20} className={isLibraryActive ? 'text-purple-400' : ''} />
              <span>Your Library</span>
            </button>

            <button
              onClick={() => {
                setActiveView({ type: 'liked' });
                if (onCloseMobile) onCloseMobile();
              }}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                isLikedActive
                  ? 'bg-purple-900/30 text-white font-semibold shadow-inner border border-purple-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white">
                  <Heart size={12} className="fill-white" />
                </div>
                <span>Liked Songs</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-900 text-purple-300 font-mono">
                {likedTrackIds.length}
              </span>
            </button>
          </nav>

          <hr className="border-zinc-800/80" />

          {/* Playlists Section */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Playlists
              </span>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Create playlist"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Scrollable list of playlists */}
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[35vh] pr-1">
              {playlists.map((pl) => {
                const isSelected =
                  activeView.type === 'playlist' && activeView.playlistId === pl.id;
                return (
                  <div
                    key={pl.id}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-purple-900/20 text-purple-300 font-semibold border-l-2 border-purple-500'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                    onClick={() => {
                      setActiveView({ type: 'playlist', playlistId: pl.id });
                      if (onCloseMobile) onCloseMobile();
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <Music size={14} className={isSelected ? 'text-purple-400' : 'text-zinc-500'} />
                      <span className="truncate">{pl.title}</span>
                    </div>

                    {pl.isUserCreated && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePlaylist(pl.id);
                        }}
                        className="p-1 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete playlist"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner & Storage Sync Info */}
        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-900/40 via-purple-800/20 to-zinc-900 border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer text-left group"
          >
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles size={13} className="text-purple-400" />
                <span>Go Pro</span>
              </div>
              <p className="text-[10px] text-zinc-400">Unlock FLAC & Offline</p>
            </div>
            <span className="text-[10px] font-bold text-purple-300 group-hover:translate-x-0.5 transition-transform">
              Upgrade &rarr;
            </span>
          </button>

          <div className="flex items-center gap-2 px-2 text-[10px] text-zinc-500">
            <Database size={11} className="text-emerald-500" />
            <span>LocalStorage Synced (Offline Ready)</span>
          </div>
        </div>
      </aside>

      {/* Playlist Creation Modal */}
      <PlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreatePlaylist}
        mode="create"
      />
    </>
  );
};
