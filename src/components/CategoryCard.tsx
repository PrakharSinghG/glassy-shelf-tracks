
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Film, Headphones } from 'lucide-react';
import { useMediaStore } from '@/store/useMediaStore';
import GlassCard from './GlassCard';

interface CategoryCardProps {
  category: 'books' | 'shows' | 'podcasts';
  count: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, count, onClick }) => {
  const { currentTheme } = useMediaStore();

  const getCategoryInfo = () => {
    switch (category) {
      case 'books':
        return {
          icon: Book,
          title: 'Books',
          gradient: 'from-emerald-500 to-teal-500',
          emoji: '📖',
        };
      case 'shows':
        return {
          icon: Film,
          title: 'Shows & Movies',
          gradient: 'from-red-500 to-pink-500',
          emoji: '🎬',
        };
      case 'podcasts':
        return {
          icon: Headphones,
          title: 'Podcasts',
          gradient: 'from-orange-500 to-yellow-500',
          emoji: '🎧',
        };
    }
  };

  const { icon: Icon, title, gradient, emoji } = getCategoryInfo();

  return (
    <GlassCard onClick={onClick} className="p-6 h-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className={`p-3 rounded-lg bg-gradient-to-r ${gradient}`}
            whileHover={{ rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className="text-white" size={24} />
          </motion.div>
          <span className="text-2xl">{emoji}</span>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-1 ${
            currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm ${
            currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {count} {count === 1 ? 'item' : 'items'}
          </p>
        </div>

        <motion.div
          className={`h-1 rounded-full bg-gradient-to-r ${gradient} opacity-60`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </motion.div>
    </GlassCard>
  );
};

export default CategoryCard;
