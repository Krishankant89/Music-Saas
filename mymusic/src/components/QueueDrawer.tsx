import React from 'react';
import { useMusic } from '../context/useMusic';
import { formatDuration } from '../utils/formatters';
import { X, Trash2, ListMusic, Volume2 } from 'lucide-react';

export const QueueDrawer: React.FC = () => {
  const {
    isQueueOpen,
    setQueueOpen,
    queue,
    queueIndex,
    currentTrack,
    isPlaying,
    playTrack,
    removeFromQueue,
    clearQueue,
  } = useMusic();

  if (!isQueueOpen) return null;

  const nextTracks = queue.slice(queueIndex + 1);

  return (
    <div
      className="fixed inset-y-0 right-0 z-40 w-80 sm:w-96 bg-zinc-950/95 border-l border-purple-500/20 backdrop-blur-xl shadow-2xl flex flex-col animate-slide-left"
      style={{ bottom: '90px' }} // Above bottom music player
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <ListMusic size={18} className="text-purple-400" />
          <h3 className="font-bold text-white text-base">Playback Queue</h3>
          <span className="text-xs text-zinc-400">({queue.length})</span>
        </div>
        <div className="flex items-center gap-2">
          {queue.length > 1 && (
            <button
              onClick={clearQueue}
              className="text-xs text-zinc-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
              title="Clear upcoming queue"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setQueueOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Currently Playing Section */}
        {currentTrack && (
          <div>
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Volume2 size={13} />
              <span>Now Playing</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 shadow-md">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm text-purple-200 truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-purple-300 bg-purple-900/50 px-1.5 py-0.5 rounded font-mono">
                    {formatDuration(currentTrack.duration)}
                  </span>
                  {isPlaying && (
                    <span className="text-[10px] text-green-400 font-medium">Playing</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Up Section */}
        <div>
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Next Up ({nextTracks.length})
          </div>

          {nextTracks.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-xs bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
              No more tracks in queue.
              <br />
              Add tracks from the catalog or a playlist!
            </div>
          ) : (
            <div className="space-y-1.5">
              {nextTracks.map((track, i) => {
                const actualIndex = queueIndex + 1 + i;
                return (
                  <div
                    key={`${track.id}-${actualIndex}`}
                    className="group flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/80 border border-transparent hover:border-zinc-700/60 transition-all cursor-pointer text-xs"
                    onClick={() => playTrack(track, queue)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <img
                        src={track.coverArt}
                        alt={track.title}
                        className="w-9 h-9 rounded object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 pr-2">
                        <div className="font-medium text-zinc-200 group-hover:text-purple-300 truncate">
                          {track.title}
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate">{track.artist}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-zinc-400 font-mono text-[11px]">
                        {formatDuration(track.duration)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromQueue(actualIndex);
                        }}
                        className="p-1 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from queue"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
