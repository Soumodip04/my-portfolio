'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export default function PortfolioBlog() {
  const { theme } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <Link href="/#blog" className="inline-flex items-center mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
                Web Development
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">March 20, 2024 · 5 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              How I Built My Portfolio Website From Scratch
            </h1>
          </div>

          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <div className="absolute bottom-6 left-6 z-20 text-6xl">
              🌐
            </div>
            <div className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-pink-600"></div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Building My Personal Portfolio: A Journey Through Modern Web Development</h1>
            <p><em>By Soumodip Das</em></p>

            <h2>Introduction: Why Build From Scratch?</h2>
            <p>In today's competitive tech landscape, having a standout portfolio is essential. While there are countless portfolio templates and builders available, I decided to build mine from scratch using modern web technologies. This decision allowed me to showcase not just my projects, but also my technical skills and attention to detail.</p>

            <p>In this post, I'll walk you through my journey of creating a fully responsive, interactive portfolio website using Next.js 14, TypeScript, and Tailwind CSS.</p>

            <h2>Technology Stack Decision</h2>
            <p>Choosing the right technology stack was crucial for creating a portfolio that would be both impressive and maintainable:</p>

            <h3>Frontend Framework: Next.js 14</h3>
            <ul>
              <li><strong>Server-Side Rendering (SSR):</strong> Excellent SEO performance</li>
              <li><strong>App Router:</strong> Modern file-based routing system</li>
              <li><strong>Image Optimization:</strong> Built-in performance optimizations</li>
              <li><strong>TypeScript Support:</strong> First-class TypeScript integration</li>
            </ul>

            <h3>Styling: Tailwind CSS</h3>
            <ul>
              <li><strong>Utility-first:</strong> Rapid development and consistent design</li>
              <li><strong>Responsive Design:</strong> Mobile-first approach built-in</li>
              <li><strong>Dark Mode:</strong> Easy theme switching implementation</li>
              <li><strong>Custom Configuration:</strong> Tailored design system</li>
            </ul>

            <h3>Animations: Framer Motion</h3>
            <ul>
              <li><strong>Smooth Transitions:</strong> Professional-grade animations</li>
              <li><strong>Scroll-triggered Animations:</strong> Engaging user experience</li>
              <li><strong>Performance:</strong> GPU-accelerated animations</li>
            </ul>

            <h2>Project Architecture and Structure</h2>
            <p>I organized the project using Next.js 14's App Router for optimal development experience:</p>

            <CodeBlock language="bash" code={`
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles
│   │   └── blog/               # Blog posts
│   ├── components/             # Reusable UI components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   └── Navbar.tsx
│   ├── context/                # React Context
│   │   └── ThemeContext.tsx
│   ├── hooks/                  # Custom hooks
│   │   └── useIntersectionObserver.ts
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts
│   └── utils/                  # Helper functions
├── public/                     # Static assets
│   ├── projects/               # Project images
│   ├── resume.pdf
│   └── manifest.json          # PWA manifest
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
            `} />

            <h2>Design System and UI Components</h2>
            <p>I created a comprehensive design system with consistent colors, typography, and spacing:</p>

            <CodeBlock language="javascript" code={`
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '25%': {
            'background-size': '400% 400%',
            'background-position': 'right top'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right bottom'
          },
          '75%': {
            'background-size': '400% 400%',
            'background-position': 'left bottom'
          }
        }
      }
    },
  },
  plugins: [],
};
            `} />

            <h2>Key Features Implementation</h2>
            <h3>1. Responsive Navigation with Theme Toggle</h3>
            <p>Created a fully responsive navigation bar with smooth theme switching:</p>

            <CodeBlock language="tsx" code={`
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }\`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Soumodip
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Skills', 'Projects', 'Blog', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={\`#\${item.toLowerCase()}\`}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={\`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all \${
                isOpen ? 'rotate-45 translate-y-1' : ''
              }\`} />
              <span className={\`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 my-1 transition-all \${
                isOpen ? 'opacity-0' : ''
              }\`} />
              <span className={\`block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all \${
                isOpen ? '-rotate-45 -translate-y-1' : ''
              }\`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-4">
                {['About', 'Skills', 'Projects', 'Blog', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={\`#\${item.toLowerCase()}\`}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
            `} />

            <h3>2. Hero Section with Animated Typography</h3>
            <p>The hero section features an eye-catching animated introduction:</p>

            <CodeBlock language="tsx" code={`
const Hero = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="mb-8"
        >
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block">
              {"Hi, I'm ".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {"Soumodip Das".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          <motion.p
            variants={letterVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8"
          >
            Full Stack Developer & ML Enthusiast
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
            `} />

            <h3>3. Intersection Observer Hook</h3>
            <p>Created a custom hook for scroll-triggered animations:</p>

            <CodeBlock language="typescript" code={`
import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T>, boolean] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  } = options;

  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        if (!freezeOnceVisible || !isVisible) {
          setIsVisible(isElementVisible);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return [elementRef, isVisible];
}

export default useIntersectionObserver;
            `} />

            <h3>4. Dark Mode Implementation</h3>
            <p>Implemented a robust dark mode system with context and persistence:</p>

            <CodeBlock language="tsx" code={`
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(savedTheme || systemTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
            `} />

            <h2>Performance Optimizations</h2>
            <p>I implemented several performance optimizations to ensure fast loading times:</p>

            <h3>Image Optimization</h3>
            <ul>
              <li>Used Next.js Image component for automatic optimization</li>
              <li>Implemented lazy loading for all images</li>
              <li>Optimized image formats (WebP where supported)</li>
              <li>Proper sizing and responsive images</li>
            </ul>

            <h3>Code Splitting</h3>
            <ul>
              <li>Dynamic imports for large components</li>
              <li>Route-based code splitting with Next.js</li>
              <li>Tree shaking for unused code elimination</li>
            </ul>

            <h3>Bundle Optimization</h3>
            <CodeBlock language="javascript" code={`
// next.config.js
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = config;
            `} />

            <h2>SEO and Accessibility</h2>
            <p>Ensuring the portfolio is discoverable and accessible was a priority:</p>

            <h3>SEO Implementation</h3>
            <ul>
              <li>Structured data with JSON-LD</li>
              <li>Dynamic meta tags for each page</li>
              <li>Sitemap generation</li>
              <li>Open Graph and Twitter Card support</li>
            </ul>

            <h3>Accessibility Features</h3>
            <ul>
              <li>Semantic HTML structure</li>
              <li>ARIA labels and roles</li>
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>Color contrast compliance</li>
            </ul>

            <h2>Deployment and DevOps</h2>
            <p>Deployed the portfolio using modern deployment practices:</p>

            <h3>Vercel Deployment</h3>
            <ul>
              <li>Automatic deployments from Git</li>
              <li>Branch previews for testing</li>
              <li>Edge functions for global performance</li>
              <li>Analytics and performance monitoring</li>
            </ul>

            <h3>Performance Monitoring</h3>
            <ul>
              <li>Core Web Vitals tracking</li>
              <li>Real User Monitoring (RUM)</li>
              <li>Error tracking and reporting</li>
              <li>User analytics with privacy focus</li>
            </ul>

            <h2>Challenges and Solutions</h2>
            <h3>Challenge 1: Smooth Animations on Mobile</h3>
            <p><strong>Problem:</strong> Complex animations caused performance issues on mobile devices.</p>
            <p><strong>Solution:</strong> Implemented reduced motion preferences and optimized animations with will-change CSS properties.</p>

            <h3>Challenge 2: Theme Switching Flicker</h3>
            <p><strong>Problem:</strong> Brief flash of wrong theme on page load.</p>
            <p><strong>Solution:</strong> Implemented theme detection in app root and used CSS variables for instant theme switching.</p>

            <h3>Challenge 3: SEO for Single Page Application</h3>
            <p><strong>Problem:</strong> Search engines had difficulty indexing dynamic content.</p>
            <p><strong>Solution:</strong> Used Next.js SSR and static generation for optimal SEO performance.</p>

            <h2>Key Learnings</h2>
            <p>Building this portfolio taught me valuable lessons about modern web development:</p>

            <ul>
              <li><strong>Performance Matters:</strong> Every optimization counts for user experience</li>
              <li><strong>Accessibility First:</strong> Building inclusively benefits everyone</li>
              <li><strong>Modern Tools:</strong> Next.js and TypeScript significantly improve development experience</li>
              <li><strong>User Experience:</strong> Smooth animations and interactions create memorable experiences</li>
              <li><strong>SEO Strategy:</strong> Technical SEO is crucial for portfolio visibility</li>
            </ul>

            <h2>Future Enhancements</h2>
            <p>Planned improvements for the portfolio include:</p>
            <ul>
              <li>Content Management System integration</li>
              <li>Interactive project demos</li>
              <li>Blog comment system</li>
              <li>Newsletter subscription</li>
              <li>Progressive Web App features</li>
              <li>Advanced analytics dashboard</li>
            </ul>

            <h2>Conclusion</h2>
            <p>Building a portfolio from scratch was an incredibly rewarding experience that allowed me to showcase both my technical skills and creativity. The process taught me the importance of user-centered design, performance optimization, and modern web development practices.</p>

            <p>The combination of Next.js, TypeScript, and Tailwind CSS provided an excellent foundation for creating a professional, performant, and maintainable portfolio. The attention to details like animations, accessibility, and SEO helped create a memorable user experience that effectively represents my skills and personality.</p>

            <p>For anyone considering building their own portfolio, I highly recommend starting from scratch rather than using a template. The learning experience is invaluable, and the result will be uniquely yours.</p>

            <div className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🚀 Explore the Portfolio
              </h3>
              <p className="text-purple-700 dark:text-purple-300 mb-4">
                Check out the live portfolio and explore all the features discussed in this article!
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Soumodip04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  View Source Code
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
