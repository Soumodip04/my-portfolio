# Portfolio Website

A modern and responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

![Portfolio Preview](public/profile-placeholder.svg)

## 🚀 Live Demo

Visit the live site at: [https://your-portfolio-url.com](https://your-portfolio-url.com)

## 🛠️ Technologies Used

- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - For state management (theme toggle)
- **Intersection Observer API** - For scroll animations

## ✨ Features

- 🌓 Dark/Light mode toggle with persistence
- ⚡ Smooth animations and transitions
- 📱 Fully responsive design
- 🔄 Interactive components
- 📝 Contact form
- 🖼️ Project showcase
- 📊 Skills visualization
- 📰 Blog section

## 🏗️ Project Structure

```
portfolio/
├── public/               # Static assets
│   ├── projects/         # Project images
│   └── profile.jpg       # Profile photo
│   └── resume.pdf        # Resume file
├── src/
│   ├── app/              # App router
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main page
│   ├── components/       # UI components
│   │   ├── About.tsx     
│   │   ├── Blog.tsx      
│   │   ├── Contact.tsx   
│   │   ├── Footer.tsx    
│   │   ├── Hero.tsx      
│   │   ├── Navbar.tsx    
│   │   ├── Projects.tsx  
│   │   └── Skills.tsx    
│   ├── context/          # React Context
│   │   └── ThemeContext.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useIntersectionObserver.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── utils/            # Helper functions
└── ...config files       # Configuration files
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Personal Information

1. **Profile Photo**: Replace `/public/profile.jpg` with your own photo
2. **Resume**: Replace `/public/resume.pdf` with your resume
3. **Personal Details**: Update the following files with your information:
   - `src/components/Hero.tsx`: Update name, title, and social links
   - `src/components/About.tsx`: Update your bio
   - `src/components/Footer.tsx`: Update contact details

### Projects

Edit the projects array in `src/components/Projects.tsx` to showcase your own work:

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Project description',
    image: '/projects/your-project-image.jpg',
    tags: ['React', 'Node.js', 'TypeScript'],
    github: 'https://github.com/yourusername/project',
    demo: 'https://yourproject.com',
    category: 'Web Development',
  },
  // Add more projects...
];
```

### Skills

Edit the skills array in `src/components/Skills.tsx` to showcase your skills:

```typescript
const skills: Skill[] = [
  { name: 'JavaScript', level: 90, category: 'Web Development' },
  { name: 'React', level: 85, category: 'Web Development' },
  // Add more skills...
];
```

## 🧩 Known Issues & Future Improvements

### Current Issues:

1. **Type Mismatch in Projects Component**:
   - Projects component uses `tags` but the interface defines `technologies`

2. **Contact Form**:
   - Contact form currently uses a simulation instead of a real backend

3. **Missing Assets**:
   - Ensure you've added your profile photo at `/public/profile.jpg`
   - Ensure you've added your resume at `/public/resume.pdf`

### Future Improvements:

1. **Connect the Contact Form to a Backend**:
   - Implement integration with services like EmailJS, FormSpree, or a custom API

2. **Add Real Project Images**:
   - Replace the SVG placeholders with actual project screenshots

3. **Fix Type Definitions**:
   - Align type definitions with actual component usage

4. **Add Content Animations**:
   - Enhance UX with subtle animations using Framer Motion

5. **SEO Improvements**:
   - Add OpenGraph tags and structured data

6. **Implement Real Blog Functionality**:
   - Connect to a headless CMS or implement MDX-based blog

7. **Improve Mobile Navigation**:
   - Enhance mobile menu UX

8. **Add Skill & Project Filtering**:
   - Implement better filtering options

9. **Add Loading States**:
   - Improve initial page load experience

10. **Improve Dark Mode Toggle**:
    - Add smooth transition animations for theme changes

11. **Implement Error Handling**:
    - Add proper error states for all user interactions

## 📱 Technical Improvements

1. **Performance Optimization**:
   - Implement code splitting and lazy loading
   - Optimize images and assets

2. **Accessibility**:
   - Add proper ARIA attributes
   - Ensure keyboard navigation
   - Add skip-to-content links

3. **Testing**:
   - Add unit tests for components
   - Add end-to-end testing

4. **Analytics**:
   - Implement analytics for user engagement tracking

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [unDraw](https://undraw.co/) for SVG illustrations

---

Created with ❤️ by Soumodip Das
