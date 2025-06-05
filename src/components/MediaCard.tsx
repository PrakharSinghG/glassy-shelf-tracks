
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { MediaItem, useMediaStore } from '@/store/useMediaStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassCard from './GlassCard';

interface MediaCardProps {
  item: MediaItem;
  onEdit?: (item: MediaItem) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onEdit }) => {
  const { currentTheme, deleteItem, updateItem } = useMediaStore();
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [tempStatus, setTempStatus] = useState<'todo' | 'progress' | 'finished'>(item.status);

  const getStatusColor = () => {
    switch (item.status) {
      case 'todo':
        return 'from-gray-500 to-gray-600';
      case 'progress':
        return 'from-blue-500 to-purple-500';
      case 'finished':
        return 'from-green-500 to-emerald-500';
    }
  };

  const getStatusText = () => {
    switch (item.status) {
      case 'todo':
        return 'To Do';
      case 'progress':
        return 'In Progress';
      case 'finished':
        return 'Finished';
    }
  };

  const handleStatusSave = () => {
    updateItem(item.id, { status: tempStatus });
    setIsEditingStatus(false);
  };

  const handleStatusCancel = () => {
    setTempStatus(item.status);
    setIsEditingStatus(false);
  };

  return (
    <GlassCard className="p-4 h-80 relative" style={{ isolation: 'isolate' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full flex flex-col relative z-10"
      >
        {/* Cover Image */}
        <div className="relative h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-3 overflow-hidden">
          {item.coverImage ? (
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              {item.category === 'books' ? '📖' : item.category === 'shows' ? '🎬' : '🎧'}
            </div>
          )}
          
          {/* Status badge */}
          {isEditingStatus ? (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg p-1">
              <Select
                value={tempStatus}
                onValueChange={(value: 'todo' | 'progress' | 'finished') => setTempStatus(value)}
              >
                <SelectTrigger className="w-20 h-6 text-xs border-0 bg-transparent text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="finished">Finished</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={handleStatusSave}
                className="p-1 rounded bg-green-500 hover:bg-green-600 transition-colors"
              >
                <Check size={10} className="text-white" />
              </button>
              <button
                onClick={handleStatusCancel}
                className="p-1 rounded bg-red-500 hover:bg-red-600 transition-colors"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingStatus(true)}
              className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${getStatusColor()} text-white text-xs font-medium hover:opacity-80 transition-opacity`}
            >
              {getStatusText()}
            </button>
          )}

          {/* Actions */}
          <div className="absolute top-2 right-2 flex gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit?.(item)}
              className="p-1 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <Edit size={14} className="text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteItem(item.id)}
              className="p-1 rounded-full bg-red-500/20 backdrop-blur-sm hover:bg-red-500/30 transition-colors"
            >
              <Trash2 size={14} className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`font-semibold text-sm mb-2 line-clamp-2 ${
            currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {item.title}
          </h3>

          {item.progress !== undefined && (
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Progress
                </span>
                <span className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {item.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200/20 rounded-full h-1">
                <motion.div
                  className={`h-1 rounded-full bg-gradient-to-r ${getStatusColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          )}

          {item.mood && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-lg">{item.mood}</span>
              <span className={`text-xs ${
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                mood
              </span>
            </div>
          )}

          {item.notes && (
            <p className={`text-xs line-clamp-2 ${
              currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {item.notes}
            </p>
          )}
        </div>
      </motion.div>
    </GlassCard>
  );
};

export default MediaCard;
