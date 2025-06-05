
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMediaStore } from '@/store/useMediaStore';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import AddMediaModal from '@/components/AddMediaModal';
import SearchModal from '@/components/SearchModal';

const Home = () => {
  const navigate = useNavigate();
  const { items, currentTheme } = useMediaStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const getCategoryCount = (category: 'books' | 'shows' | 'podcasts') => {
    return items.filter(item => item.category === category).length;
  };

  const totalItems = items.length;

  return (
    <Layout>
      <Header 
        onAddClick={() => setIsAddModalOpen(true)}
        onSearchClick={() => setIsSearchModalOpen(true)}
      />

      <main className="px-4 pb-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl font-bold mb-2 ${
            currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to your shelf
          </h2>
          <p className={`text-lg ${
            currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {totalItems === 0 
              ? 'Start building your media collection'
              : `You have ${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your collection`
            }
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CategoryCard
              category="books"
              count={getCategoryCount('books')}
              onClick={() => navigate('/shelf/books')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CategoryCard
              category="shows"
              count={getCategoryCount('shows')}
              onClick={() => navigate('/shelf/shows')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CategoryCard
              category="podcasts"
              count={getCategoryCount('podcasts')}
              onClick={() => navigate('/shelf/podcasts')}
            />
          </motion.div>
        </div>

        {/* Quick Actions */}
        {totalItems === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
            >
              ✨ Search & add your first item
            </motion.button>
          </motion.div>
        )}
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

export default Home;
