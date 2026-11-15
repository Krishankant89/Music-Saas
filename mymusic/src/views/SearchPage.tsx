import React, { useState, useMemo } from 'react';
import { useMusic } from '../context/useMusic';
import { TRACK_CATALOG, GENRE_CATEGORIES } from '../data/catalog';
import { TrackRow } from '../components/TrackRow';
import type { Track } from '../types/music';
import { Search as SearchIcon, Play, Sparkles } from 'lucide-react';

type SearchFilter = 'all' | 'tracks' | 'artists' | 'playlists';

export const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery, playTrack, playlists, setActiveView } = useMusic();
  const [filter, setFilter] = useState<SearchFilter>('all');

  const query = searchQuery.trim().toLowerCase();

  // Filtered tracks
  const matchingTracks = useMemo(() => {
    if (!query) return [];
    return TRACK_CATALOG.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.artist.toLowerCase().includes(query) ||
        t.album.toLowerCase().includes(query) ||
        t.genre.toLowerCase().includes(query)
    );
  }, [query]);

  // Filtered playlists
  const matchingPlaylists = useMemo(() => {
    if (!query) return [];
    return playlists.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [playlists, query]);

  const topResult: Track | null = matchingTracks.length > 0 ? matchingTracks[0] : null;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Search Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Search
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Explore our curated catalog of royalty-free lossless audio tracks.
          </p>
        </div>

        {/* Filter Chips */}
        {query && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['all', 'tracks', 'artists', 'playlists'] as SearchFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      {!query ? (
        /* Empty Query State: Browse All Categories */
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-200">
            <Sparkles size={16} className="text-purple-400" />
            <span>Browse All Genres & Moods</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {GENRE_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setSearchQuery(cat.name)}
                className="relative overflow-hidden h-36 rounded-2xl p-4 bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-950/40 border border-zinc-800/80 hover:border-purple-500/50 shadow-lg hover:shadow-purple-950/30 transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={cat.cover}
                  alt={cat.name}
                  className="absolute right-0 bottom-0 w-24 h-24 object-cover rounded-xl shadow-2xl rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 opacity-80"
                />
                <h3 className="relative z-10 font-black text-lg text-white group-hover:text-purple-300">
                  {cat.name}
                </h3>
                <span className="relative z-10 text-[11px] font-medium text-zinc-400 mt-1 inline-block">
                  Curated soundscapes
                </span>
              </div>
            ))}
          </div>

          {/* Quick Popular Searches */}
          <div className="pt-4">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Trending Search Terms
            </div>
            <div className="flex flex-wrap gap-2">
              {['Synthwave', 'Midnight Resonance', 'Celestial Echo', 'Lo-Fi Chill', 'Tokyo Café', 'Deep Focus', 'Cyber Odyssey'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : matchingTracks.length === 0 && matchingPlaylists.length === 0 ? (
        /* No Results State */
        <div className="text-center py-16 px-4 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 mx-auto mb-3">
            <SearchIcon size={22} />
          </div>
          <h3 className="text-base font-bold text-white">No results found for &ldquo;{searchQuery}&rdquo;</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Please make sure words are spelled correctly or try searching by mood, artist, or genre.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-8">
          {/* Top Result + Top 4 Songs */}
          {(filter === 'all' || filter === 'tracks' || filter === 'artists') && topResult && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Top Result Card */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Top Result
                </h3>
                <div
                  onClick={() => playTrack(topResult, matchingTracks)}
                  className="group relative p-5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 hover:border-purple-500/40 transition-all cursor-pointer shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={topResult.coverArt}
                      alt={topResult.title}
                      className="w-24 h-24 rounded-xl object-cover shadow-lg mb-4"
                    />
                    <h4 className="text-xl font-black text-white group-hover:text-purple-300">
                      {topResult.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Song • <span className="text-white font-medium">{topResult.artist}</span> • {topResult.album}
                    </p>
                    <span className="inline-block mt-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {topResult.genre}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playTrack(topResult, matchingTracks);
                    }}
                    className="self-end mt-4 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-xl shadow-purple-900/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    aria-label={`Play ${topResult.title}`}
                  >
                    <Play size={20} className="fill-white ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Matching Songs List */}
              <div className="lg:col-span-3">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Songs ({matchingTracks.length})
                </h3>
                <div className="space-y-1">
                  {matchingTracks.slice(0, 5).map((track, i) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      index={i}
                      trackList={matchingTracks}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* All Matching Tracks Table */}
          {(filter === 'tracks' || (filter === 'all' && matchingTracks.length > 5)) && (
            <div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                All Tracks Matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <div className="space-y-1">
                {matchingTracks.map((track, i) => (
                  <TrackRow
                    key={track.id}
                    track={track}
                    index={i}
                    trackList={matchingTracks}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Matching Playlists */}
          {(filter === 'all' || filter === 'playlists') && matchingPlaylists.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Playlists ({matchingPlaylists.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {matchingPlaylists.map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => setActiveView({ type: 'playlist', playlistId: pl.id })}
                    className="group p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/70 border border-zinc-800/50 hover:border-purple-500/40 transition-all cursor-pointer flex flex-col shadow-md"
                  >
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-950 mb-3 shadow">
                      <img
                        src={pl.coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'}
                        alt={pl.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-bold text-sm text-white group-hover:text-purple-300 truncate">
                      {pl.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                      {pl.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
