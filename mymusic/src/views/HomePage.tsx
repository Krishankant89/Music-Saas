import React from 'react';
import { useMusic } from '../context/useMusic';
import { TRACK_CATALOG, GENRE_CATEGORIES } from '../data/catalog';
import { TrackCard } from '../components/TrackCard';
import { Play, Sparkles, Heart, Flame, Disc } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { playTrack, playlists, setActiveView, isLiked, toggleLike } = useMusic();

  const featuredTrack = TRACK_CATALOG[0]; // Midnight Resonance
  const quickPicks = TRACK_CATALOG.slice(0, 6);
  const recommendedTracks = TRACK_CATALOG.slice(2, 8);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Banner: Featured Album / Spotlight */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-zinc-900 to-indigo-950 p-6 sm:p-8 border border-purple-500/20 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative group w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden shadow-2xl shadow-purple-950/80 flex-shrink-0 border border-purple-500/30">
              <img
                src={featuredTrack.coverArt}
                alt={featuredTrack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-purple-500/30">
                <Sparkles size={13} /> Featured Spotlight
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {featuredTrack.title}
              </h1>
              <p className="text-zinc-300 text-sm mt-1">
                By <span className="text-purple-300 font-semibold">{featuredTrack.artist}</span> •{' '}
                {featuredTrack.album}
              </p>
              <p className="text-xs text-zinc-400 mt-2 max-w-lg hidden sm:block">
                Atmospheric analog synths blend with driving basslines in this standout retrowave anthem.
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                <button
                  onClick={() => playTrack(featuredTrack, TRACK_CATALOG)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play size={16} className="fill-white" />
                  <span>Play Featured</span>
                </button>
                <button
                  onClick={() => toggleLike(featuredTrack.id)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    isLiked(featuredTrack.id)
                      ? 'bg-purple-900/40 border-purple-500 text-purple-400'
                      : 'border-zinc-700/60 text-zinc-300 hover:text-white hover:border-zinc-500'
                  }`}
                  aria-label="Like featured track"
                >
                  <Heart size={18} className={isLiked(featuredTrack.id) ? 'fill-purple-400' : ''} />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end text-right border-l border-purple-800/20 pl-6">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
              Audio Format
            </span>
            <span className="text-lg font-bold text-white mt-1">Hi-Res 320kbps</span>
            <span className="text-xs text-zinc-400 mt-0.5">Pure Digital Fidelity</span>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              100% Royalty Free Audio
            </div>
          </div>
        </div>
      </section>

      {/* Quick Picks 6-Tile Grid */}
      <section>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Quick Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickPicks.map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track, TRACK_CATALOG)}
              className="group flex items-center gap-3 p-2 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-purple-500/40 transition-all cursor-pointer shadow-md"
            >
              <img
                src={track.coverArt}
                alt={track.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-zinc-200 group-hover:text-purple-300 truncate">
                  {track.title}
                </div>
                <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
              </div>
              <button
                type="button"
                aria-label={`Play ${track.title}`}
                className="w-9 h-9 mr-2 rounded-full bg-purple-600 group-hover:bg-purple-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-md flex-shrink-0"
              >
                <Play size={14} className="fill-white ml-0.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Curated Playlists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Curated Playlists</h2>
            <p className="text-xs text-zinc-400">Hand-selected audio experiences for every mood.</p>
          </div>
          <button
            onClick={() => setActiveView({ type: 'library' })}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Show All &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {playlists.slice(0, 4).map((pl) => (
            <div
              key={pl.id}
              onClick={() => setActiveView({ type: 'playlist', playlistId: pl.id })}
              className="group p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/70 border border-zinc-800/50 hover:border-purple-500/40 transition-all cursor-pointer flex flex-col shadow-md"
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-950 mb-3 shadow">
                <img
                  src={pl.coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'}
                  alt={pl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-purple-300 truncate">
                {pl.title}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-snug">
                {pl.description}
              </p>
              <span className="text-[11px] font-mono text-purple-400 mt-2">
                {pl.trackIds.length} track{pl.trackIds.length !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended For You Tracks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Flame size={20} className="text-purple-400" />
              <span>Recommended For You</span>
            </h2>
            <p className="text-xs text-zinc-400">Fresh algorithmic selections tailored to your listening taste.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {recommendedTracks.map((track) => (
            <TrackCard key={track.id} track={track} trackList={TRACK_CATALOG} />
          ))}
        </div>
      </section>

      {/* Explore by Mood & Genre */}
      <section>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Browse by Mood & Genre</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {GENRE_CATEGORIES.map((genre) => (
            <div
              key={genre.name}
              onClick={() => setActiveView({ type: 'search' })}
              className="relative overflow-hidden h-24 rounded-xl p-3 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/60 hover:border-purple-500/50 transition-all cursor-pointer group shadow"
            >
              <img
                src={genre.cover}
                alt={genre.name}
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300"
              />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <span className="text-xs font-bold text-white group-hover:text-purple-300">
                  {genre.name}
                </span>
                <Disc size={16} className="text-purple-400/80 self-end" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
