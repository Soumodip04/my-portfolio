import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  type?: string;
  image?: string;
  url?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const defaultSEO: SEOProps = {
  title: 'Soumodip Das - Python Developer | ML Enthusiast | Full-Stack Coder',
  description: 'B.Tech CSE (AIML) student passionate about solving real-world problems with Python, Machine Learning, and Full-Stack Development. Explore my projects and get in touch!',
  keywords: [
    'Soumodip Das',
    'Python Developer',
    'Machine Learning',
    'Full Stack Developer',
    'AIML',
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Software Engineer',
    'Computer Science',
    'Kolkata'
  ],
  author: 'Soumodip Das',
  type: 'website',
  image: '/profile2_comp.png',
  url: 'https://soumodip-portfolio.vercel.app'
};

export function generateMetadata(seo: SEOProps = {}): Metadata {
  const {
    title = defaultSEO.title,
    description = defaultSEO.description,
    keywords = defaultSEO.keywords,
    author = defaultSEO.author,
    type = defaultSEO.type,
    image = defaultSEO.image,
    url = defaultSEO.url,
    publishedTime,
    modifiedTime
  } = { ...defaultSEO, ...seo };

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    authors: [{ name: author || 'Soumodip Das' }],
    creator: author,
    publisher: author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(url || 'https://soumodip-portfolio.vercel.app'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Soumodip Das Portfolio',
      images: [
        {
          url: image || '/profile2_comp.png',
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type as 'website' | 'article',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || '/profile2_comp.png'],
      creator: '@soumodip_das',
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  };
}
