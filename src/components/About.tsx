'use client';

import Image from 'next/image';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const About = () => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-300/50 dark:hover:shadow-purple-400/30">
              <Image
                src="/profile4.png"
                alt="Soumodip Das Profile"
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
            </div>
          </div>

          {/* About Content */}
          <div className="md:w-2/3">
            <p className="text-lg mb-6 text-gray-800 dark:text-gray-300 leading-relaxed">
              Hi there! I'm a passionate B.Tech CSE (AIML) student with a strong interest in machine learning, web development, and solving real-world problems through technology.
            </p>
            <p className="text-lg mb-8 text-gray-800 dark:text-gray-300 leading-relaxed">
              My journey in tech started with Python programming, which led me to explore various domains including data science, web development, and AI applications. I enjoy building projects that combine these interests.
            </p>

            {/* Experience Timeline */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Experience
                </span>
              </h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-purple-300 dark:from-purple-400 dark:to-purple-600"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">Generative AI Intern</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400 font-medium mb-3">AI WALLAH • 07/2025 - 08/2025</p>
                    <p className="text-gray-700 dark:text-gray-300">Generative AI Internship focusing on model development. Worked on generative AI models (LLMs) and deployment of generative AI applications.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-purple-300 dark:from-purple-400 dark:to-purple-600"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">Intern</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400 font-medium mb-3">AICTE-Shell-Edunet • 02/2025 - 03/2025</p>
                    <p className="text-gray-700 dark:text-gray-300">Internship focused on AI and data analytics projects. 4-week internship in AI and Data Analytics with dashboard building and model development.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-purple-300 dark:from-purple-400 dark:to-purple-600"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">ML Intern</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400 font-medium mb-3">Bharat Intern • 01/2024 - 02/2024</p>
                    <p className="text-gray-700 dark:text-gray-300">ML Internship concentrating on model creation. Developed regression and classification ML models using scikit-learn.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">Open Source Contributor</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400 font-medium mb-3">GSSOC 2024 • 2024</p>
                    <p className="text-gray-700 dark:text-gray-300">Open Source Contributor focused on machine learning. Contributed ML solutions and documentation to open source repositories.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;