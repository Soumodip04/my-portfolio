'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
  github?: string;
  demo?: string;
  image?: string;
  startDate: string;
  completionDate?: string;
  teamSize: number;
  industry: string;
  performance?: {
    buildTime: number;
    bundleSize: number;
    lighthouse: number;
  };
}

interface ProjectFilterProps {
  projects: Project[];
  onFilteredProjects: (projects: Project[]) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ projects, onFilteredProjects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'difficulty' | 'performance'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [teamSizeRange, setTeamSizeRange] = useState({ min: 1, max: 10 });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Extract unique values for filters
  const categories = useMemo(() => 
    Array.from(new Set(projects.map(p => p.category))).sort(), [projects]
  );
  
  const technologies = useMemo(() => 
    Array.from(new Set(projects.flatMap(p => p.technologies))).sort(), [projects]
  );
  
  const industries = useMemo(() => 
    Array.from(new Set(projects.map(p => p.industry))).sort(), [projects]
  );

  const statusOptions = ['completed', 'in-progress', 'planned'];
  const difficultyOptions = ['beginner', 'intermediate', 'advanced'];

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      // Search query filter
      const searchMatch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;

      // Technology filter
      const techMatch = selectedTechnologies.length === 0 || 
        selectedTechnologies.every(tech => project.technologies.includes(tech));

      // Status filter
      const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;

      // Difficulty filter
      const difficultyMatch = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;

      // Industry filter
      const industryMatch = selectedIndustry === 'all' || project.industry === selectedIndustry;

      // Featured filter
      const featuredMatch = !showFeaturedOnly || project.featured;

      // Team size filter
      const teamSizeMatch = project.teamSize >= teamSizeRange.min && project.teamSize <= teamSizeRange.max;

      // Date range filter
      const projectDate = new Date(project.startDate);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;
      const dateMatch = (!startDate || projectDate >= startDate) && 
        (!endDate || projectDate <= endDate);

      return searchMatch && categoryMatch && techMatch && statusMatch && 
             difficultyMatch && industryMatch && featuredMatch && teamSizeMatch && dateMatch;
    });

    // Sort projects
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case 'performance':
          const aScore = a.performance?.lighthouse || 0;
          const bScore = b.performance?.lighthouse || 0;
          comparison = aScore - bScore;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [
    projects, searchQuery, selectedCategory, selectedTechnologies, selectedStatus,
    selectedDifficulty, selectedIndustry, showFeaturedOnly, sortBy, sortOrder,
    teamSizeRange, dateRange
  ]);

  // Update parent component
  useEffect(() => {
    onFilteredProjects(filteredProjects);
    
    // Track filter usage
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        trackEvent('project_search', {
          query: searchQuery,
          resultsCount: filteredProjects.length,
        });
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [filteredProjects, onFilteredProjects, searchQuery]);

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTechnologies([]);
    setSelectedStatus('all');
    setSelectedDifficulty('all');
    setSelectedIndustry('all');
    setShowFeaturedOnly(false);
    setDateRange({ start: '', end: '' });
    setTeamSizeRange({ min: 1, max: 10 });
    setSortBy('date');
    setSortOrder('desc');
    
    trackEvent('project_filters_cleared');
  };

  const hasActiveFilters = searchQuery || 
    selectedCategory !== 'all' || 
    selectedTechnologies.length > 0 || 
    selectedStatus !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedIndustry !== 'all' ||
    showFeaturedOnly ||
    dateRange.start || 
    dateRange.end ||
    teamSizeRange.min > 1 ||
    teamSizeRange.max < 10;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="all">All Status</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="all">All Difficulties</option>
          {difficultyOptions.map(difficulty => (
            <option key={difficulty} value={difficulty}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </option>
          ))}
        </select>

        {/* Sort Options */}
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [sort, order] = e.target.value.split('-');
            setSortBy(sort as typeof sortBy);
            setSortOrder(order as typeof sortOrder);
          }}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="difficulty-asc">Easy First</option>
          <option value="difficulty-desc">Hard First</option>
          <option value="performance-desc">Best Performance</option>
        </select>
      </div>

      {/* Secondary Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Featured Toggle */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showFeaturedOnly}
            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Featured only</span>
        </label>

        {/* Advanced Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm"
        >
          Advanced Filters
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            Clear All
          </button>
        )}

        {/* Results Count */}
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
          {filteredProjects.length} of {projects.length} projects
        </span>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 dark:border-gray-700 pt-6"
          >
            {/* Technologies Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {technologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => handleTechnologyToggle(tech)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTechnologies.includes(tech)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Industry
              </h4>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Project Start Date
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Team Size Filter */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Team Size
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Min: {teamSizeRange.min}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={teamSizeRange.min}
                    onChange={(e) => setTeamSizeRange(prev => ({ 
                      ...prev, 
                      min: parseInt(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Max: {teamSizeRange.max === 10 ? '10+' : teamSizeRange.max}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={teamSizeRange.max}
                    onChange={(e) => setTeamSizeRange(prev => ({ 
                      ...prev, 
                      max: parseInt(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-purple-900">×</button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-2 hover:text-blue-900">×</button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(selectedStatus)}`}>
                Status: {selectedStatus.replace('-', ' ')}
                <button onClick={() => setSelectedStatus('all')} className="ml-2 opacity-70 hover:opacity-100">×</button>
              </span>
            )}
            {selectedDifficulty !== 'all' && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getDifficultyColor(selectedDifficulty)}`}>
                Difficulty: {selectedDifficulty}
                <button onClick={() => setSelectedDifficulty('all')} className="ml-2 opacity-70 hover:opacity-100">×</button>
              </span>
            )}
            {selectedTechnologies.map(tech => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              >
                {tech}
                <button onClick={() => handleTechnologyToggle(tech)} className="ml-2 hover:text-green-900">×</button>
              </span>
            ))}
            {showFeaturedOnly && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
                Featured Only
                <button onClick={() => setShowFeaturedOnly(false)} className="ml-2 hover:text-yellow-900">×</button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;
