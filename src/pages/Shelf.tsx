
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useMediaStore } from '@/store/useMediaStore';
import Layout from '@/components/Layout';
import ShelfHeader from '@/components/ShelfHeader';
import StatusTabs from '@/components/StatusTabs';
import EmptyState from '@/components/EmptyState';
import MediaGrid from '@/components/MediaGrid';
import SearchModal from '@/components/SearchModal';

const Shelf = () => {
  const { category } = useParams<{ category: 'books' | 'shows' | 'podcasts' }>();
  const { items } = useMediaStore();
  const [activeTab, setActiveTab] = useState<'todo' | 'progress' | 'finished'>('todo');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const categoryItems = items.filter(item => item.category === category);
  const filteredItems = categoryItems.filter(item => item.status === activeTab);

  const getCategoryInfo = () => {
    switch (category) {
      case 'books':
        return { title: 'Books', gradient: 'from-emerald-500 to-teal-500' };
      case 'shows':
        return { title: 'Shows & Movies', gradient: 'from-red-500 to-pink-500' };
      case 'podcasts':
        return { title: 'Podcasts', gradient: 'from-orange-500 to-yellow-500' };
      default:
        return { title: 'Media', gradient: 'from-purple-500 to-blue-500' };
    }
  };

  const { title, gradient } = getCategoryInfo();

  const getTabCounts = () => {
    return {
      todo: categoryItems.filter(item => item.status === 'todo').length,
      progress: categoryItems.filter(item => item.status === 'progress').length,
      finished: categoryItems.filter(item => item.status === 'finished').length,
    };
  };

  const tabCounts = getTabCounts();

  return (
    <Layout>
      <ShelfHeader
        category={category}
        itemCount={categoryItems.length}
        onSearchClick={() => setIsSearchModalOpen(true)}
      />

      <main className="px-4 pb-8">
        <StatusTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
          gradient={gradient}
        />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredItems.length === 0 ? (
            <EmptyState
              activeTab={activeTab}
              onSearchClick={() => setIsSearchModalOpen(true)}
              categoryTitle={title}
              gradient={gradient}
            />
          ) : (
            <MediaGrid items={filteredItems} />
          )}
        </motion.div>
      </main>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </Layout>
  );
};

export default Shelf;
