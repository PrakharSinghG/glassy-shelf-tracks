
import React from 'react';
import { motion } from 'framer-motion';
import { useMediaStore } from '@/store/useMediaStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentTheme, glassIntensity } = useMediaStore();

  const getGlassClasses = () => {
    const base = 'backdrop-blur';
    switch (glassIntensity) {
      case 'high':
        return `${base}-xl`;
      case 'low':
        return `${base}-sm`;
      default:
        return `${base}-md`;
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        currentTheme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-purple-900/70 to-blue-900/80'
          : 'bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/60'
      }`}
    >
      <div className="relative min-h-screen overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
        
        {/* Enhanced floating orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl ${
              currentTheme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-400/30'
            }`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
              currentTheme === 'dark' ? 'bg-blue-500/15' : 'bg-blue-400/25'
            }`}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl ${
              currentTheme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-400/20'
            }`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.25, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
