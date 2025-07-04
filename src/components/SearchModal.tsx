
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus, Book, Film, Podcast } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassCard from './GlassCard';
import { useMediaStore } from '@/store/useMediaStore';
import { searchBooks, GoogleBookResult } from '@/services/googleBooksApi';
import { searchMoviesAndShows, TMDBResult, getImageUrl } from '@/services/tmdbApi';
import { searchPodcasts, PodcastResult } from '@/services/podcastApi';
import { toast } from 'sonner';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'books' | 'shows' | 'podcasts';
  author?: string;
  year?: string;
  originalData: GoogleBookResult | TMDBResult | PodcastResult;
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'books' | 'shows' | 'podcasts'>('books');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<{ [key: string]: 'todo' | 'progress' | 'finished' }>({});
  const { addItem, currentTheme } = useMediaStore();

  const tabs = [
    { id: 'books', label: 'Books', icon: Book },
    { id: 'shows', label: 'Movies & Shows', icon: Film },
    { id: 'podcasts', label: 'Podcasts', icon: Podcast },
  ];

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query, activeTab]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      let searchResults: SearchResult[] = [];

      switch (activeTab) {
        case 'books':
          const books = await searchBooks(query);
          searchResults = books.map((book) => ({
            id: book.id,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description || 'No description available',
            image: book.volumeInfo.imageLinks?.thumbnail || '/placeholder.svg',
            type: 'books' as const,
            author: book.volumeInfo.authors?.join(', '),
            year: book.volumeInfo.publishedDate?.split('-')[0],
            originalData: book,
          }));
          break;

        case 'shows':
          const shows = await searchMoviesAndShows(query);
          searchResults = shows.map((show) => ({
            id: show.id.toString(),
            title: show.title || show.name || 'Unknown Title',
            description: show.overview || 'No description available',
            image: getImageUrl(show.poster_path),
            type: 'shows' as const,
            year: (show.release_date || show.first_air_date)?.split('-')[0],
            originalData: show,
          }));
          break;

        case 'podcasts':
          const podcasts = await searchPodcasts(query);
          searchResults = podcasts.map((podcast) => ({
            id: podcast.trackId.toString(),
            title: podcast.trackName,
            description: podcast.description || 'No description available',
            image: podcast.artworkUrl100,
            type: 'podcasts' as const,
            author: podcast.artistName,
            year: new Date(podcast.releaseDate).getFullYear().toString(),
            originalData: podcast,
          }));
          break;
      }

      setResults(searchResults);
      // Initialize default status for each result
      const defaultStatuses: { [key: string]: 'todo' | 'progress' | 'finished' } = {};
      searchResults.forEach(result => {
        defaultStatuses[result.id] = 'todo';
      });
      setSelectedStatuses(defaultStatuses);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (result: SearchResult) => {
    const status = selectedStatuses[result.id] || 'todo';
    addItem({
      title: result.title,
      category: result.type,
      status: status,
      coverImage: result.image,
      notes: `Added from search: ${result.description.slice(0, 100)}...`,
    });
    
    toast.success(`Added "${result.title}" to your ${result.type}`);
    onClose();
  };

  const handleStatusChange = (resultId: string, status: 'todo' | 'progress' | 'finished') => {
    setSelectedStatuses(prev => ({
      ...prev,
      [resultId]: status
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden border-0 bg-transparent shadow-none [&>button]:hidden">
        <GlassCard className="h-full" hover={false}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${
                currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Search & Add Media
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={`rounded-full hover:bg-white/10 ${
                  currentTheme === 'dark' ? 'text-white hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <X size={20} />
              </Button>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <Search className={`absolute left-3 top-3 h-4 w-4 ${
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <Input
                placeholder="Search for books, movies, shows, or podcasts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`pl-10 h-12 text-lg border-0 bg-white/10 backdrop-blur-sm ${
                  currentTheme === 'dark' 
                    ? 'text-white placeholder:text-gray-400' 
                    : 'text-gray-900 placeholder:text-gray-500'
                }`}
              />
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <GlassCard className="p-1" hover={false}>
                <div className="flex rounded-lg overflow-hidden">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm'
                            : currentTheme === 'dark'
                              ? 'text-gray-300 hover:text-white hover:bg-white/10'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-white/20'
                        }`}
                      >
                        <Icon size={16} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="grid gap-4">
                  <AnimatePresence>
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <GlassCard className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-16 h-20 object-cover rounded-md flex-shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-semibold text-lg mb-1 ${
                                currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {result.title}
                              </h3>
                              {result.author && (
                                <p className={`text-sm mb-2 ${
                                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  by {result.author} {result.year && `(${result.year})`}
                                </p>
                              )}
                              <p className={`text-sm line-clamp-2 mb-3 ${
                                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {result.description}
                              </p>
                              <div className="flex items-center gap-3">
                                <Select
                                  value={selectedStatuses[result.id] || 'todo'}
                                  onValueChange={(value: 'todo' | 'progress' | 'finished') => 
                                    handleStatusChange(result.id, value)
                                  }
                                >
                                  <SelectTrigger className={`w-32 h-8 text-xs border-0 bg-white/10 ${
                                    currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="progress">In Progress</SelectItem>
                                    <SelectItem value="finished">Finished</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  onClick={() => handleAddItem(result)}
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white flex-shrink-0 border-0"
                                >
                                  <Plus size={16} className="mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : query.trim() ? (
                <div className="text-center py-12">
                  <p className={`text-lg ${
                    currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    No results found for "{query}"
                  </p>
                  <p className={`text-sm mt-2 ${
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className={`text-lg ${
                    currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Start typing to search for {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
