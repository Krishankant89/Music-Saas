import type { Track, Playlist } from '../types/music';

export const TRACK_CATALOG: Track[] = [
  {
    id: 'track-1',
    title: 'Midnight Resonance',
    artist: 'Celestial Echo',
    album: 'Neon Horizon',
    duration: 372, // 6:12
    coverArt: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/midnight-resonance.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Synthwave',
    releaseYear: 2024,
  },
  {
    id: 'track-2',
    title: 'Neon Drift',
    artist: 'HyperDrive',
    album: 'Retrograde Dreams',
    duration: 423, // 7:03
    coverArt: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/neon-drift.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Retrowave',
    releaseYear: 2024,
  },
  {
    id: 'track-3',
    title: 'Cyber Odyssey',
    artist: 'Astraea Project',
    album: 'Outer Rim Frequencies',
    duration: 345, // 5:45
    coverArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/cyber-odyssey.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Cyberpunk',
    releaseYear: 2024,
  },
  {
    id: 'track-4',
    title: 'Velvet Nightfall',
    artist: 'Solitude Lab',
    album: 'Dusk Whispers',
    duration: 326, // 5:26
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/velvet-nightfall.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Lo-Fi Chill',
    releaseYear: 2023,
  },
  {
    id: 'track-5',
    title: 'Echoes of Eternity',
    artist: 'Luna Pulse',
    album: 'Silent Orbit',
    duration: 302, // 5:02
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/midnight-resonance.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Ambient',
    releaseYear: 2024,
  },
  {
    id: 'track-6',
    title: 'Solar Horizon',
    artist: 'Starlight Ensemble',
    album: 'Supernova Sanctuary',
    duration: 360, // 6:00
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/neon-drift.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    genre: 'Space Synth',
    releaseYear: 2024,
  },
  {
    id: 'track-7',
    title: 'Urban Raindrops',
    artist: 'Tokyo Mirage',
    album: 'Midnight Tokyo Café',
    duration: 284, // 4:44
    coverArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/velvet-nightfall.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Lo-Fi Beats',
    releaseYear: 2023,
  },
  {
    id: 'track-8',
    title: 'Quantum Pulse',
    artist: 'NeuroBeat',
    album: 'Synaptic Fire',
    duration: 338, // 5:38
    coverArt: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/cyber-odyssey.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Electronic',
    releaseYear: 2024,
  },
  {
    id: 'track-9',
    title: 'Starlight Reverie',
    artist: 'Vapor Waveform',
    album: 'Purple Cloud Nine',
    duration: 310, // 5:10
    coverArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/midnight-resonance.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Chillwave',
    releaseYear: 2023,
  },
  {
    id: 'track-10',
    title: 'Lucid Dreams',
    artist: 'Aura Soundscapes',
    album: 'Zenith Awakening',
    duration: 350, // 5:50
    coverArt: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    audioUrl: '/audio/neon-drift.mp3',
    fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Deep Focus',
    releaseYear: 2024,
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-featured',
    title: 'Melody Spotlight 2025',
    description: 'The definitive blend of synthwave, ambient chill, and electronic pulse curated by the Melody sound team.',
    coverArt: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    trackIds: ['track-1', 'track-2', 'track-3', 'track-4', 'track-6'],
    isUserCreated: false,
    createdAt: '2025-01-01',
  },
  {
    id: 'playlist-synthwave',
    title: 'Synthwave & Retrowave Sunset',
    description: 'Neon skylines, analog synthesizers, and vintage drum machines driving along the Pacific coast.',
    coverArt: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    trackIds: ['track-1', 'track-2', 'track-6', 'track-8'],
    isUserCreated: false,
    createdAt: '2025-01-05',
  },
  {
    id: 'playlist-lofi',
    title: 'Lo-Fi Study & Coding Sanctuary',
    description: 'Mellow beats, soothing tape warmth, and relaxing frequencies to get into deep work state.',
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    trackIds: ['track-4', 'track-5', 'track-7', 'track-10'],
    isUserCreated: false,
    createdAt: '2025-01-10',
  },
  {
    id: 'playlist-cyberpunk',
    title: 'Cyberpunk & Night Drives',
    description: 'Heavy basslines, futuristic atmospheres, and neon glow for late night journeys.',
    coverArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    trackIds: ['track-2', 'track-3', 'track-8', 'track-9'],
    isUserCreated: false,
    createdAt: '2025-01-12',
  }
];

export const GENRE_CATEGORIES = [
  { name: 'Synthwave', color: 'from-purple-900 to-indigo-950', icon: 'Sparkles', cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80' },
  { name: 'Lo-Fi Chill', color: 'from-amber-950 to-orange-950', icon: 'Headphones', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80' },
  { name: 'Cyberpunk', color: 'from-cyan-950 to-blue-950', icon: 'Flame', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80' },
  { name: 'Ambient', color: 'from-emerald-950 to-teal-950', icon: 'Radio', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80' },
  { name: 'Electronic', color: 'from-pink-950 to-rose-950', icon: 'Music', cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop&q=80' },
  { name: 'Deep Focus', color: 'from-violet-950 to-fuchsia-950', icon: 'Clock', cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&auto=format&fit=crop&q=80' },
];
