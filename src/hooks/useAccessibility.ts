'use client';

import { useState, useEffect } from 'react';

export const useKeyboardNavigation = () => {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip navigation if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const sections = ['hero', 'about', 'projects', 'skills', 'blog', 'contact'];
      const currentIndex = focusedElement ? sections.indexOf(focusedElement) : -1;

      switch (event.key) {
        case 'ArrowDown':
        case 'j':
          event.preventDefault();
          const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
          navigateToSection(sections[nextIndex]);
          break;
        
        case 'ArrowUp':
        case 'k':
          event.preventDefault();
          const prevIndex = Math.max(currentIndex - 1, 0);
          navigateToSection(sections[prevIndex]);
          break;
        
        case 'Home':
          event.preventDefault();
          navigateToSection('hero');
          break;
        
        case 'End':
          event.preventDefault();
          navigateToSection('contact');
          break;
        
        case 'Escape':
          // Close any open modals or menus
          if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('closeModals'));
          }
          break;
      }
    };

    const navigateToSection = (sectionId: string) => {
      if (typeof document === 'undefined') return;
      
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setFocusedElement(sectionId);
        
        // Set focus to the section for screen readers
        element.focus();
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [focusedElement]);

  return { focusedElement, setFocusedElement };
};

export const useScreenReader = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  return { announcements, announce };
};
