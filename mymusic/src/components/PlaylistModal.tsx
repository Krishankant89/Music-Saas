import React, { useState } from 'react';
import { X, Music } from 'lucide-react';

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  mode?: 'create' | 'edit';
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTitle = '',
  initialDescription = '',
  mode = 'create',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), description.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-zinc-900 border border-purple-500/20 rounded-2xl p-6 shadow-2xl shadow-purple-950/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800/60 hover:bg-zinc-700/60 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Music size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {mode === 'create' ? 'Create New Playlist' : 'Edit Playlist Details'}
            </h3>
            <p className="text-xs text-zinc-400">
              {mode === 'create' ? 'Give your collection a distinct vibe.' : 'Update your playlist information.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="playlist-title" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Playlist Name *
            </label>
            <input
              id="playlist-title"
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midnight Cyber Vibes"
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-zinc-500 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="playlist-desc" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              id="playlist-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give your playlist a brief mood or purpose..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-zinc-500 text-sm outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-purple-900/50 transition-all cursor-pointer"
            >
              {mode === 'create' ? 'Create Playlist' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
