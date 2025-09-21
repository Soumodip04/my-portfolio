'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = useMemo(() => [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollableHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));

      // Find active section
      const sectionElements = sections.map(section => ({
        ...section,
        element: document.getElementById(section.id)
      }));

      let currentSection = 'hero';
      
      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      {/* Progress Bar */}
      <div className="relative w-1 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Section Indicators */}
      <div className="space-y-3">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 group ${
              activeSection === section.id
                ? 'bg-purple-500 border-purple-500 scale-125'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-purple-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                {section.label}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-100 border-y-4 border-y-transparent"></div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ScrollProgress;
