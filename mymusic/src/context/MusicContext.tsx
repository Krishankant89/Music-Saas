import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Track, Playlist, RepeatMode, ActiveView, MusicContextType } from '../types/music';
import { TRACK_CATALOG, INITIAL_PLAYLISTS } from '../data/catalog';
import { MusicContext } from './musicContextDefinition';

const STORAGE_KEYS = {
  LIKED: 'melody_liked_tracks_v1',
  PLAYLISTS: 'melody_playlists_v1',
  VOLUME: 'melody_volume_v1',
  REPEAT: 'melody_repeat_mode_v1',
  SHUFFLE: 'melody_shuffle_v1',
  LAST_TRACK: 'melody_last_track_id_v1',
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Audio Element Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Playback state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(() => {
    const savedTrackId = localStorage.getItem(STORAGE_KEYS.LAST_TRACK);
    if (savedTrackId) {
      const found = TRACK_CATALOG.find((t) => t.id === savedTrackId);
      if (found) return found;
    }
    return TRACK_CATALOG[0] || null;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(currentTrack?.duration || 0);
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOLUME);
    return saved !== null ? Number(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(0.8);

  const [isShuffle, setIsShuffle] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.SHUFFLE) === 'true';
  });

  const [repeatMode, setRepeatMode] = useState<RepeatMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REPEAT) as RepeatMode;
    return saved === 'all' || saved === 'one' ? saved : 'off';
  });

  const [queue, setQueue] = useState<Track[]>(() => TRACK_CATALOG);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  // Fallback tracking to prevent infinite retry loops
  const triedFallbackRef = useRef<boolean>(false);

  // Liked tracks state
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIKED);
      return saved ? JSON.parse(saved) : ['track-1', 'track-3'];
    } catch {
      return ['track-1', 'track-3'];
    }
  });

  // Playlists state
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
      return saved ? JSON.parse(saved) : INITIAL_PLAYLISTS;
    } catch {
      return INITIAL_PLAYLISTS;
    }
  });

  // Navigation History Stack
  const [history, setHistory] = useState<ActiveView[]>([{ type: 'home' }]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const activeView = history[historyIndex] || { type: 'home' };

  const setActiveView = useCallback((view: ActiveView) => {
    setHistory((prev) => {
      const current = prev[historyIndex];
      if (
        current &&
        current.type === view.type &&
        (current.type !== 'playlist' || current.playlistId === (view as { playlistId: string }).playlistId)
      ) {
        return prev;
      }
      return [...prev.slice(0, historyIndex + 1), view];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
    }
  }, [historyIndex]);

  const goForward = useCallback(() => {
    setHistoryIndex((prev) => (prev < history.length - 1 ? prev + 1 : prev));
  }, [history.length]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
  const [isQueueOpen, setQueueOpen] = useState<boolean>(false);

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIKED, JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHUFFLE, isShuffle ? 'true' : 'false');
  }, [isShuffle]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPEAT, repeatMode);
  }, [repeatMode]);

  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem(STORAGE_KEYS.LAST_TRACK, currentTrack.id);
    }
  }, [currentTrack]);

  // Audio element setup
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'metadata';
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoading(false);
    };

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setPlaybackError(null);
    };
    const handlePause = () => setIsPlaying(false);

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);

      if (currentTrack && currentTrack.fallbackUrl && !triedFallbackRef.current) {
        triedFallbackRef.current = true;
        console.warn(`Primary audio source failed for "${currentTrack.title}". Switching to fallback URL.`);
        audio.src = currentTrack.fallbackUrl;
        audio.load();
        audio.play().catch((err) => {
          console.error('Playback fallback error:', err);
          setPlaybackError(`Audio playback unavailable for "${currentTrack.title}".`);
        });
      } else {
        const msg = currentTrack ? `Could not load audio for "${currentTrack.title}".` : 'Playback error occurred.';
        setPlaybackError(msg);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Toast auto-clear
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  // Play track implementation
  const playTrack = useCallback((track: Track, newQueue?: Track[]) => {
    if (!audioRef.current) return;
    triedFallbackRef.current = false;
    setPlaybackError(null);
    setIsLoading(true);

    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
      const idx = newQueue.findIndex((t) => t.id === track.id);
      setQueueIndex(idx !== -1 ? idx : 0);
    } else {
      const idx = queue.findIndex((t) => t.id === track.id);
      if (idx !== -1) {
        setQueueIndex(idx);
      } else {
        setQueue((prev) => [track, ...prev]);
        setQueueIndex(0);
      }
    }

    setCurrentTrack(track);
    setDuration(track.duration || 0);

    const audio = audioRef.current;
    audio.src = track.audioUrl;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn('Auto-play blocked or failed, waiting for user action:', err);
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  }, [queue]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (!currentTrack && queue.length > 0) {
      playTrack(queue[0]);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!audioRef.current.src && currentTrack) {
        audioRef.current.src = currentTrack.audioUrl;
        audioRef.current.load();
      }
      audioRef.current.play().catch((err) => {
        console.error('Play request failed:', err);
        setPlaybackError('Could not start playback. Click to try again.');
      });
    }
  }, [currentTrack, isPlaying, playTrack, queue]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;

    if (isShuffle) {
      const randIdx = Math.floor(Math.random() * queue.length);
      playTrack(queue[randIdx]);
      return;
    }

    const nextIndex = queueIndex + 1;
    if (nextIndex < queue.length) {
      playTrack(queue[nextIndex]);
    } else {
      if (repeatMode === 'all') {
        playTrack(queue[0]);
      } else {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          setCurrentTime(0);
        }
      }
    }
  }, [queue, queueIndex, isShuffle, repeatMode, playTrack]);

  const previousTrack = useCallback(() => {
    if (!audioRef.current || queue.length === 0) return;

    // If more than 3 seconds in, rewind current song
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    const prevIndex = queueIndex - 1;
    if (prevIndex >= 0) {
      playTrack(queue[prevIndex]);
    } else {
      if (repeatMode === 'all') {
        playTrack(queue[queue.length - 1]);
      } else {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
    }
  }, [queue, queueIndex, repeatMode, playTrack]);

  const seek = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(seconds, duration || 0));
    audioRef.current.currentTime = clamped;
    setCurrentTime(clamped);
  }, [duration]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeState(previousVolume || 0.8);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  }, [isMuted, volume, previousVolume]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => {
      const nextVal = !prev;
      showToast(nextVal ? 'Shuffle on' : 'Shuffle off');
      return nextVal;
    });
  }, [showToast]);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      const nextMode: RepeatMode = prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off';
      const label = nextMode === 'off' ? 'Repeat off' : nextMode === 'all' ? 'Repeat all' : 'Repeat one';
      showToast(label);
      return nextMode;
    });
  }, [showToast]);

  // Audio track completion handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, nextTrack]);

  // Liked tracks actions
  const toggleLike = useCallback((trackId: string) => {
    setLikedTrackIds((prev) => {
      const isAlreadyLiked = prev.includes(trackId);
      const updated = isAlreadyLiked ? prev.filter((id) => id !== trackId) : [...prev, trackId];
      const track = TRACK_CATALOG.find((t) => t.id === trackId);
      const title = track ? `"${track.title}"` : 'Song';
      showToast(isAlreadyLiked ? `Removed ${title} from Liked Songs` : `Added ${title} to Liked Songs`);
      return updated;
    });
  }, [showToast]);

  const isLiked = useCallback((trackId: string) => likedTrackIds.includes(trackId), [likedTrackIds]);

  // Playlist actions
  const createPlaylist = useCallback((title: string, description?: string): string => {
    const id = `playlist-${Date.now()}`;
    const newPlaylist: Playlist = {
      id,
      title: title.trim() || 'New Playlist',
      description: description || 'Custom user playlist',
      coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      trackIds: [],
      isUserCreated: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPlaylists((prev) => [newPlaylist, ...prev]);
    showToast(`Created playlist "${newPlaylist.title}"`);
    return id;
  }, [showToast]);

  const renamePlaylist = useCallback((id: string, newTitle: string, newDescription?: string) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === id
          ? {
              ...pl,
              title: newTitle.trim() || pl.title,
              description: newDescription !== undefined ? newDescription : pl.description,
            }
          : pl
      )
    );
    showToast('Playlist updated');
  }, [showToast]);

  const deletePlaylist = useCallback((id: string) => {
    setPlaylists((prev) => {
      const target = prev.find((p) => p.id === id);
      const filtered = prev.filter((p) => p.id !== id);
      showToast(`Deleted playlist "${target?.title || 'Playlist'}"`);
      return filtered;
    });
    // Return to library if the user was viewing this playlist
    setActiveView({ type: 'library' });
  }, [showToast, setActiveView]);

  const addTrackToPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          if (pl.trackIds.includes(trackId)) {
            showToast('Song is already in this playlist');
            return pl;
          }
          showToast(`Added to "${pl.title}"`);
          return { ...pl, trackIds: [...pl.trackIds, trackId] };
        }
        return pl;
      })
    );
  }, [showToast]);

  const removeTrackFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          showToast(`Removed from "${pl.title}"`);
          return { ...pl, trackIds: pl.trackIds.filter((id) => id !== trackId) };
        }
        return pl;
      })
    );
  }, [showToast]);

  // Queue actions
  const addToQueue = useCallback((track: Track) => {
    setQueue((prev) => [...prev, track]);
    showToast(`Added "${track.title}" to queue`);
  }, [showToast]);

  const removeFromQueue = useCallback((index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearQueue = useCallback(() => {
    if (currentTrack) {
      setQueue([currentTrack]);
      setQueueIndex(0);
    } else {
      setQueue([]);
      setQueueIndex(-1);
    }
    showToast('Cleared queue');
  }, [currentTrack, showToast]);

  const clearError = useCallback(() => setPlaybackError(null), []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (audioRef.current) {
            seek(audioRef.current.currentTime - 5);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (audioRef.current) {
            seek(audioRef.current.currentTime + 5);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.05));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.05));
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyN':
          e.preventDefault();
          nextTrack();
          break;
        case 'KeyP':
          e.preventDefault();
          previousTrack();
          break;
        case 'KeyL':
          if (currentTrack) {
            e.preventDefault();
            toggleLike(currentTrack.id);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seek, setVolume, volume, toggleMute, nextTrack, previousTrack, currentTrack, toggleLike]);

  const value: MusicContextType = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    queue,
    queueIndex,
    isLoading,
    playbackError,
    playTrack,
    togglePlay,
    pause,
    resume,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    removeFromQueue,
    clearQueue,
    clearError,
    likedTrackIds,
    toggleLike,
    isLiked,
    playlists,
    createPlaylist,
    renamePlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    activeView,
    setActiveView,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    searchQuery,
    setSearchQuery,
    toastMessage,
    showToast,
    isUpgradeModalOpen,
    setUpgradeModalOpen,
    isQueueOpen,
    setQueueOpen,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};
