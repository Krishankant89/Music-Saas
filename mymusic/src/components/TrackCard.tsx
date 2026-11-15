import React from 'react';
import type { Track } from '../types/music';
import { useMusic } from '../context/useMusic';
import { Play, Pause, Heart } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  trackList?: Track[];
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, trackList }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay, isLiked, toggleLike } = useMusic();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isThisPlaying = isCurrentTrack && isPlaying;
  const liked = isLiked(track.id);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  return (
    <div
      onClick={handlePlayClick}
      className="group relative p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/50 hover:border-purple-500/40 transition-all duration-200 cursor-pointer flex flex-col shadow-lg shadow-black/30 hover:shadow-purple-950/20"
    >
      {/* Artwork Container */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-950 mb-3 shadow-md">
        <img
          src={track.coverArt}
          alt={track.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Playing equalizer indicator */}
        {isThisPlaying && (
          <div className="absolute top-2 left-2 z-10 flex items-end gap-0.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm border border-purple-500/40">
            <span className="w-1 bg-purple-400 rounded-full animate-pulse-eq-1" style={{ height: '14px' }} />
            <span className="w-1 bg-purple-400 rounded-full animate-pulse-eq-2" style={{ height: '18px' }} />
            <span className="w-1 bg-purple-400 rounded-full animate-pulse-eq-3" style={{ height: '10px' }} />
          </div>
        )}

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Play/Pause Button overlay */}
        <button
          onClick={handlePlayClick}
          aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          className={`absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center text-white bg-purple-600 hover:bg-purple-500 shadow-xl shadow-purple-950/80 transition-all duration-200 cursor-pointer transform ${
            isCurrentTrack
              ? 'opacity-100 scale-100'
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          {isThisPlaying ? (
            <Pause size={20} className="fill-white" />
          ) : (
            <Play size={20} className="fill-white ml-0.5" />
          )}
        </button>

        {/* Like Button on hover */}
        <button
          onClick={handleLikeClick}
          aria-label={liked ? 'Unlike' : 'Like'}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm transition-all duration-150 ${
            liked
              ? 'opacity-100 text-purple-400'
              : 'opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white'
          }`}
        >
          <Heart size={16} className={liked ? 'fill-purple-400' : ''} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h4
          className={`font-semibold text-sm truncate leading-snug ${
            isCurrentTrack ? 'text-purple-400' : 'text-white group-hover:text-purple-200'
          }`}
        >
          {track.title}
        </h4>
        <p className="text-xs text-zinc-400 truncate mt-1">
          {track.artist}
        </p>
        <span className="mt-2 text-[11px] font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full w-max">
          {track.genre}
        </span>
      </div>
    </div>
  );
};
