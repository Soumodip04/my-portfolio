'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / scrollHeight) * 100;
      setProgress(progress);
      setIsVisible(scrollTop > 100); // Show after scrolling 100px
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -10 
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 shadow-lg"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)'
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Progress percentage indicator */}
      {isVisible && progress > 10 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-4 top-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 text-xs font-medium px-2 py-1 rounded-full shadow-lg border border-gray-200 dark:border-gray-600"
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReadingProgressBar;
