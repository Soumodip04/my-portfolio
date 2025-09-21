'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Senior Developer',
    company: 'TechCorp Inc.',
    content: 'Soumodip demonstrated exceptional problem-solving skills and delivered high-quality code. His understanding of machine learning concepts and practical implementation is impressive.',
    rating: 5,
    avatar: '/testimonials/avatar1.jpg',
    date: '2023-12-15'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Project Manager',
    company: 'InnovateLab',
    content: 'Working with Soumodip was a pleasure. He consistently met deadlines and provided creative solutions to complex challenges. Highly recommended for any development project.',
    rating: 5,
    avatar: '/testimonials/avatar2.jpg',
    date: '2023-11-28'
  },
  {
    id: 3,
    name: 'Dr. Michael Rodriguez',
    role: 'Research Supervisor',
    company: 'University Lab',
    content: 'Soumodip\'s research work on computer vision was outstanding. His ability to bridge theoretical concepts with practical applications is remarkable for someone at his level.',
    rating: 5,
    avatar: '/testimonials/avatar3.jpg',
    date: '2023-10-20'
  },
  {
    id: 4,
    name: 'Emily Watson',
    role: 'UI/UX Designer',
    company: 'DesignStudio',
    content: 'Collaborating with Soumodip on web projects was seamless. He understands the importance of user experience and implements designs with pixel-perfect accuracy.',
    rating: 5,
    avatar: '/testimonials/avatar4.jpg',
    date: '2023-09-12'
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Tech Lead',
    company: 'StartupXYZ',
    content: 'Soumodip brought fresh ideas and modern development practices to our team. His full-stack capabilities and attention to detail greatly improved our product quality.',
    rating: 5,
    avatar: '/testimonials/avatar5.jpg',
    date: '2023-08-05'
  }
];

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${
        isActive ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
      }`}
    >
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating 
                ? 'text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Content */}
      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
        "{testimonial.content}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-purple-200 dark:border-purple-700">
          <Image
            src="/profile-placeholder.svg" // Fallback to placeholder
            alt={`${testimonial.name} avatar`}
            fill
            style={{ objectFit: 'cover' }}
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
            {testimonial.role}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {testimonial.company}
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(testimonial.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const visibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what colleagues and collaborators have to say about working with me.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {visibleTestimonials().map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${currentIndex}`}
              testimonial={testimonial}
              isActive={index === 1} // Middle card is active
            />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-purple-600 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-purple-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isAutoPlaying
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
                Auto-playing
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Paused
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
