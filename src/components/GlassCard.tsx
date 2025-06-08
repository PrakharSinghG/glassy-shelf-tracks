
import React from 'react';
import { motion } from 'framer-motion';
import { useMediaStore } from '@/store/useMediaStore';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = true,
  onClick,
}) => {
  const { currentTheme, glassIntensity } = useMediaStore();

  const getGlassClasses = () => {
    const baseClasses = 'backdrop-blur border';
    const themeClasses = currentTheme === 'dark' 
      ? 'bg-white/5 border-white/10 shadow-2xl shadow-black/20' 
      : 'bg-white/40 border-white/30 shadow-xl shadow-black/5';
    
    const intensityClasses = {
      high: 'backdrop-blur-2xl',
      default: 'backdrop-blur-xl',
      low: 'backdrop-blur-lg',
    };

    return `${baseClasses} ${themeClasses} ${intensityClasses[glassIntensity]}`;
  };

  return (
    <motion.div
      className={cn(
        'rounded-2xl transition-all duration-300',
        getGlassClasses(),
        hover && 'cursor-pointer',
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -6,
              boxShadow: currentTheme === 'dark' 
                ? '0 32px 64px -12px rgba(0, 0, 0, 0.4)' 
                : '0 32px 64px -12px rgba(0, 0, 0, 0.15)',
            }
          : {}
      }
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
