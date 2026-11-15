import { createContext } from 'react';
import type { MusicContextType } from '../types/music';

export const MusicContext = createContext<MusicContextType | undefined>(undefined);
