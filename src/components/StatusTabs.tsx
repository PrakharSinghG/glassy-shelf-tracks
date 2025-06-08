
import React from 'react';
import { motion } from 'framer-motion';
import { useMediaStore } from '@/store/useMediaStore';
import GlassCard from './GlassCard';

interface StatusTabsProps {
  activeTab: 'todo' | 'progress' | 'finished';
  onTabChange: (tab: 'todo' | 'progress' | 'finished') => void;
  tabCounts: {
    todo: number;
    progress: number;
    finished: number;
  };
  gradient: string;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ activeTab, onTabChange, tabCounts, gradient }) => {
  const { currentTheme } = useMediaStore();

  const tabs = [
    { id: 'todo', label: 'To Do', count: tabCounts.todo },
    { id: 'progress', label: 'In Progress', count: tabCounts.progress },
    { id: 'finished', label: 'Finished', count: tabCounts.finished },
  ];

  return (
    <div className="mb-6">
      <GlassCard className="p-1" hover={false}>
        <div className="flex rounded-lg overflow-hidden">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${gradient} text-white`
                  : currentTheme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-200/50'
                }`}>
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default StatusTabs;
