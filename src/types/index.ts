// Common interfaces for the portfolio website

// Project interface
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  tags: string[];
  demo: string;
  category: string;
  technologies: string[];
  features?: string[];
  challenges?: string;
  liveUrl?: string;
  githubUrl?: string;
}

// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  link?: string;
}

// Skill interface
export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

// Form data interface
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Social link interface
export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}

// Section visibility interface
export interface SectionVisibility {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}