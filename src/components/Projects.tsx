'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Project } from '@/types';
import ProjectModal from './ProjectModal';

// Project interface is imported from types

const projects: Project[] = [
  {
    id: 1,
    title: 'MindScope - Multilingual AI Mental Health Platform',
    description: 'The world\'s first multilingual AI therapist providing 24/7 mental health support in 20+ languages with real crisis intervention capabilities. Built for global accessibility and cultural sensitivity.',
    image: '/projects/mindscope-thumb.png',
    tags: ['Next.js', 'TypeScript', 'AI Therapy', 'Multilingual', 'Crisis Support'],
    technologies: ['Next.js 15', 'TypeScript', 'Groq SDK', 'Llama 3 8B', 'TensorFlow.js', 'MediaPipe', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    features: [
      'AI Therapist with Smart Context Detection',
      'Multilingual Support in 20+ languages with cultural adaptation',
      'Real-time Crisis Detection and Intervention',
      'Evidence-Based Therapy (CBT, DBT, mindfulness)',
      'Global Accessibility with regional emergency numbers',
      'Advanced Safety Systems with professional integration',
      'Real-time Mental Health Analytics and insights',
      'Privacy-by-Design with HIPAA compliance'
    ],
    challenges: `• Developing culturally sensitive AI therapy models that adapt responses across 20+ languages while maintaining therapeutic efficacy

• Implementing real-time crisis detection algorithms with immediate intervention capabilities including professional handoffs

• Building scalable multilingual NLP systems with context-aware emotional analysis

• Ensuring HIPAA compliance and privacy-by-design architecture while maintaining global accessibility

• Creating region-specific emergency integration with local mental health services and crisis hotlines`,
    github: 'https://github.com/Soumodip04/MindScope',
    demo: 'https://mind-scope-gold.vercel.app',
    liveUrl: 'https://mind-scope-gold.vercel.app',
    link: 'https://mind-scope-gold.vercel.app',
    category: 'AI & Healthcare',
  },
  {
    id: 2,
    title: 'RAG Expert System',
    description: 'A domain-adaptive AI system that enables enterprises to query their internal documents securely using natural language. Combines powerful LLMs with private data search to deliver fact-checked, cited answers — ideal for healthcare, legal, or education use cases.',
    image: '/projects/rag-thumb.png',
    tags: ['Python', 'OpenAI API', 'FastAPI', 'Streamlit', 'ChromaDB'],
    technologies: ['Python', 'OpenAI API', 'FastAPI', 'Streamlit', 'ChromaDB', 'LangChain'],
    features: [
      'Natural language document querying',
      'Domain-adaptive responses',
      'Secure document processing',
      'Citation and fact-checking',
      'Enterprise-ready deployment'
    ],
    challenges: `• Optimizing document chunking algorithms for semantic coherence while maintaining retrieval speed

• Implementing secure document processing pipelines with enterprise-grade privacy controls

• Balancing LLM response accuracy with query latency under high concurrent loads

• Developing domain-adaptive citation systems that provide precise source attribution

• Creating robust fact-checking mechanisms to prevent hallucinations in critical use cases`,
    github: 'https://github.com/Soumodip04/rag-expert-system',
    demo: 'https://rag-demo.com',
    liveUrl: 'https://rag-demo.com',
    link: 'https://rag-demo.com',
    category: 'AI & Backend',
  },
  {
    id: 3,
    title: 'Personal Portfolio Website',
    description: 'A modern and responsive portfolio website built with Next.js 14, showcasing my projects and skills with advanced features like PWA support, dark mode, and performance optimization.',
    image: '/projects/portfolio-thumb.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React'],
    features: [
      'Responsive design across all devices',
      'Dark mode support with theme persistence',
      'PWA capabilities with offline support',
      'Performance optimized with Next.js 14',
      'SEO friendly with structured data',
      'Smooth animations with Framer Motion'
    ],
    challenges: `• Achieving sub-200ms page load times with complex animations and PWA capabilities

• Implementing sophisticated dark mode with seamless theme persistence across sessions

• Building responsive layouts that perform consistently across all device sizes and orientations

• Optimizing Framer Motion animations for 60fps performance while maintaining visual appeal

• Ensuring accessibility compliance (WCAG 2.1) while preserving modern design aesthetics`,
    github: 'https://github.com/Soumodip04',
    demo: 'https://soumodip-portfolio.vercel.app',
    liveUrl: 'https://soumodip-portfolio.vercel.app',
    link: 'https://soumodip-portfolio.vercel.app',
    category: 'Frontend',
  },
];

const ProjectCard = ({ project, index, onViewDetails }: { 
  project: Project; 
  index: number; 
  onViewDetails: (project: Project) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Project Category Badge */}
      <motion.div 
        className="absolute top-4 right-4 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
          {project.category}
        </span>
      </motion.div>

      {/* Enhanced Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Floating Action Buttons */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 z-20 flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-all"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Code
          </motion.a>
          
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-medium shadow-lg"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Demo
          </motion.a>
        </motion.div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          layoutId={`title-${project.id}`}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed"
          animate={{ opacity: isHovered ? 0.8 : 1 }}
        >
          {project.description}
        </motion.p>
        
        {/* Enhanced Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700 hover:shadow-md transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* View Details Button */}
        <motion.button
          onClick={() => onViewDetails(project)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          View Details
        </motion.button>
      </div>

      {/* Subtle Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 -z-10"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ padding: '2px' }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Enhanced filtering with search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section 
      id="projects" 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 relative overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #ec4899 0%, transparent 50%)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Projects
          </span>
        </motion.h2>

        {/* Enhanced Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl shadow-inner backdrop-blur-sm">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid with Stagger Animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeCategory}-${searchTerm}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search terms or category filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CTA Section */}
        {filteredProjects.length > 0 && (
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View More on GitHub
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.section>
  );
};

export default Projects;