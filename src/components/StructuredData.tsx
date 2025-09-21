import React from 'react';

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'Organization' | 'Article' | 'BlogPosting';
  data: Record<string, unknown>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    return JSON.stringify(baseData, null, 2);
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: generateStructuredData()
      }}
    />
  );
};

// Person Schema for Portfolio
export const PersonSchema = () => (
  <StructuredData
    type="Person"
    data={{
      name: 'Soumodip Das',
      alternateName: 'Soumo',
      description: 'Python Developer, Machine Learning Enthusiast, and Full-Stack Coder',
      image: 'https://soumodip-portfolio.vercel.app/profile2_comp.png',
      url: 'https://soumodip-portfolio.vercel.app',
      sameAs: [
        'https://github.com/Soumodip04',
        'https://www.linkedin.com/in/imsoumodipdas/',
        'mailto:soumo.das2004@gmail.com'
      ],
      jobTitle: 'Software Developer',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'University (B.Tech CSE AIML)'
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Computer Science and Engineering (AIML)'
      },
      knowsAbout: [
        'Python Programming',
        'Machine Learning',
        'Web Development',
        'React',
        'Next.js',
        'TypeScript',
        'Full-Stack Development'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        addressCountry: 'India'
      }
    }}
  />
);

// Website Schema
export const WebSiteSchema = () => (
  <StructuredData
    type="WebSite"
    data={{
      name: 'Soumodip Das Portfolio',
      alternateName: 'Soumo Portfolio',
      url: 'https://soumodip-portfolio.vercel.app',
      description: 'Professional portfolio showcasing Python development, machine learning projects, and full-stack web applications',
      author: {
        '@type': 'Person',
        name: 'Soumodip Das'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://soumodip-portfolio.vercel.app/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }}
  />
);

// Organization Schema (for professional context)
export const OrganizationSchema = () => (
  <StructuredData
    type="Organization"
    data={{
      name: 'Soumodip Das - Software Development Services',
      alternateName: 'Soumo Dev',
      url: 'https://soumodip-portfolio.vercel.app',
      logo: 'https://soumodip-portfolio.vercel.app/profile2_comp.png',
      description: 'Professional software development services specializing in Python, Machine Learning, and Full-Stack Web Development',
      founder: {
        '@type': 'Person',
        name: 'Soumodip Das'
      },
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        addressCountry: 'India'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'soumo.das2004@gmail.com',
        contactType: 'Customer Service'
      }
    }}
  />
);
