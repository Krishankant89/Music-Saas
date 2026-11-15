import React, { useState, useRef, useEffect } from 'react';
import type { Track } from '../types/music';
import { useMusic } from '../context/useMusic';
import { formatDuration } from '../utils/formatters';
import { Play, Pause, Heart, MoreHorizontal, Plus, ListPlus, Trash2 } from 'lucide-react';

interface TrackRowProps {
  track: Track;
  index: number;
  trackList?: Track[];
  playlistId?: string; // If rendered inside a specific playlist
  onRemoveFromPlaylist?: (trackId: string) => void;
}

export const TrackRow: React.FC<TrackRowProps> = ({
  track,
  index,
  trackList,
  playlistId,
  onRemoveFromPlaylist,
}) => {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    isLiked,
    toggleLike,
    playlists,
    addTrackToPlaylist,
    addToQueue,
  } = useMusic();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isCurrentTrack = currentTrack?.id === track.id;
  const isThisPlaying = isCurrentTrack && isPlaying;
  const liked = isLiked(track.id);

  // Close context menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  const handleRowClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, trackList);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(track.id);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleRowClick}
      className={`group relative flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer select-none ${
        isCurrentTrack
          ? 'bg-purple-900/20 text-purple-300 border border-purple-500/20'
          : 'hover:bg-zinc-800/60 text-zinc-300'
      }`}
    >
      {/* Left section: Index / Play button & Track Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Track Number / Play Icon / Equalizer */}
        <div className="w-6 flex items-center justify-center text-xs text-zinc-400 font-mono">
          {isThisPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-purple-400 rounded-full animate-pulse-eq-1" style={{ height: '10px' }} />
              <span className="w-0.5 bg-purple-400 rounded-full animate-pulse-eq-2" style={{ height: '14px' }} />
              <span className="w-0.5 bg-purple-400 rounded-full animate-pulse-eq-3" style={{ height: '8px' }} />
            </div>
          ) : (
            <>
              <span className="group-hover:hidden">{index + 1}</span>
              <button
                type="button"
                className="hidden group-hover:flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label={isCurrentTrack && isPlaying ? 'Pause' : 'Play'}
              >
                {isCurrentTrack && isPlaying ? (
                  <Pause size={14} className="fill-white" />
                ) : (
                  <Play size={14} className="fill-white ml-0.5" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Thumbnail */}
        <img
          src={track.coverArt}
          alt={track.title}
          className="w-10 h-10 rounded-md object-cover flex-shrink-0 bg-zinc-900"
          loading="lazy"
        />

        {/* Title and Artist */}
        <div className="min-w-0 pr-2">
          <div
            className={`font-medium truncate ${
              isCurrentTrack ? 'text-purple-400 font-semibold' : 'text-white'
            }`}
          >
            {track.title}
          </div>
          <div className="text-xs text-zinc-400 truncate flex items-center gap-2">
            <span>{track.artist}</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-zinc-600" />
            <span className="hidden sm:inline-block text-[11px] text-zinc-400">{track.genre}</span>
          </div>
        </div>
      </div>

      {/* Center: Album (hidden on mobile) */}
      <div className="hidden md:block flex-1 text-xs text-zinc-400 truncate px-4">
        {track.album}
      </div>

      {/* Right: Like, Duration, More Menu */}
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          aria-label={liked ? 'Unlike track' : 'Like track'}
          className={`p-1.5 rounded-full transition-colors ${
            liked
              ? 'text-purple-400'
              : 'text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-white'
          }`}
        >
          <Heart size={16} className={liked ? 'fill-purple-400' : ''} />
        </button>

        {/* Duration */}
        <span className="text-xs text-zinc-400 font-mono w-10 text-right">
          {formatDuration(track.duration)}
        </span>

        {/* More Options Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            aria-label="More options"
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-700/60 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal size={16} />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-52 py-1.5 rounded-xl bg-zinc-900 border border-purple-500/20 shadow-2xl shadow-black/80 z-40 text-xs text-zinc-200 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  addToQueue(track);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-zinc-800/80 hover:text-purple-300 transition-colors"
              >
                <ListPlus size={15} className="text-purple-400" />
                <span>Play Next in Queue</span>
              </button>

              <div className="h-px bg-zinc-800 my-1" />

              <div className="px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Add to Playlist
              </div>

              <div className="max-h-36 overflow-y-auto">
                {playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => {
                      addTrackToPlaylist(pl.id, track.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-zinc-800/80 hover:text-purple-300 truncate transition-colors"
                  >
                    <span className="truncate">{pl.title}</span>
                    <Plus size={13} className="text-zinc-500 flex-shrink-0" />
                  </button>
                ))}
              </div>

              {playlistId && onRemoveFromPlaylist && (
                <>
                  <div className="h-px bg-zinc-800 my-1" />
                  <button
                    onClick={() => {
                      onRemoveFromPlaylist(track.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Remove from this playlist</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
