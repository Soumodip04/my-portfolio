'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Skill } from '@/types';

const Skills = () => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();
  const controls = useAnimation();
  
  const skills: Skill[] = [
    // Core & ML
    { name: 'Python', level: 90, category: 'Core & ML', icon: '🐍' },
    { name: 'Machine Learning', level: 85, category: 'Core & ML', icon: '🤖' },
    { name: 'Deep Learning', level: 80, category: 'Core & ML', icon: '🧠' },
    { name: 'Data Analysis', level: 85, category: 'Core & ML', icon: '📊' },
    { name: 'Computer Vision', level: 75, category: 'Core & ML', icon: '👁️' },
    { name: 'NLP', level: 70, category: 'Core & ML', icon: '💬' },
    
    // Web Development
    { name: 'JavaScript', level: 85, category: 'Web Development', icon: '🟨' },
    { name: 'TypeScript', level: 80, category: 'Web Development', icon: '🔷' },
    { name: 'React', level: 85, category: 'Web Development', icon: '⚛️' },
    { name: 'Next.js', level: 80, category: 'Web Development', icon: '▲' },
    { name: 'HTML/CSS', level: 90, category: 'Web Development', icon: '🎨' },
    { name: 'Node.js', level: 75, category: 'Web Development', icon: '🟢' },
    
    // Tools & Databases
    { name: 'Git', level: 85, category: 'Tools & Databases', icon: '📝' },
    { name: 'Docker', level: 70, category: 'Tools & Databases', icon: '🐳' },
    { name: 'SQL', level: 80, category: 'Tools & Databases', icon: '🗄️' },
    { name: 'MongoDB', level: 75, category: 'Tools & Databases', icon: '🍃' },
    { name: 'AWS', level: 65, category: 'Tools & Databases', icon: '☁️' },
    { name: 'Firebase', level: 70, category: 'Tools & Databases', icon: '🔥' },
  ];

  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    }
  }, [isVisible, controls]);

  // Group skills by category
  const categories = [...new Set(skills.map((skill) => skill.category))];
  const skillsByCategory = categories.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6
      }
    })
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        delay: 0.5
      }
    })
  };
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-gray-50 dark:from-slate-800 dark:via-purple-900/20 dark:to-slate-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit built through hands-on experience and continuous learning
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillsByCategory.map(({ category, skills }, categoryIndex) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                className="h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 group"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Category Header */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {category}
                    </span>
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                </motion.div>

                {/* Skills List */}
                <div className="space-y-6">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      variants={skillVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      custom={skillIndex}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <motion.span
                          className="text-sm font-bold text-purple-700 dark:text-purple-400"
                          initial={{ opacity: 0 }}
                          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: skillIndex * 0.1 + 1 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 relative"
                            variants={progressVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            custom={skill.level}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/30 rounded-full"
                              animate={{
                                x: ["-100%", "100%"],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: skillIndex * 0.2
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Always Learning, Always Growing
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I'm constantly expanding my skill set and exploring new technologies. Currently diving deeper into cloud architecture, serverless computing, and advanced AI/ML techniques.
            </p>
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span>View My Projects</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;