'use client';

import { useScreenReader } from '@/hooks/useAccessibility';

const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const { announcements } = useScreenReader();

  return (
    <>
      {children}
      
      {/* Screen Reader Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      {/* Skip Navigation Links */}
      <nav className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <ul className="flex flex-col gap-2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border">
          <li>
            <a 
              href="#main-content" 
              className="text-purple-600 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
            >
              Skip to main content
            </a>
          </li>
          <li>
            <a 
              href="#navigation" 
              className="text-purple-600 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
            >
              Skip to navigation
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="text-purple-600 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
            >
              Skip to contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Keyboard Navigation Help */}
      <div 
        className="sr-only focus:not-sr-only focus:fixed focus:bottom-4 focus:right-4 focus:bg-white focus:dark:bg-gray-800 focus:p-4 focus:rounded-lg focus:shadow-lg focus:border focus:z-50 focus:max-w-xs"
        tabIndex={-1}
      >
        <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
        <ul className="text-sm space-y-1">
          <li>↑/↓ or J/K: Navigate sections</li>
          <li>Home: Go to top</li>
          <li>End: Go to contact</li>
          <li>Tab: Navigate interactive elements</li>
          <li>Escape: Close modals</li>
        </ul>
      </div>
    </>
  );
};

export default AccessibilityProvider;
