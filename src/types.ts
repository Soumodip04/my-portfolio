// Define common types used across the application

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github?: string;
  demo?: string;
  link?: string;
  technologies: string[];
  features?: string[];
  challenges?: string;
  liveUrl?: string;
}

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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}