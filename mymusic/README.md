# Melody — Spotify-Style Music Streaming SaaS

**Melody** is a high-performance, dark-mode music streaming web application built with React, TypeScript, Vite, and Tailwind CSS. It is engineered with a modular SaaS-ready architecture, featuring real audio playback, offline-ready LocalStorage persistence, playlist creation/management, playback queue control, and responsive desktop/mobile layouts.

---

## Features

### 1. High-Fidelity Playback Engine
- **Audio Playback**: Streams verified, royalty-free audio tracks locally (`public/audio/`) with automatic remote fallback.
- **Playback Controls**: Play, Pause, Next, Previous (smart rewind if >3s in), Seek scrubbing, and Volume control with mute toggle.
- **Shuffle & Repeat**: Fisher-Yates randomization and cycle modes (`off` ➔ `all` ➔ `one`).
- **Auto-Advance**: Continuous playback advancing to the next queued track when a song finishes.
- **Equalizer Animations**: Real-time animated soundwave visualizers reflecting playback status across cards, list rows, and bottom player.
- **Keyboard Shortcuts**:
  - `Space`: Play / Pause
  - `ArrowLeft` / `ArrowRight`: Seek +/- 5 seconds
  - `ArrowUp` / `ArrowDown`: Volume +/- 5%
  - `M`: Mute / Unmute
  - `N`: Next track
  - `P`: Previous track
  - `L`: Like / Unlike currently playing track

### 2. Music Catalog & Discovery
- Curated catalog of synthwave, retrowave, lo-fi chill, ambient, and electronic tracks.
- Dynamic Search: Instant filtering across tracks, artists, albums, and genre categories.
- Featured album hero banner, quick-pick tiles, and category mood tiles.

### 3. Playlist & Library Management
- **Custom Playlists**: Create, rename, and delete playlists with custom descriptions.
- **Track Management**: Add/remove any track to any playlist via a 1-click context menu.
- **Liked Songs**: Dedicated favorites collection with quick-like buttons and real-time synchronization.
- **Session Persistence**: All playlists, liked tracks, volume, and preferences are automatically saved in `localStorage`.

### 4. Interactive Queue Drawer
- Slide-over queue manager displaying "Now Playing" and "Next Up".
- Reorder, remove individual items, or clear the upcoming queue.

### 5. SaaS Architecture & Monetization Ready
- Demo user profile with status badge (`Free Tier`).
- Pro & Studio plan preview modal highlighting Lossless 24-bit FLAC audio, offline mode, and creator royalties.
- Prepared for future Supabase Authentication, PostgreSQL database with Row Level Security (RLS), and Stripe billing webhooks.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS + Custom Dark Theme CSS
- **Icons**: Lucide React
- **Audio**: HTML5 Audio API with fallback handling

---

## Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173`.

4. **Run production build**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## Deployment to Cloudflare Pages (Free Tier)

This application is ready for direct zero-cost deployment on Cloudflare Pages:

### Method A: Git Integration (Recommended)
1. Push your repository to GitHub or GitLab:
   ```bash
   git add .
   git commit -m "Initial commit of Melody SaaS application"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
3. Click **Create Application** ➔ **Pages** ➔ **Connect to Git**.
4. Select your `Music-Saas` / `mymusic` repository.
5. In the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**. Cloudflare will build and distribute your app worldwide with free HTTPS, CDN, and unlimited bandwidth on the free tier.

### Method B: Cloudflare Direct Upload (Wrangler CLI)
If deploying directly without Git linking:
```bash
npm run build
npx wrangler pages deploy dist --project-name melody-music
```

---

## Future SaaS Roadmap

1. **Supabase Auth**: Connect Google / Email login to identify users.
2. **PostgreSQL Database**:
   - `users` table
   - `playlists` table with `user_id` and Row Level Security (`auth.uid() = user_id`)
   - `playlist_tracks` junction table
   - `user_likes` table
3. **Stripe Integration**: Add subscription checkout for Pro / Studio tiers.
4. **Cloudflare R2**: Host custom audio file uploads for verified artists.
