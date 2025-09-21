'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogIndex() {
  // This is just a placeholder page that will redirect to the blog section on the homepage
  // You could expand this into a full blog index page in the future
  
  useEffect(() => {
    window.location.href = '/#blog';
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold mb-4">Redirecting to Blog Section...</h1>
        <p className="mb-4">Please wait, or <Link href="/#blog" className="text-purple-600 dark:text-purple-400 hover:underline">click here</Link> to go to the blog section.</p>
      </div>
    </div>
  );
}
