import { useContext } from 'react';
import { MusicContext } from './musicContextDefinition';
import type { MusicContextType } from '../types/music';

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
