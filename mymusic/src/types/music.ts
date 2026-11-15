export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverArt: string;
  audioUrl: string;
  fallbackUrl?: string;
  genre: string;
  releaseYear?: number;
  explicit?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverArt?: string;
  trackIds: string[];
  isUserCreated: boolean;
  createdAt: string;
}

export type RepeatMode = 'off' | 'all' | 'one';

export type ActiveView = 
  | { type: 'home' }
  | { type: 'search' }
  | { type: 'library' }
  | { type: 'liked' }
  | { type: 'playlist'; playlistId: string };

export interface MusicContextType {
  // Current playback state
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  queue: Track[];
  queueIndex: number;
  isLoading: boolean;
  playbackError: string | null;

  // Playback actions
  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seek: (seconds: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  clearError: () => void;

  // Liked songs
  likedTrackIds: string[];
  toggleLike: (trackId: string) => void;
  isLiked: (trackId: string) => boolean;

  // Playlists
  playlists: Playlist[];
  createPlaylist: (title: string, description?: string) => string;
  renamePlaylist: (id: string, newTitle: string, newDescription?: string) => void;
  deletePlaylist: (id: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;

  // Navigation
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (message: string) => void;

  // SaaS Upgrade Modal
  isUpgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;

  // Queue drawer
  isQueueOpen: boolean;
  setQueueOpen: (open: boolean) => void;
}
