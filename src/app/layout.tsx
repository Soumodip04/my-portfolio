import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityProvider from '@/components/AccessibilityProvider';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import PWAProvider from '@/components/PWAProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Soumodip Das - Full Stack Developer & ML Enthusiast',
  description: 'Passionate full-stack developer and machine learning enthusiast creating innovative web solutions. Expertise in React, Next.js, Python, and modern web technologies.',
  keywords: ['Soumodip Das', 'Full Stack Developer', 'Machine Learning', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'Soumodip Das' }],
  creator: 'Soumodip Das',
  metadataBase: new URL('https://soumodip-portfolio.vercel.app'),
  openGraph: {
    title: 'Soumodip Das - Full Stack Developer & ML Enthusiast',
    description: 'Passionate full-stack developer and machine learning enthusiast creating innovative web solutions.',
    url: 'https://soumodip-portfolio.vercel.app',
    siteName: 'Soumodip Das Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soumodip Das - Full Stack Developer & ML Enthusiast',
    description: 'Passionate full-stack developer and machine learning enthusiast creating innovative web solutions.',
    images: ['/og-image.jpg'],
    creator: '@das_soumodip04',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var isDark = savedTheme === 'dark' || 
                    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <AccessibilityProvider>
              <ReadingProgressBar />
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Navbar />
                <main id="main-content">
                  {children}
                </main>
                <Footer />
              </div>
              <PWAProvider />
            </AccessibilityProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
