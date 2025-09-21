import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  );
}
