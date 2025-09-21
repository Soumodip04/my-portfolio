'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = useMemo(() => ['Machine Learning Enthusiast', 'Python Developer', 'Full-Stack Engineer'], []);

  // Navigation sections for side pagination 
  const navSections = useMemo(() => [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ], []);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Soumodip04', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/imsoumodipdas/', icon: FaLinkedin },
    { name: 'Twitter', url: 'https://x.com/das_soumodip04', icon: FaTwitter },
  ];

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navSections.map(section => ({
        ...section,
        element: document.getElementById(section.id)
      }));

      let currentSection = 'home';
      
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
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
  }, [navSections]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden transition-all duration-500"
    >
      {/* Background Effects - Simplified */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 dark:bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-50"></div>
      </div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500"
          variants={itemVariants}
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Soumodip Das
          </span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-8 h-12 flex items-center justify-center transition-colors duration-500"
          variants={itemVariants}
        >
          <span>I'm a </span>
          <span className="ml-2 text-purple-700 dark:text-purple-400 font-semibold border-r-2 border-purple-700 dark:border-purple-400 pr-1">
            {text}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed transition-colors duration-500"
          variants={itemVariants}
        >
          I create innovative web applications and AI-powered solutions that solve real-world problems. 
          Passionate about full-stack development, machine learning, and building user-centric digital experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10">Contact Me</span>
          </motion.a>
          <motion.button
            onClick={() => window.open('/Soumodip Das Resume ML Updated.pdf', '_blank')}
            className="group px-8 py-4 border-2 border-purple-500 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
              </svg>
              View Resume
            </span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6"
          variants={itemVariants}
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transform transition-all duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <IconComponent size={24} />
                <span className="sr-only">{social.name}</span>
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Side Navigation Pagination with Background Box */}
      <motion.div
        className="fixed right-2 top-1/2 transform -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-full p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col space-y-3">
            {navSections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 group ${
                  activeSection === section.id 
                    ? 'bg-purple-600 scale-125 shadow-lg shadow-purple-500/50' 
                    : 'bg-gray-400 dark:bg-gray-600 hover:bg-purple-400 dark:hover:bg-purple-500'
                }`}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to ${section.label}`}
              >
                {/* Tooltip */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                  <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                    {section.label}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 dark:border-l-gray-100 border-y-4 border-y-transparent"></div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>


    </section>
  );
};

export default Hero;
