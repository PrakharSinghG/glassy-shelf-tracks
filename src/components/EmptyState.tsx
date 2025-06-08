
import React from 'react';
import { motion } from 'framer-motion';
import { useMediaStore } from '@/store/useMediaStore';

interface EmptyStateProps {
  activeTab: 'todo' | 'progress' | 'finished';
  onSearchClick: () => void;
  categoryTitle: string;
  gradient: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ activeTab, onSearchClick, categoryTitle, gradient }) => {
  const { currentTheme } = useMediaStore();

  const getEmptyStateInfo = () => {
    switch (activeTab) {
      case 'todo':
        return {
          emoji: '📝',
          title: 'No to do items',
          description: 'Add something to your to-do list',
        };
      case 'progress':
        return {
          emoji: '⏳',
          title: 'No in progress items',
          description: 'Start working on something!',
        };
      case 'finished':
        return {
          emoji: '🎉',
          title: 'No finished items',
          description: 'Complete some items to see them here',
        };
    }
  };

  const { emoji, title, description } = getEmptyStateInfo();

  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className={`text-xl font-semibold mb-2 ${
          currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`text-sm ${
          currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {description}
        </p>
      </motion.div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSearchClick}
        className={`px-6 py-3 rounded-lg bg-gradient-to-r ${gradient} text-white font-medium hover:opacity-90 transition-all`}
      >
        Search & Add {categoryTitle.slice(0, -1)}
      </motion.button>
    </div>
  );
};

export default EmptyState;
