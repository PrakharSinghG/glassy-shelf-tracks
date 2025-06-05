
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
    const baseClasses = 'backdrop-blur border border-white/20';
    const themeClasses = currentTheme === 'dark' 
      ? 'bg-white/10 shadow-xl' 
      : 'bg-white/30 shadow-lg';
    
    const intensityClasses = {
      high: 'backdrop-blur-xl',
      default: 'backdrop-blur-md',
      low: 'backdrop-blur-sm',
    };

    return `${baseClasses} ${themeClasses} ${intensityClasses[glassIntensity]}`;
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl',
        getGlassClasses(),
        hover && 'cursor-pointer',
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -4,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }
          : {}
      }
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
