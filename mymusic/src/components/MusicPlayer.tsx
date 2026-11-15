import React, { useRef } from 'react';
import { useMusic } from '../context/useMusic';
import { formatDuration } from '../utils/formatters';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  ListMusic,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isLoading,
    playbackError,
    togglePlay,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    isLiked,
    isQueueOpen,
    setQueueOpen,
    clearError,
  } = useMusic();

  const progressRef = useRef<HTMLInputElement>(null);

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVolume = isMuted ? 0 : volume;
  const liked = isLiked(currentTrack.id);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 sm:h-24 bg-zinc-950/95 border-t border-purple-900/30 backdrop-blur-xl px-3 sm:px-6 flex flex-col justify-center select-none shadow-2xl">
      {/* Audio Error Alert Banner */}
      {playbackError && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-red-950/90 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 shadow-lg backdrop-blur-md animate-fade-in">
          <AlertCircle size={14} className="text-red-400" />
          <span>{playbackError}</span>
          <button
            onClick={clearError}
            className="ml-2 underline text-white hover:text-red-200 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 sm:gap-6">
        {/* Left Section: Track Metadata & Like Button */}
        <div className="flex items-center gap-3 w-1/4 min-w-[130px] sm:min-w-[180px] max-w-[280px]">
          <div className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900 shadow-md border border-purple-500/20">
            <img
              src={currentTrack.coverArt}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles size={16} className="text-purple-400 animate-spin" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-semibold text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-zinc-400 truncate hover:text-zinc-200 cursor-pointer">
              {currentTrack.artist}
            </p>
          </div>

          <button
            onClick={() => toggleLike(currentTrack.id)}
            aria-label={liked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
            className={`p-1.5 sm:p-2 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
              liked ? 'text-purple-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Heart size={18} className={liked ? 'fill-purple-400' : ''} />
          </button>
        </div>

        {/* Center Section: Playback Controls & Timeline Scrubber */}
        <div className="flex flex-col items-center flex-1 max-w-2xl px-2">
          {/* Upper Controls Row */}
          <div className="flex items-center gap-3 sm:gap-5 mb-1 sm:mb-1.5">
            {/* Shuffle Button */}
            <button
              onClick={toggleShuffle}
              aria-label={isShuffle ? 'Disable shuffle' : 'Enable shuffle'}
              className={`relative p-1.5 rounded-full transition-colors cursor-pointer ${
                isShuffle ? 'text-purple-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Shuffle size={16} />
              {isShuffle && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
              )}
            </button>

            {/* Previous Track */}
            <button
              onClick={previousTrack}
              aria-label="Previous track (P)"
              title="Previous (P)"
              className="p-1.5 text-zinc-300 hover:text-white hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              <SkipBack size={18} className="fill-current" />
            </button>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              title="Play/Pause (Space)"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center shadow-lg shadow-purple-900/40 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin text-purple-900" />
              ) : isPlaying ? (
                <Pause size={18} className="fill-current" />
              ) : (
                <Play size={18} className="fill-current ml-0.5" />
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={nextTrack}
              aria-label="Next track (N)"
              title="Next (N)"
              className="p-1.5 text-zinc-300 hover:text-white hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              <SkipForward size={18} className="fill-current" />
            </button>

            {/* Repeat Mode Button */}
            <button
              onClick={toggleRepeat}
              aria-label={`Repeat mode: ${repeatMode}`}
              title={`Repeat: ${repeatMode}`}
              className={`relative p-1.5 rounded-full transition-colors cursor-pointer ${
                repeatMode !== 'off' ? 'text-purple-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {repeatMode === 'one' ? <Repeat1 size={17} /> : <Repeat size={16} />}
              {repeatMode !== 'off' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
              )}
            </button>
          </div>

          {/* Lower Row: Scrubber Timeline */}
          <div className="w-full flex items-center gap-2 text-[11px] sm:text-xs text-zinc-400 font-mono">
            <span className="w-8 sm:w-10 text-right">{formatDuration(currentTime)}</span>

            <div className="relative flex-1 flex items-center h-4 group">
              <input
                ref={progressRef}
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime}
                onChange={handleSeekChange}
                aria-label="Seek timeline"
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 group-hover:h-1.5 transition-all"
                style={{
                  background: `linear-gradient(to right, #a855f7 ${progressPercent}%, #27272a ${progressPercent}%)`,
                }}
              />
            </div>

            <span className="w-8 sm:w-10">{formatDuration(duration)}</span>
          </div>
        </div>

        {/* Right Section: Volume & Queue Drawer */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 w-1/4 min-w-[100px] sm:min-w-[160px] max-w-[240px]">
          {/* Queue Drawer Button */}
          <button
            onClick={() => setQueueOpen(!isQueueOpen)}
            aria-label="Toggle queue"
            title="Queue"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isQueueOpen ? 'text-purple-400 bg-purple-950/40' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ListMusic size={18} />
          </button>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-2 group">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              title="Mute / Unmute (M)"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted || currentVolume === 0 ? (
                <VolumeX size={18} className="text-red-400" />
              ) : currentVolume < 0.5 ? (
                <Volume1 size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={currentVolume}
              onChange={handleVolumeChange}
              aria-label="Volume slider"
              className="w-16 sm:w-20 md:w-24 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 group-hover:h-1.5 transition-all"
              style={{
                background: `linear-gradient(to right, #a855f7 ${currentVolume * 100}%, #27272a ${currentVolume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
