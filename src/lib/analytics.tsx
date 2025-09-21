'use client';

import Script from 'next/script';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
};

// Event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Contact form tracking
export const trackContactForm = (action: 'start' | 'submit' | 'success' | 'error') => {
  trackEvent('contact_form', {
    action,
    timestamp: new Date().toISOString(),
  });
};

// Project interaction tracking
export const trackProjectInteraction = (projectName: string, action: 'view' | 'click') => {
  trackEvent('project_interaction', {
    project_name: projectName,
    action,
  });
};

// Resume download tracking
export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    timestamp: new Date().toISOString(),
  });
};
