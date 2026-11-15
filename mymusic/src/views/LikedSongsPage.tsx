import React from 'react';
import { useMusic } from '../context/useMusic';
import { TRACK_CATALOG } from '../data/catalog';
import { TrackRow } from '../components/TrackRow';
import { formatDuration } from '../utils/formatters';
import { Heart, Play, Pause, Clock, Sparkles } from 'lucide-react';

export const LikedSongsPage: React.FC = () => {
  const {
    likedTrackIds,
    playTrack,
    togglePlay,
    currentTrack,
    isPlaying,
    setActiveView,
  } = useMusic();

  const likedTracks = TRACK_CATALOG.filter((t) => likedTrackIds.includes(t.id));
  const totalDurationSeconds = likedTracks.reduce((sum, t) => sum + (t.duration || 0), 0);

  const isLikedPlaying =
    isPlaying && likedTracks.some((t) => t.id === currentTrack?.id);

  const handlePlayAll = () => {
    if (likedTracks.length === 0) return;
    if (isLikedPlaying) {
      togglePlay();
    } else {
      playTrack(likedTracks[0], likedTracks);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Liked Songs Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-950 to-zinc-950 p-6 sm:p-8 border border-purple-500/20 shadow-2xl flex flex-col sm:flex-row items-center sm:items-end gap-6">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center text-white shadow-2xl shadow-purple-950/80 flex-shrink-0 border border-purple-400/30">
          <Heart size={72} className="fill-white" />
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles size={13} /> Personal Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            Liked Songs
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-2">
            Every track you&apos;ve loved, saved locally and synced across your session.
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 text-xs text-zinc-300">
            <span className="font-semibold text-white">Alex Rivera</span>
            <span>•</span>
            <span>{likedTracks.length} song{likedTracks.length !== 1 ? 's' : ''}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock size={12} /> {formatDuration(totalDurationSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      {likedTracks.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <button
            onClick={handlePlayAll}
            className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-xl shadow-purple-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label={isLikedPlaying ? 'Pause liked songs' : 'Play liked songs'}
          >
            {isLikedPlaying ? (
              <Pause size={22} className="fill-white" />
            ) : (
              <Play size={22} className="fill-white ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Tracks Table */}
      {likedTracks.length > 0 ? (
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

          {likedTracks.map((track, i) => (
            <TrackRow
              key={track.id}
              track={track}
              index={i}
              trackList={likedTracks}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
          <div className="w-12 h-12 rounded-full bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-3">
            <Heart size={22} />
          </div>
          <h3 className="text-base font-bold text-white">No liked songs yet</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Click the heart icon on any song you love to save it to this private collection.
          </p>
          <button
            onClick={() => setActiveView({ type: 'home' })}
            className="mt-4 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-md shadow-purple-900/40 transition-all cursor-pointer"
          >
            Discover Music
          </button>
        </div>
      )}
    </div>
  );
};
