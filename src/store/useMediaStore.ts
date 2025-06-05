
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MediaItem {
  id: string;
  title: string;
  category: 'books' | 'shows' | 'podcasts';
  status: 'todo' | 'progress' | 'finished';
  coverImage?: string;
  notes?: string;
  mood?: string;
  dateAdded: string;
  progress?: number;
}

interface MediaStore {
  items: MediaItem[];
  currentTheme: 'light' | 'dark';
  glassIntensity: 'default' | 'high' | 'low';
  accentColor: string;
  addItem: (item: Omit<MediaItem, 'id' | 'dateAdded'>) => void;
  updateItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteItem: (id: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setGlassIntensity: (intensity: 'default' | 'high' | 'low') => void;
  setAccentColor: (color: string) => void;
}

export const useMediaStore = create<MediaStore>()(
  persist(
    (set) => ({
      items: [],
      currentTheme: 'dark',
      glassIntensity: 'default',
      accentColor: '#8b5cf6',
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: crypto.randomUUID(),
              dateAdded: new Date().toISOString(),
            },
          ],
        })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      setTheme: (theme) => set({ currentTheme: theme }),
      setGlassIntensity: (intensity) => set({ glassIntensity: intensity }),
      setAccentColor: (color) => set({ accentColor: color }),
    }),
    {
      name: 'media-tracker-storage',
    }
  )
);
