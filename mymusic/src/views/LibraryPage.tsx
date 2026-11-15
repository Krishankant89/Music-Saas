import React, { useState } from 'react';
import { useMusic } from '../context/useMusic';
import { TRACK_CATALOG } from '../data/catalog';
import { Plus, Heart, Play, Trash2, Library as LibraryIcon } from 'lucide-react';
import { PlaylistModal } from '../components/PlaylistModal';

type LibraryTab = 'all' | 'playlists' | 'liked';

export const LibraryPage: React.FC = () => {
  const {
    playlists,
    createPlaylist,
    deletePlaylist,
    likedTrackIds,
    setActiveView,
    playTrack,
  } = useMusic();

  const [activeTab, setActiveTab] = useState<LibraryTab>('all');
  const [isModalOpen, setModalOpen] = useState(false);

  const likedTracks = TRACK_CATALOG.filter((t) => likedTrackIds.includes(t.id));

  const handleCreate = (title: string, desc: string) => {
    const id = createPlaylist(title, desc);
    setActiveView({ type: 'playlist', playlistId: id });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <LibraryIcon size={28} className="text-purple-400" />
            <span>Your Library</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your personal collections, liked tracks, and custom playlists.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer w-max"
        >
          <Plus size={16} />
          <span>New Playlist</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        {(['all', 'playlists', 'liked'] as LibraryTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {tab === 'liked' ? 'Liked Songs' : tab}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Liked Songs Special Card (Featured) */}
        {(activeTab === 'all' || activeTab === 'liked') && (
          <div
            onClick={() => setActiveView({ type: 'liked' })}
            className="group col-span-2 relative p-5 rounded-2xl bg-gradient-to-br from-purple-800 via-indigo-900 to-zinc-900 border border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute right-4 bottom-4 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-600/80 border border-purple-400/50 flex items-center justify-center text-white shadow-lg mb-4">
                <Heart size={24} className="fill-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Liked Songs</h3>
              <p className="text-xs text-purple-200 mt-1">
                {likedTracks.length} favorite track{likedTracks.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4 mt-4 border-t border-purple-700/40">
              <span className="text-[11px] font-semibold text-purple-200 uppercase tracking-wider">
                Auto-synced
              </span>
              {likedTracks.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playTrack(likedTracks[0], likedTracks);
                  }}
                  className="w-11 h-11 rounded-full bg-white hover:bg-purple-100 text-purple-900 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Play all liked songs"
                >
                  <Play size={18} className="fill-purple-900 ml-0.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Playlists Cards */}
        {(activeTab === 'all' || activeTab === 'playlists') &&
          playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => setActiveView({ type: 'playlist', playlistId: pl.id })}
              className="group relative p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-purple-500/40 transition-all cursor-pointer flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-950 mb-3 shadow">
                  <img
                    src={pl.coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'}
                    alt={pl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {pl.isUserCreated && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlaylist(pl.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-zinc-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete playlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <h4 className="font-bold text-sm text-white group-hover:text-purple-300 truncate">
                  {pl.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-snug">
                  {pl.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-800/50 flex items-center justify-between text-[11px] text-zinc-500">
                <span>{pl.trackIds.length} song{pl.trackIds.length !== 1 ? 's' : ''}</span>
                {pl.isUserCreated && <span className="text-purple-400 font-medium">Custom</span>}
              </div>
            </div>
          ))}
      </div>

      <PlaylistModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleCreate}
        mode="create"
      />
    </div>
  );
};
