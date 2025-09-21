'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-300">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="mt-4 text-purple-600 dark:text-purple-400 font-semibold">Loading Portfolio...</p>
      </div>
    </div>
  );
}
