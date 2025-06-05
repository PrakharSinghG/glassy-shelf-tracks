
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { useMediaStore } from '@/store/useMediaStore';
import GlassCard from './GlassCard';

interface HeaderProps {
  onAddClick?: () => void;
  onSearchClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick, onSearchClick }) => {
  const { currentTheme } = useMediaStore();

  return (
    <header className="sticky top-0 z-50 p-4">
      <GlassCard className="p-4" hover={false}>
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`text-2xl font-bold ${
              currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              MediaShelf
            </h1>
            <p className={`text-sm ${
              currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Track your books, shows & podcasts
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearchClick}
              className={`p-3 rounded-lg transition-colors ${
                currentTheme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-white/40 hover:bg-white/60 text-gray-700'
              }`}
            >
              <Search size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddClick}
              className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              <Plus size={20} />
            </motion.button>
          </div>
        </div>
      </GlassCard>
    </header>
  );
};

export default Header;
