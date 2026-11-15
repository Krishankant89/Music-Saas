import React, { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import { useMusic } from './context/useMusic';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MusicPlayer } from './components/MusicPlayer';
import { QueueDrawer } from './components/QueueDrawer';
import { UpgradeModal } from './components/UpgradeModal';
import { Toast } from './components/Toast';
import { HomePage } from './views/HomePage';
import { SearchPage } from './views/SearchPage';
import { LibraryPage } from './views/LibraryPage';
import { PlaylistPage } from './views/PlaylistPage';
import { LikedSongsPage } from './views/LikedSongsPage';

const AppContent: React.FC = () => {
  const { activeView } = useMusic();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden select-none">
      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-fade-in"
        />
      )}

      {/* Left Sidebar */}
      <Sidebar
        isOpenOnMobile={isMobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-black">
        {/* Topbar */}
        <Topbar onToggleMobileMenu={() => setMobileMenuOpen(!isMobileMenuOpen)} />

        {/* Scrollable View Content */}
        <main
          className="flex-1 overflow-y-auto px-4 sm:px-8 py-6"
          style={{ paddingBottom: '120px' }} // Space above persistent bottom player
        >
          {activeView.type === 'home' && <HomePage />}
          {activeView.type === 'search' && <SearchPage />}
          {activeView.type === 'library' && <LibraryPage />}
          {activeView.type === 'liked' && <LikedSongsPage />}
          {activeView.type === 'playlist' && (
            <PlaylistPage playlistId={activeView.playlistId} />
          )}
        </main>
      </div>

      {/* Persistent Bottom Player */}
      <MusicPlayer />

      {/* Slide-over Queue Drawer */}
      <QueueDrawer />

      {/* Modals & Overlays */}
      <UpgradeModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}
