import React from 'react';
import { useMusic } from '../context/useMusic';
import { Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useMusic();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-900/95 border border-purple-500/30 text-white text-sm font-medium rounded-xl shadow-2xl shadow-purple-950/40 backdrop-blur-md animate-fade-in">
      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
      <Info size={16} className="text-purple-400 flex-shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};
