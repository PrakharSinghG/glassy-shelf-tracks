
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, ExternalLink, Globe } from 'lucide-react';
import { useMediaStore } from '@/store/useMediaStore';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';

const MediaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, currentTheme } = useMediaStore();
  
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className={`text-2xl font-bold mb-4 ${
              currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Item not found
            </h1>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const getExternalLinks = () => {
    const links = [];
    
    if (item.category === 'books') {
      links.push(
        { name: 'Google Books', url: `https://books.google.com/books?q=${encodeURIComponent(item.title)}`, icon: '📚' },
        { name: 'Amazon', url: `https://amazon.com/s?k=${encodeURIComponent(item.title)}`, icon: '🛒' },
        { name: 'Goodreads', url: `https://www.goodreads.com/search?q=${encodeURIComponent(item.title)}`, icon: '📖' }
      );
    } else if (item.category === 'shows') {
      links.push(
        { name: 'IMDB', url: `https://www.imdb.com/find?q=${encodeURIComponent(item.title)}`, icon: '🎬' },
        { name: 'Netflix', url: `https://www.netflix.com/search?q=${encodeURIComponent(item.title)}`, icon: '🎥' },
        { name: 'Prime Video', url: `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(item.title)}`, icon: '📺' }
      );
    } else if (item.category === 'podcasts') {
      links.push(
        { name: 'Apple Podcasts', url: `https://podcasts.apple.com/search?term=${encodeURIComponent(item.title)}`, icon: '🎧' },
        { name: 'Spotify', url: `https://open.spotify.com/search/${encodeURIComponent(item.title)}`, icon: '🎵' },
        { name: 'Google Podcasts', url: `https://podcasts.google.com/search/${encodeURIComponent(item.title)}`, icon: '🎙️' }
      );
    }
    
    return links;
  };

  const getCategoryInfo = () => {
    switch (item.category) {
      case 'books':
        return { title: 'Book', emoji: '📖', gradient: 'from-emerald-500 to-teal-500' };
      case 'shows':
        return { title: 'Show/Movie', emoji: '🎬', gradient: 'from-red-500 to-pink-500' };
      case 'podcasts':
        return { title: 'Podcast', emoji: '🎧', gradient: 'from-orange-500 to-yellow-500' };
      default:
        return { title: 'Media', emoji: '📱', gradient: 'from-purple-500 to-blue-500' };
    }
  };

  const { emoji, gradient } = getCategoryInfo();
  const externalLinks = getExternalLinks();

  return (
    <Layout>
      {/* Header */}
      <header className="sticky top-0 z-50 p-4">
        <GlassCard className="p-4" hover={false}>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
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
              <h1 className={`text-xl font-bold ${
                currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Details
              </h1>
            </div>
          </div>
        </GlassCard>
      </header>

      <main className="px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cover Image */}
              <div className="space-y-6">
                <div className="relative h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl overflow-hidden border border-white/10">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl opacity-60">
                      {emoji}
                    </div>
                  )}
                </div>

                {/* External Links */}
                <div className="space-y-3">
                  <h3 className={`font-semibold text-lg ${
                    currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Watch/Read/Listen
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {externalLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          currentTheme === 'dark'
                            ? 'bg-white/5 hover:bg-white/10 text-white'
                            : 'bg-white/40 hover:bg-white/60 text-gray-900'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-medium">{link.name}</span>
                        <ExternalLink size={16} className="ml-auto opacity-60" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${
                    currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h1>
                  
                  {/* Status Badge */}
                  <div className={`inline-flex px-4 py-2 rounded-xl bg-gradient-to-r ${
                    item.status === 'todo' ? 'from-slate-500 to-slate-600' :
                    item.status === 'progress' ? 'from-blue-500 to-indigo-600' :
                    'from-emerald-500 to-green-600'
                  } text-white text-sm font-semibold mb-4`}>
                    {item.status === 'todo' ? 'To Do' : 
                     item.status === 'progress' ? 'In Progress' : 'Finished'}
                  </div>
                </div>

                {/* Progress */}
                {item.progress !== undefined && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${
                        currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Progress
                      </span>
                      <span className={`text-2xl font-bold ${
                        currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200/30 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-3 rounded-full bg-gradient-to-r ${
                          item.status === 'todo' ? 'from-slate-500 to-slate-600' :
                          item.status === 'progress' ? 'from-blue-500 to-indigo-600' :
                          'from-emerald-500 to-green-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {/* Mood */}
                {item.mood && (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.mood}</span>
                    <div>
                      <span className={`text-sm font-medium ${
                        currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Current mood
                      </span>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {item.notes && (
                  <div className="space-y-2">
                    <h3 className={`font-semibold text-lg ${
                      currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Notes
                    </h3>
                    <p className={`text-base leading-relaxed ${
                      currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.notes}
                    </p>
                  </div>
                )}

                {/* Date Added */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <Calendar size={16} className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                  <span className={`text-sm ${
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Added {new Date(item.dateAdded).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </Layout>
  );
};

export default MediaDetail;
