'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    section: string;
    tags: string[];
  };
  product?: {
    name: string;
    price: string;
    currency: string;
    availability: string;
  };
}

const SEO: React.FC<SEOProps> = ({
  title = 'Soumodip Das - Full Stack Developer & ML Enthusiast',
  description = 'Passionate full-stack developer and machine learning enthusiast creating innovative web solutions. Expertise in React, Next.js, Python, and modern web technologies.',
  keywords = [
    'Soumodip Das',
    'Full Stack Developer',
    'Machine Learning',
    'React Developer',
    'Next.js',
    'Python',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'JavaScript',
    'TypeScript',
    'AI',
    'Data Science',
  ],
  image = '/og-image.jpg',
  article,
  product,
}) => {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soumodip-portfolio.vercel.app';
  const fullUrl = `${siteUrl}${pathname}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Soumodip Das',
    jobTitle: 'Full Stack Developer',
    description: description,
    url: siteUrl,
    image: `${siteUrl}${image}`,
    sameAs: [
      'https://github.com/Soumodip04',
      'https://www.linkedin.com/in/imsoumodipdas/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'India',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Your University Name',
    },
    knowsAbout: [
      'Web Development',
      'Machine Learning',
      'JavaScript',
      'Python',
      'React',
      'Next.js',
      'Data Science',
      'Artificial Intelligence',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationLocation: {
        '@type': 'City',
        name: 'Kolkata',
      },
      skills: 'JavaScript, Python, React, Next.js, Machine Learning, Data Science',
    },
  };

  const articleStructuredData = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: `${siteUrl}${image}`,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Person',
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Soumodip Das',
      url: siteUrl,
    },
    articleSection: article.section,
    keywords: article.tags.join(', '),
  } : null;

  const productStructuredData = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: description,
    image: `${siteUrl}${image}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
    },
  } : null;

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Soumodip Das Portfolio',
    url: siteUrl,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Soumodip Das',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Soumodip Das" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en-US" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Soumodip Das Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@das_soumodip04" />
      <meta name="twitter:site" content="@das_soumodip04" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* PWA Meta Tags */}
      <meta name="application-name" content="Soumodip Portfolio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Soumodip Portfolio" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Links */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#8b5cf6" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      {articleStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
      )}
      {productStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
      )}

      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS Prefetch for external domains */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Head>
  );
};

export default SEO;
