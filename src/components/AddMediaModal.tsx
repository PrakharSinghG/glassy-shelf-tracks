
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useMediaStore } from '@/store/useMediaStore';
import GlassCard from './GlassCard';

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({ isOpen, onClose }) => {
  const { currentTheme, addItem } = useMediaStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'books' | 'shows' | 'podcasts'>('books');
  const [status, setStatus] = useState<'todo' | 'progress' | 'finished'>('todo');
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addItem({
      title: title.trim(),
      category,
      status,
      notes: notes.trim() || undefined,
      mood: mood.trim() || undefined,
      progress: status === 'progress' ? progress : undefined,
    });

    // Reset form
    setTitle('');
    setNotes('');
    setMood('');
    setProgress(0);
    onClose();
  };

  const moods = ['😊', '😍', '🤔', '😴', '🤯', '😢', '😂', '🔥'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <GlassCard hover={false} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${
                  currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Add New Media
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    currentTheme === 'dark'
                      ? 'hover:bg-white/10 text-white'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    className={`w-full p-3 rounded-lg border backdrop-blur-sm transition-all ${
                      currentTheme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className={`w-full p-3 rounded-lg border backdrop-blur-sm transition-all ${
                        currentTheme === 'dark'
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-white/50 border-gray-200 text-gray-900'
                      }`}
                    >
                      <option value="books">📖 Books</option>
                      <option value="shows">🎬 Shows</option>
                      <option value="podcasts">🎧 Podcasts</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className={`w-full p-3 rounded-lg border backdrop-blur-sm transition-all ${
                        currentTheme === 'dark'
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-white/50 border-gray-200 text-gray-900'
                      }`}
                    >
                      <option value="todo">To Do</option>
                      <option value="progress">In Progress</option>
                      <option value="finished">Finished</option>
                    </select>
                  </div>
                </div>

                {status === 'progress' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Progress: {progress}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Mood
                  </label>
                  <div className="flex gap-2 mb-2">
                    {moods.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setMood(emoji)}
                        className={`p-2 text-lg rounded-lg transition-all ${
                          mood === emoji
                            ? 'bg-purple-500/50 scale-110'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your thoughts..."
                    rows={3}
                    className={`w-full p-3 rounded-lg border backdrop-blur-sm transition-all resize-none ${
                      currentTheme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  Add to Shelf
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddMediaModal;
