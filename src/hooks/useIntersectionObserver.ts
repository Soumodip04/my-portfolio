'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

/**
 * Custom hook for detecting when an element is visible in the viewport
 * @param options IntersectionObserver options
 * @returns [ref, isVisible] - ref to attach to the element, boolean indicating if the element is visible
 */
const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] => {
  const { threshold = 0.1, rootMargin = '0px', root = null } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, root]);

  return [ref as RefObject<T>, isVisible];
};

export default useIntersectionObserver;