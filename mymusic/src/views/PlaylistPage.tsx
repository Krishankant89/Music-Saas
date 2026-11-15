import React, { useState } from 'react';
import { useMusic } from '../context/useMusic';
import { TRACK_CATALOG } from '../data/catalog';
import { TrackRow } from '../components/TrackRow';
import { PlaylistModal } from '../components/PlaylistModal';
import { formatDuration } from '../utils/formatters';
import { Play, Pause, Edit2, Trash2, Clock, Music, Plus } from 'lucide-react';

interface PlaylistPageProps {
  playlistId: string;
}

export const PlaylistPage: React.FC<PlaylistPageProps> = ({ playlistId }) => {
  const {
    playlists,
    renamePlaylist,
    deletePlaylist,
    removeTrackFromPlaylist,
    playTrack,
    togglePlay,
    currentTrack,
    isPlaying,
    setActiveView,
  } = useMusic();

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Playlist not found</h2>
        <p className="text-xs text-zinc-400">The requested playlist does not exist or was deleted.</p>
        <button
          onClick={() => setActiveView({ type: 'library' })}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold"
        >
          Back to Library
        </button>
      </div>
    );
  }

  // Resolve tracks
  const tracks = playlist.trackIds
    .map((id) => TRACK_CATALOG.find((t) => t.id === id))
    .filter((t): t is typeof TRACK_CATALOG[0] => t !== undefined);

  const totalDurationSeconds = tracks.reduce((sum, t) => sum + (t.duration || 0), 0);
  const isPlaylistPlaying =
    isPlaying && tracks.some((t) => t.id === currentTrack?.id);

  const handlePlayAll = () => {
    if (tracks.length === 0) return;
    if (isPlaylistPlaying) {
      togglePlay();
    } else {
      playTrack(tracks[0], tracks);
    }
  };

  const handleSaveEdit = (newTitle: string, newDesc: string) => {
    renamePlaylist(playlist.id, newTitle, newDesc);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Playlist Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/60 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 border border-purple-500/20 shadow-xl flex flex-col sm:flex-row items-center sm:items-end gap-6">
        <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-xl overflow-hidden shadow-2xl shadow-black/80 flex-shrink-0 bg-zinc-900 border border-purple-500/30">
          <img
            src={playlist.coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'}
            alt={playlist.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
            {playlist.isUserCreated ? 'Custom Playlist' : 'Melody Playlist'}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 truncate">
            {playlist.title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-xl">
            {playlist.description}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 text-xs text-zinc-400">
            <span className="font-semibold text-white">Melody Curator</span>
            <span>•</span>
            <span>{tracks.length} track{tracks.length !== 1 ? 's' : ''}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock size={12} /> {formatDuration(totalDurationSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Playlist Actions Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayAll}
            disabled={tracks.length === 0}
            className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-xl shadow-purple-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label={isPlaylistPlaying ? 'Pause playlist' : 'Play playlist'}
          >
            {isPlaylistPlaying ? (
              <Pause size={22} className="fill-white" />
            ) : (
              <Play size={22} className="fill-white ml-0.5" />
            )}
          </button>

          {playlist.isUserCreated && (
            <>
              <button
                onClick={() => setEditModalOpen(true)}
                className="p-2.5 rounded-full border border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Edit playlist details"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deletePlaylist(playlist.id)}
                className="p-2.5 rounded-full border border-zinc-700/60 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Delete playlist"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setActiveView({ type: 'search' })}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
        >
          <Plus size={14} />
          <span>Find more tracks</span>
        </button>
      </div>

      {/* Tracks Table Header */}
      {tracks.length > 0 ? (
        <div className="space-y-1">
          <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[24px_1fr_1fr_auto] items-center px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800/80">
            <span className="w-6 text-center">#</span>
            <span>Title</span>
            <span className="hidden md:block">Album</span>
            <div className="flex items-center justify-end gap-6 sm:gap-8 pr-2">
              <span className="hidden sm:inline">Time</span>
              <Clock size={14} />
            </div>
          </div>

          {/* Track Rows */}
          {tracks.map((track, i) => (
            <TrackRow
              key={track.id}
              track={track}
              index={i}
              trackList={tracks}
              playlistId={playlist.id}
              onRemoveFromPlaylist={
                playlist.isUserCreated
                  ? (id) => removeTrackFromPlaylist(playlist.id, id)
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
          <div className="w-12 h-12 rounded-full bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-3">
            <Music size={22} />
          </div>
          <h3 className="text-base font-bold text-white">This playlist has no songs yet</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Find your favorite beats from Home or Search, and click &ldquo;Add to Playlist&rdquo; to build your soundtrack.
          </p>
          <button
            onClick={() => setActiveView({ type: 'search' })}
            className="mt-4 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-md shadow-purple-900/40 transition-all cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      )}

      {/* Edit Modal */}
      <PlaylistModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        initialTitle={playlist.title}
        initialDescription={playlist.description}
        mode="edit"
      />
    </div>
  );
};
