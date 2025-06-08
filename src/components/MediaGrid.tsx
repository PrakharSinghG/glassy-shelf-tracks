
import React from 'react';
import { motion } from 'framer-motion';
import { MediaItem } from '@/store/useMediaStore';
import MediaCard from './MediaCard';

interface MediaGridProps {
  items: MediaItem[];
}

const MediaGrid: React.FC<MediaGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 isolate">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative"
          style={{ isolation: 'isolate' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MediaCard item={item} />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
