'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';

// BlogPost interface
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
}

const BlogSearch = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      onSearch(value);
      setIsSearching(false);
    }, 300);
  }, [onSearch]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="relative mb-8 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
      />
      <svg
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      
      {/* Loading spinner or clear button */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {isSearching ? (
          <LoadingSpinner size="sm" />
        ) : searchTerm && (
          <button
            onClick={clearSearch}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
  // Function to get icon based on post title/category
const BlogCard = ({ post }: { post: BlogPost }) => {
  // Function to get icon based on post title/category
  const getPostIcon = (title: string, category: string) => {
    if (title.includes('Chat App') || title.includes('Real-Time')) return '📬';
    if (title.includes('Portfolio') || title.includes('Website')) return '🌐';
    if (title.includes('Machine Learning') || title.includes('ML')) return '🤖';
    if (title.includes('Hackathon') || title.includes('Winning')) return '🏆';
    if (category === 'Machine Learning') return '🤖';
    if (category === 'Web Development') return '💻';
    if (category === 'Programming') return '👨‍💻';
    if (category === 'AI & Web') return '🔮';
    if (category === 'Hackathon') return '🏆';
    return '📝';
  };

  return (
    <div className="card overflow-hidden group h-full flex flex-col hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-transparent hover:border-purple-200 dark:hover:border-purple-900/30">
      <div className="relative h-52 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <div className="absolute top-4 left-4 z-20 text-4xl opacity-90 drop-shadow-lg bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center">
          {getPostIcon(post.title, post.category)}
        </div>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </span>
          {post.link?.startsWith('/') ? (
            // Internal link
            <a 
              href={post.link} 
              className="btn btn-outline-sm group-hover:btn-primary-sm transition-all duration-300 flex items-center gap-1 relative overflow-hidden"
            >
              <span className="relative z-10">Read More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          ) : (
            // External link
            <a 
              href={post.link || '#'} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-sm group-hover:btn-primary-sm transition-all duration-300 flex items-center gap-1 relative overflow-hidden"
            >
              <span className="relative z-10">Read More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLDivElement>();

  const blogPosts: BlogPost[] = useMemo(() => [
    {
      id: 1,
      title: '💼 Building a Domain-Adaptive RAG System for Secure AI',
      excerpt: 'A domain-adaptive AI system that enables enterprises to query their internal documents securely using natural language. Combines powerful LLMs with private data search to deliver fact-checked, cited answers — ideal for healthcare, legal, or education use cases.',
      category: 'AI & Web',
      date: 'July 12, 2025',
      readTime: '8 min read',
      image: '/blog_rag_og.png',
      link: '/blog/rag-expert-system'
    },
    {
      id: 2,
      title: 'Building a Real-Time Chat App Using MERN Stack',
      excerpt: 'I built a full-stack real-time chat application using React, Node.js, Express, MongoDB, and Socket.IO. In this post, I explain how I set up real-time messaging, authentication, and responsive UI with Tailwind CSS.',
      category: 'Web Development',
      date: 'May 15, 2024',
      readTime: '8 min read',
      image: '/window.svg',
      link: '/blog/mern-chat-app'
    },
    {
      id: 3,
      title: 'Creating a Resume Builder Web App – From Idea to Deployment',
      excerpt: 'I share how I developed an ongoing project to help users create professional resumes with custom templates. Built with HTML, CSS, and JavaScript, this app focuses on ease of use and responsive design.',
      category: 'Web Development',
      date: 'April 3, 2024',
      readTime: '6 min read',
      image: '/projects/task-app.svg',
      link: '/blog/resume-builder'
    },
    {
      id: 4,
      title: 'How I Built My Portfolio Website From Scratch',
      excerpt: 'This post covers how I designed and built my personal portfolio website using HTML, CSS, and JavaScript. I focused on clean UI, cross-device compatibility, and a smooth user experience.',
      category: 'Web Development',
      date: 'March 20, 2024',
      readTime: '5 min read',
      image: '/globe.svg',
      link: '/blog/portfolio'
    },
    {
      id: 5,
      title: 'My Machine Learning Internship Projects – What I Learned',
      excerpt: 'During my internships at Bharat Intern and Oasis Infobyte, I worked on ML tasks like data preprocessing, model building, and prediction systems. In this post, I reflect on key projects and lessons.',
      category: 'Machine Learning',
      date: 'February 12, 2024',
      readTime: '7 min read',
      image: '/projects/ai-image.svg',
      link: '/blog/ml-internship'
    },
    {
      id: 6,
      title: 'Winning 1st Runner-Up at the Smart India Hackathon – My Experience',
      excerpt: 'I share my journey in SIH 2024 where my team built a smart solution that earned us the 1st runner-up position. This post breaks down our idea, how we collaborated, and what I learned.',
      category: 'Hackathon',
      date: 'January 25, 2024',
      readTime: '9 min read',
      image: '/file.svg',
      link: '/blog/sih-2024'
    },
    {
      id: 7,
      title: 'The Future of AI in Web Development - My Perspective',
      excerpt: 'Exploring how artificial intelligence is transforming web development practices and what skills developers should focus on to stay relevant in this rapidly evolving landscape.',
      category: 'AI & Web',
      date: 'June 5, 2024',
      readTime: '6 min read',
      image: '/projects/ai-image.svg',
      link: '/blog/ai-web-future'
    },
  ], []);

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    // Filter posts based on selected category and search term
    let filteredPosts = selectedCategory === 'All' 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory);
    
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setVisiblePosts(filteredPosts);
  }, [selectedCategory, searchTerm, blogPosts]);

  // No need for intersection observer effect as we're using the custom hook

  return (
    <section id="blog" className="py-24 bg-gradient-to-br from-white via-gray-50 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/10" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 relative inline-block w-full">
          Latest <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Blog Posts</span>
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Sharing my journey, insights, and experiences in web development, machine learning, and programming challenges.
        </p>

        {/* Search Bar */}
        <BlogSearch onSearch={handleSearch} />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md transform scale-105' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.608-4.29-3.622 0-3.622 3.622-6.378 8-6.378 4.378 0 8 2.756 8 6.378A7.962 7.962 0 0121 17.709V20a1 1 0 01-1 1h-1a1 1 0 01-1-1v-.291z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* View All Posts Button */}
        <div className="mt-16 text-center">
          <a 
            href="#all-posts" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
          >
            <span>View All Posts</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;