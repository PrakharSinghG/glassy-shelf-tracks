
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Check, X } from 'lucide-react';
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
        return 'from-slate-500 to-slate-600';
      case 'progress':
        return 'from-blue-500 to-indigo-600';
      case 'finished':
        return 'from-emerald-500 to-green-600';
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
    <GlassCard className="p-6 h-96 relative isolate group">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full flex flex-col relative z-10"
      >
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl mb-4 overflow-hidden border border-white/10">
          {item.coverImage ? (
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl opacity-60">
              {item.category === 'books' ? '📖' : item.category === 'shows' ? '🎬' : '🎧'}
            </div>
          )}
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status badge */}
          {isEditingStatus ? (
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-xl p-2">
              <Select
                value={tempStatus}
                onValueChange={(value: 'todo' | 'progress' | 'finished') => setTempStatus(value)}
              >
                <SelectTrigger className="w-24 h-7 text-xs border-0 bg-transparent text-white">
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
                className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors"
              >
                <Check size={12} className="text-white" />
              </button>
              <button
                onClick={handleStatusCancel}
                className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingStatus(true)}
              className={`absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-gradient-to-r ${getStatusColor()} text-white text-xs font-semibold hover:opacity-90 transition-all shadow-lg`}
            >
              {getStatusText()}
            </button>
          )}

          {/* Actions - Only delete button now */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteItem(item.id)}
              className="p-2 rounded-xl bg-red-500/30 backdrop-blur-md hover:bg-red-500/40 transition-colors shadow-lg"
            >
              <Trash2 size={16} className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3 className={`font-bold text-base leading-tight line-clamp-2 ${
            currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {item.title}
          </h3>

          {item.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Progress
                </span>
                <span className={`${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>
                  {item.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${getStatusColor()} shadow-sm`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {item.mood && (
            <div className="flex items-center gap-2">
              <span className="text-xl">{item.mood}</span>
              <span className={`text-xs font-medium ${
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                mood
              </span>
            </div>
          )}

          {item.notes && (
            <p className={`text-sm line-clamp-2 leading-relaxed ${
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
