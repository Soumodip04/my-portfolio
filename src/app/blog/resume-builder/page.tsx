'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export default function ResumeBuilderBlog() {
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
              <span className="text-sm text-gray-500 dark:text-gray-400">April 3, 2024 · 6 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Creating a Resume Builder Web App – From Idea to Deployment
            </h1>
          </div>

          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <div className="absolute bottom-6 left-6 z-20 text-6xl">
              📄
            </div>
            <div className="absolute w-full h-full bg-gradient-to-br from-green-500 to-blue-600"></div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Building a Resume Builder Web Application: A Complete Development Journey</h1>
            <p><em>By Soumodip Das</em></p>

            <h2>Introduction: The Need for a Better Resume Builder</h2>
            <p>In today's competitive job market, having a professional, well-formatted resume is crucial. However, many existing resume builders are either expensive, limited in customization, or don't provide the flexibility modern job seekers need.</p>

            <p>This inspired me to create a comprehensive resume builder web application that offers multiple templates, real-time preview, and easy customization—all built with vanilla HTML, CSS, and JavaScript to ensure fast loading times and maximum compatibility.</p>

            <h2>Project Overview and Goals</h2>
            <p>The resume builder project aims to solve several key problems:</p>
            <ul>
              <li><strong>Accessibility:</strong> Free to use without subscription barriers</li>
              <li><strong>Customization:</strong> Multiple templates with easy personalization</li>
              <li><strong>User Experience:</strong> Intuitive interface with real-time preview</li>
              <li><strong>Export Options:</strong> High-quality PDF generation</li>
              <li><strong>Mobile Friendly:</strong> Responsive design for all devices</li>
            </ul>

            <h2>Technology Stack and Architecture</h2>
            <p>I chose a minimal but powerful tech stack to ensure broad compatibility and fast performance:</p>

            <h3>Frontend Technologies</h3>
            <ul>
              <li><strong>HTML5:</strong> Semantic markup for accessibility and SEO</li>
              <li><strong>CSS3:</strong> Modern styling with Flexbox and Grid</li>
              <li><strong>Vanilla JavaScript:</strong> No frameworks for maximum performance</li>
              <li><strong>Web APIs:</strong> Local Storage for data persistence</li>
            </ul>

            <h3>Core Features Implementation</h3>
            <CodeBlock language="html" code={`
<!-- Main Application Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Resume Builder</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-container">
        <!-- Navigation -->
        <nav class="navbar">
            <div class="nav-brand">
                <h1>ResumeBuilder Pro</h1>
            </div>
            <div class="nav-actions">
                <button id="saveBtn" class="btn btn-primary">Save</button>
                <button id="exportBtn" class="btn btn-success">Export PDF</button>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Form Section -->
            <div class="form-section">
                <div class="form-container">
                    <div class="tabs">
                        <button class="tab-btn active" data-tab="personal">Personal Info</button>
                        <button class="tab-btn" data-tab="experience">Experience</button>
                        <button class="tab-btn" data-tab="education">Education</button>
                        <button class="tab-btn" data-tab="skills">Skills</button>
                    </div>
                    
                    <!-- Tab Content -->
                    <div id="personal" class="tab-content active">
                        <!-- Personal Information Form -->
                    </div>
                </div>
            </div>

            <!-- Preview Section -->
            <div class="preview-section">
                <div class="template-selector">
                    <select id="templateSelect">
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="creative">Creative</option>
                    </select>
                </div>
                <div class="resume-preview" id="resumePreview">
                    <!-- Dynamic resume content -->
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
            `} />

            <h2>CSS Design System</h2>
            <p>I created a comprehensive design system with CSS custom properties for consistent theming:</p>

            <CodeBlock language="css" code={`
/* CSS Custom Properties for Design System */
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  
  --border-radius: 8px;
  --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Layout System */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  gap: 2rem;
  padding: 2rem;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Form Styling */
.form-container {
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  height: fit-content;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-secondary);
  transition: var(--transition);
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Resume Preview Styles */
.resume-preview {
  background: white;
  min-height: 11in;
  width: 8.5in;
  margin: 0 auto;
  box-shadow: var(--box-shadow);
  padding: 1in;
  font-family: 'Times New Roman', serif;
  line-height: 1.4;
}

.resume-header {
  text-align: center;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.resume-name {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.resume-contact {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.resume-section {
  margin-bottom: 1.5rem;
}

.resume-section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.25rem;
  margin-bottom: 0.75rem;
}

.experience-item {
  margin-bottom: 1rem;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.job-title {
  font-weight: bold;
  color: var(--text-primary);
}

.job-date {
  font-style: italic;
  color: var(--text-secondary);
}

.company-name {
  color: var(--primary-color);
  font-weight: 500;
}
            `} />

            <h2>JavaScript Application Logic</h2>
            <p>The core functionality is handled by a modular JavaScript system:</p>

            <CodeBlock language="javascript" code={`
// Resume Builder Application
class ResumeBuilder {
  constructor() {
    this.data = this.loadData();
    this.currentTemplate = 'modern';
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSavedData();
    this.updatePreview();
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Form inputs
    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', (e) => {
        this.updateData(e.target.name, e.target.value);
      });
    });

    // Template selection
    document.getElementById('templateSelect').addEventListener('change', (e) => {
      this.currentTemplate = e.target.value;
      this.updatePreview();
    });

    // Save and Export
    document.getElementById('saveBtn').addEventListener('click', () => {
      this.saveData();
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
      this.exportToPDF();
    });

    // Dynamic sections
    this.bindDynamicSections();
  }

  switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active');
  }

  updateData(field, value) {
    // Update data object
    const keys = field.split('.');
    let obj = this.data;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    
    obj[keys[keys.length - 1]] = value;
    
    // Update preview
    this.updatePreview();
    
    // Auto-save
    this.saveData();
  }

  updatePreview() {
    const previewContainer = document.getElementById('resumePreview');
    const template = this.getTemplate(this.currentTemplate);
    previewContainer.innerHTML = template;
  }

  getTemplate(templateName) {
    switch (templateName) {
      case 'modern':
        return this.generateModernTemplate();
      case 'classic':
        return this.generateClassicTemplate();
      case 'creative':
        return this.generateCreativeTemplate();
      default:
        return this.generateModernTemplate();
    }
  }

  generateModernTemplate() {
    const { personal, experience, education, skills } = this.data;
    
    return \`
      <div class="resume-header">
        <h1 class="resume-name">\${personal.fullName || 'Your Name'}</h1>
        <div class="resume-contact">
          <span>\${personal.email || 'email@example.com'}</span>
          <span>\${personal.phone || '(555) 123-4567'}</span>
          <span>\${personal.location || 'City, State'}</span>
        </div>
      </div>

      \${personal.summary ? \`
        <div class="resume-section">
          <h2 class="resume-section-title">Professional Summary</h2>
          <p>\${personal.summary}</p>
        </div>
      \` : ''}

      \${this.generateExperienceSection(experience)}
      \${this.generateEducationSection(education)}
      \${this.generateSkillsSection(skills)}
    \`;
  }

  generateExperienceSection(experience = []) {
    if (!experience.length) return '';
    
    return \`
      <div class="resume-section">
        <h2 class="resume-section-title">Professional Experience</h2>
        \${experience.map(exp => \`
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="job-title">\${exp.title}</div>
                <div class="company-name">\${exp.company}</div>
              </div>
              <div class="job-date">\${exp.startDate} - \${exp.endDate || 'Present'}</div>
            </div>
            \${exp.description ? \`<p>\${exp.description}</p>\` : ''}
            \${exp.achievements ? \`
              <ul>
                \${exp.achievements.split('\\n').map(achievement => 
                  achievement.trim() ? \`<li>\${achievement.trim()}</li>\` : ''
                ).join('')}
              </ul>
            \` : ''}
          </div>
        \`).join('')}
      </div>
    \`;
  }

  // Dynamic section management
  bindDynamicSections() {
    // Add experience button
    document.getElementById('addExperience').addEventListener('click', () => {
      this.addExperienceItem();
    });

    // Add education button
    document.getElementById('addEducation').addEventListener('click', () => {
      this.addEducationItem();
    });
  }

  addExperienceItem() {
    const container = document.getElementById('experienceContainer');
    const item = document.createElement('div');
    item.className = 'experience-form-item';
    item.innerHTML = \`
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Job Title</label>
          <input type="text" class="form-input" name="experience.title">
        </div>
        <div class="form-group">
          <label class="form-label">Company</label>
          <input type="text" class="form-input" name="experience.company">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input type="month" class="form-input" name="experience.startDate">
        </div>
        <div class="form-group">
          <label class="form-label">End Date</label>
          <input type="month" class="form-input" name="experience.endDate">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-input" name="experience.description" rows="3"></textarea>
      </div>
      <button type="button" class="btn btn-danger remove-item">Remove</button>
    \`;
    
    container.appendChild(item);
    this.bindItemEvents(item);
  }

  // Data persistence
  saveData() {
    localStorage.setItem('resumeData', JSON.stringify(this.data));
    this.showNotification('Resume saved successfully!', 'success');
  }

  loadData() {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : {
      personal: {},
      experience: [],
      education: [],
      skills: []
    };
  }

  // PDF Export functionality
  exportToPDF() {
    const element = document.getElementById('resumePreview');
    const opt = {
      margin: 0.5,
      filename: \`\${this.data.personal.fullName || 'Resume'}.pdf\`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf library
    html2pdf().set(opt).from(element).save();
    this.showNotification('PDF exported successfully!', 'success');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new ResumeBuilder();
});
            `} />

            <h2>Template System Implementation</h2>
            <p>I created multiple resume templates to cater to different industries and preferences:</p>

            <h3>Modern Template</h3>
            <p>Clean, minimalist design with accent colors and modern typography.</p>

            <h3>Classic Template</h3>
            <p>Traditional layout suitable for conservative industries like law and finance.</p>

            <h3>Creative Template</h3>
            <p>Bold design with unique layouts for creative professionals.</p>

            <CodeBlock language="javascript" code={`
generateCreativeTemplate() {
  const { personal, experience, education, skills } = this.data;
  
  return \`
    <div class="creative-resume">
      <div class="creative-header">
        <div class="creative-avatar">
          \${personal.initials || personal.fullName?.charAt(0) || 'A'}
        </div>
        <div class="creative-info">
          <h1 class="creative-name">\${personal.fullName || 'Your Name'}</h1>
          <p class="creative-title">\${personal.title || 'Professional Title'}</p>
          <div class="creative-contact">
            <span>📧 \${personal.email || 'email@example.com'}</span>
            <span>📱 \${personal.phone || '(555) 123-4567'}</span>
            <span>📍 \${personal.location || 'City, State'}</span>
          </div>
        </div>
      </div>
      
      <div class="creative-content">
        <div class="creative-sidebar">
          \${this.generateSkillsSection(skills, 'creative')}
          \${this.generateEducationSection(education, 'creative')}
        </div>
        <div class="creative-main">
          \${personal.summary ? \`
            <div class="creative-section">
              <h2 class="creative-section-title">About Me</h2>
              <p>\${personal.summary}</p>
            </div>
          \` : ''}
          \${this.generateExperienceSection(experience, 'creative')}
        </div>
      </div>
    </div>
  \`;
}
            `} />

            <h2>Responsive Design Implementation</h2>
            <p>The application is fully responsive with careful attention to mobile users:</p>

            <CodeBlock language="css" code={`
/* Mobile-first responsive design */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .form-container {
    margin-bottom: 2rem;
  }
  
  .resume-preview {
    width: 100%;
    min-width: unset;
    transform: scale(0.7);
    transform-origin: top center;
  }
  
  .tabs {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .tabs::-webkit-scrollbar {
    display: none;
  }
  
  .tab-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .resume-contact {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .experience-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-actions {
    width: 100%;
    justify-content: center;
  }
  
  .btn {
    flex: 1;
    max-width: 150px;
  }
}
            `} />

            <h2>Key Features and Functionality</h2>
            <h3>Real-time Preview</h3>
            <p>Users see changes instantly as they type, providing immediate feedback and allowing for quick iterations.</p>

            <h3>Data Persistence</h3>
            <p>All user data is automatically saved to localStorage, ensuring no work is lost during the session.</p>

            <h3>PDF Export</h3>
            <p>High-quality PDF generation using the html2pdf library with proper formatting and print optimization.</p>

            <h3>Multiple Templates</h3>
            <p>Three distinct template styles to suit different professional needs and personal preferences.</p>

            <h3>Dynamic Sections</h3>
            <p>Users can add multiple experience entries, education records, and skills with easy management.</p>

            <h2>Challenges and Solutions</h2>
            <h3>Challenge 1: PDF Generation Quality</h3>
            <p><strong>Problem:</strong> Initial PDF exports had poor formatting and cut-off content.</p>
            <p><strong>Solution:</strong> Implemented proper page sizing, optimized CSS for print media, and used html2pdf with custom configuration.</p>

            <h3>Challenge 2: Mobile Responsiveness</h3>
            <p><strong>Problem:</strong> The resume preview was difficult to use on mobile devices.</p>
            <p><strong>Solution:</strong> Created a responsive layout with touch-friendly interactions and optimized preview scaling.</p>

            <h3>Challenge 3: Data Management</h3>
            <p><strong>Problem:</strong> Managing complex nested data structures for dynamic sections.</p>
            <p><strong>Solution:</strong> Implemented a robust data binding system with dot notation for nested object updates.</p>

            <h2>Performance Optimizations</h2>
            <ul>
              <li><strong>Debounced Updates:</strong> Prevented excessive re-renders during typing</li>
              <li><strong>Efficient DOM Manipulation:</strong> Minimized direct DOM access</li>
              <li><strong>Lazy Loading:</strong> Templates are generated only when needed</li>
              <li><strong>CSS Optimization:</strong> Used CSS custom properties for dynamic theming</li>
              <li><strong>Minification:</strong> Compressed CSS and JavaScript for production</li>
            </ul>

            <h2>Future Enhancements</h2>
            <p>Planned features for the next version include:</p>
            <ul>
              <li>Cloud storage integration for cross-device access</li>
              <li>AI-powered content suggestions</li>
              <li>More template options and customization</li>
              <li>Import from LinkedIn and other platforms</li>
              <li>Collaborative editing features</li>
              <li>Analytics and tracking for resume performance</li>
              <li>Cover letter builder integration</li>
              <li>ATS (Applicant Tracking System) optimization</li>
            </ul>

            <h2>User Testing and Feedback</h2>
            <p>During development, I conducted user testing sessions that revealed valuable insights:</p>
            <ul>
              <li><strong>Simplicity is key:</strong> Users preferred clean, intuitive interfaces</li>
              <li><strong>Real-time feedback:</strong> Instant preview was the most appreciated feature</li>
              <li><strong>Mobile usage:</strong> Many users wanted to edit on mobile devices</li>
              <li><strong>Export quality:</strong> PDF output quality was critical for professional use</li>
            </ul>

            <h2>Deployment and Production</h2>
            <p>The application is deployed using modern web practices:</p>
            <ul>
              <li><strong>Static Hosting:</strong> Deployed on Netlify for fast global delivery</li>
              <li><strong>CDN Integration:</strong> Assets served through CDN for optimal performance</li>
              <li><strong>SSL Certificate:</strong> Secure HTTPS connection for user data protection</li>
              <li><strong>Performance Monitoring:</strong> Google Analytics and Core Web Vitals tracking</li>
            </ul>

            <h2>Conclusion</h2>
            <p>Building this resume builder has been an incredibly rewarding experience that taught me valuable lessons about user-centered design, performance optimization, and the power of vanilla JavaScript for creating efficient web applications.</p>

            <p>The project demonstrates that complex functionality doesn't always require heavy frameworks. Sometimes, the right combination of vanilla technologies can deliver exceptional user experiences while maintaining excellent performance and broad compatibility.</p>

            <p>Key takeaways from this project include:</p>
            <ul>
              <li>The importance of user feedback in shaping product features</li>
              <li>Performance optimization techniques for smooth user experiences</li>
              <li>Responsive design principles for multi-device compatibility</li>
              <li>Data management strategies for complex application state</li>
              <li>The value of progressive enhancement in web development</li>
            </ul>

            <p>Whether you're building your first web application or looking to understand how to create document generation tools, this project provides a solid foundation for understanding modern web development practices and user experience design.</p>

            <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                🚀 Try the Resume Builder
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Experience the full functionality and create your professional resume today!
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Soumodip04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
