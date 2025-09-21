import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Your Portfolio',
  description: 'Read my latest blog posts about web development, machine learning, and more.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
