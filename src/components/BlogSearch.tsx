'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image?: string;
}

const BlogSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  // Sample blog posts - in a real app, this would come from a CMS or API
  const blogPosts: BlogPost[] = useMemo(() => [
    {
      id: '1',
      title: 'Building a RAG System with Python and LangChain',
      excerpt: 'Learn how to build a Retrieval Augmented Generation system using Python, LangChain, and vector databases for intelligent document querying.',
      content: 'Full article content here...',
      category: 'Machine Learning',
      tags: ['Python', 'LangChain', 'RAG', 'Vector DB'],
      publishedAt: '2024-01-15',
      readTime: 8,
      image: '/blog_rag.png'
    },
    {
      id: '2',
      title: 'Modern React Patterns and Best Practices',
      excerpt: 'Explore advanced React patterns including custom hooks, context optimization, and performance techniques for modern web applications.',
      content: 'Full article content here...',
      category: 'Web Development',
      tags: ['React', 'JavaScript', 'Performance', 'Hooks'],
      publishedAt: '2024-01-10',
      readTime: 6
    },
    {
      id: '3',
      title: 'TypeScript Tips for Better Code Quality',
      excerpt: 'Discover advanced TypeScript features and patterns that will make your code more type-safe, maintainable, and developer-friendly.',
      content: 'Full article content here...',
      category: 'Programming',
      tags: ['TypeScript', 'JavaScript', 'Best Practices'],
      publishedAt: '2024-01-05',
      readTime: 5
    },
    {
      id: '4',
      title: 'Machine Learning Project Lifecycle',
      excerpt: 'A comprehensive guide to managing ML projects from data collection to deployment, including MLOps best practices.',
      content: 'Full article content here...',
      category: 'Machine Learning',
      tags: ['ML', 'MLOps', 'Data Science', 'Python'],
      publishedAt: '2024-01-01',
      readTime: 10
    }
  ], []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))], [blogPosts]);
  const allTags = useMemo(() => Array.from(new Set(blogPosts.flatMap(post => post.tags))), [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag, blogPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const sharePost = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `${window.location.origin}/blog/${post.id}`
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${post.title} - ${window.location.origin}/blog/${post.id}`);
    }
  };

  return (
    <section
      id="blog-search"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-gray-900"
    >
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on technology, programming, and innovation.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    !selectedTag
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-500'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div variants={itemVariants}>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  whileHover={{ y: -8 }}
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.readTime} min read
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(post.publishedAt)}
                      </time>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => sharePost(post)}
                          className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                          title="Share article"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                        
                        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.022a7.962 7.962 0 01-5-1.731M15 11V9a6 6 0 00-12 0v2a4 4 0 014 4z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search criteria or browse all articles.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6 opacity-90">
            Get notified when I publish new articles about technology and programming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogSearch;
