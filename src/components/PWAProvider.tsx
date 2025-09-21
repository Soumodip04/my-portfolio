'use client';

import { useEffect } from 'react';
import { GoogleAnalytics } from '@/lib/analytics';
import { usePerformanceMonitoring } from '@/lib/performance';

// Interface for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAProvider = () => {
  // Performance monitoring (only in production)
  usePerformanceMonitoring();

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Handle app install prompt
    let deferredPrompt: BeforeInstallPromptEvent | null = null;
    
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      
      // Show install button or banner
      const installBanner = document.createElement('div');
      installBanner.className = 'fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg z-50';
      installBanner.innerHTML = `
        <div class="flex items-center space-x-3">
          <div>
            <p class="font-medium">Install Portfolio App</p>
            <p class="text-sm opacity-90">Get quick access from your home screen</p>
          </div>
          <button id="install-btn" class="bg-white text-purple-600 px-3 py-1 rounded text-sm font-medium">
            Install
          </button>
          <button id="dismiss-btn" class="text-white/80 hover:text-white">
            ×
          </button>
        </div>
      `;
      
      document.body.appendChild(installBanner);
      
      const installBtn = document.getElementById('install-btn');
      const dismissBtn = document.getElementById('dismiss-btn');
      
      installBtn?.addEventListener('click', () => {
        const promptEvent = deferredPrompt as BeforeInstallPromptEvent;
        if (promptEvent && promptEvent.prompt) {
          promptEvent.prompt();
          promptEvent.userChoice?.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            installBanner.remove();
          });
        }
      });
      
      dismissBtn?.addEventListener('click', () => {
        installBanner.remove();
      });
      
      // Auto-dismiss after 10 seconds
      setTimeout(() => {
        if (installBanner.parentElement) {
          installBanner.remove();
        }
      }, 10000);
    });

    // Handle app installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
    });

    // Handle network status
    const updateNetworkStatus = () => {
      if (navigator.onLine) {
        document.body.classList.remove('offline');
      } else {
        document.body.classList.add('offline');
        
        // Show offline notification
        const offlineNotification = document.createElement('div');
        offlineNotification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        offlineNotification.textContent = 'You are currently offline. Some features may be limited.';
        document.body.appendChild(offlineNotification);
        
        setTimeout(() => {
          if (offlineNotification.parentElement) {
            offlineNotification.remove();
          }
        }, 5000);
      }
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <style jsx global>{`
        .offline {
          filter: grayscale(0.5);
        }
        
        .offline::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default PWAProvider;
