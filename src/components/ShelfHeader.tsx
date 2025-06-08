
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useMediaStore } from '@/store/useMediaStore';
import GlassCard from './GlassCard';

interface ShelfHeaderProps {
  category: 'books' | 'shows' | 'podcasts' | undefined;
  itemCount: number;
  onSearchClick: () => void;
}

const ShelfHeader: React.FC<ShelfHeaderProps> = ({ category, itemCount, onSearchClick }) => {
  const navigate = useNavigate();
  const { currentTheme } = useMediaStore();

  const getCategoryInfo = () => {
    switch (category) {
      case 'books':
        return { title: 'Books', emoji: '📖', gradient: 'from-emerald-500 to-teal-500' };
      case 'shows':
        return { title: 'Shows & Movies', emoji: '🎬', gradient: 'from-red-500 to-pink-500' };
      case 'podcasts':
        return { title: 'Podcasts', emoji: '🎧', gradient: 'from-orange-500 to-yellow-500' };
      default:
        return { title: 'Media', emoji: '📱', gradient: 'from-purple-500 to-blue-500' };
    }
  };

  const { title, emoji, gradient } = getCategoryInfo();

  return (
    <header className="sticky top-0 z-50 p-4">
      <GlassCard className="p-4" hover={false}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className={`p-2 rounded-lg transition-colors ${
                currentTheme === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft size={20} />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl">{emoji}</span>
              <div>
                <h1 className={`text-xl font-bold ${
                  currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {title}
                </h1>
                <p className={`text-sm ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearchClick}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${gradient} text-white font-medium hover:opacity-90 transition-all flex items-center gap-2`}
            >
              <Search size={18} />
              Search & Add
            </motion.button>
          </div>
        </div>
      </GlassCard>
    </header>
  );
};

export default ShelfHeader;
