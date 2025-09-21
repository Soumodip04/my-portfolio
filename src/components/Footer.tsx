'use client';

import { motion } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const Footer = () => {
  const [footerRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <footer ref={footerRef} className="py-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Soumodip Das
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md leading-relaxed">
              Full-stack developer and machine learning enthusiast passionate about creating innovative solutions and exploring cutting-edge technologies.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://github.com/Soumodip04" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-400 hover:text-purple-400 dark:hover:text-purple-300 transition-all duration-300"
                aria-label="GitHub"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-2 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/imsoumodipdas/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-400 hover:text-purple-400 dark:hover:text-purple-300 transition-all duration-300"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-2 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </motion.a>
              <motion.a 
                href="https://x.com/das_soumodip04" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-400 hover:text-purple-400 dark:hover:text-purple-300 transition-all duration-300"
                aria-label="Twitter"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-2 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
              </motion.a>
              <motion.a 
                href="mailto:soumo.das2004@gmail.com" 
                className="text-gray-300 dark:text-gray-400 hover:text-purple-400 dark:hover:text-purple-300 transition-all duration-300"
                aria-label="Email"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-2 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.a>
            </div>
          </motion.div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Skills</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Projects</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                <a href="mailto:soumo.das2004@gmail.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">soumo.das2004@gmail.com</a>
              </li>
              <li className="text-gray-600 dark:text-gray-400">Kolkata, West Bengal</li>
              <li>
                <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Send a message</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Soumodip Das. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Built with ❤️ using Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;