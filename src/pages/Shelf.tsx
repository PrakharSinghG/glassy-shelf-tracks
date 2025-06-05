import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useMediaStore, MediaItem } from '@/store/useMediaStore';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import MediaCard from '@/components/MediaCard';
import AddMediaModal from '@/components/AddMediaModal';
import SearchModal from '@/components/SearchModal';

const Shelf = () => {
  const { category } = useParams<{ category: 'books' | 'shows' | 'podcasts' }>();
  const navigate = useNavigate();
  const { items, currentTheme } = useMediaStore();
  const [activeTab, setActiveTab] = useState<'todo' | 'progress' | 'finished'>('todo');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const categoryItems = items.filter(item => item.category === category);
  const filteredItems = categoryItems.filter(item => item.status === activeTab);

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

  const getTabCounts = () => {
    return {
      todo: categoryItems.filter(item => item.status === 'todo').length,
      progress: categoryItems.filter(item => item.status === 'progress').length,
      finished: categoryItems.filter(item => item.status === 'finished').length,
    };
  };

  const tabCounts = getTabCounts();

  const tabs = [
    { id: 'todo', label: 'To Do', count: tabCounts.todo },
    { id: 'progress', label: 'In Progress', count: tabCounts.progress },
    { id: 'finished', label: 'Finished', count: tabCounts.finished },
  ];

  return (
    <Layout>
      {/* Header */}
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
                    {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchModalOpen(true)}
                className={`p-2 rounded-lg transition-colors ${
                  currentTheme === 'dark'
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Search size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddModalOpen(true)}
                className={`px-4 py-2 rounded-lg bg-gradient-to-r ${gradient} text-white font-medium hover:opacity-90 transition-all`}
              >
                Add New
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </header>

      <main className="px-4 pb-8">
        {/* Tabs */}
        <div className="mb-6">
          <GlassCard className="p-1" hover={false}>
            <div className="flex rounded-lg overflow-hidden">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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

        {/* Media Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="text-6xl mb-4">
                  {activeTab === 'todo' ? '📝' : activeTab === 'progress' ? '⏳' : '🎉'}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  No {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} items
                </h3>
                <p className={`text-sm ${
                  currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {activeTab === 'todo' 
                    ? 'Add something to your to-do list'
                    : activeTab === 'progress'
                      ? 'Start working on something!'
                      : 'Complete some items to see them here'
                  }
                </p>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchModalOpen(true)}
                className={`px-6 py-3 rounded-lg bg-gradient-to-r ${gradient} text-white font-medium hover:opacity-90 transition-all`}
              >
                Search & Add {title.slice(0, -1)}
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <MediaCard item={item} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      <AddMediaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </Layout>
  );
};

export default Shelf;
