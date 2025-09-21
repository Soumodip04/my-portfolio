// Utility functions for the portfolio website

/**
 * Creates an intersection observer to detect when an element is visible in the viewport
 * @param callback Function to call when the element is visible
 * @param threshold Percentage of the element that needs to be visible to trigger the callback
 * @returns IntersectionObserver instance
 */
export const createIntersectionObserver = (
  callback: (isIntersecting: boolean) => void,
  threshold = 0.1
): IntersectionObserver => {
  return new IntersectionObserver(
    ([entry]) => {
      callback(entry.isIntersecting);
    },
    { threshold }
  );
};

/**
 * Formats a date string to a more readable format
 * @param dateString Date string in any valid format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

/**
 * Calculates reading time for a given text
 * @param text The text to calculate reading time for
 * @param wordsPerMinute Average reading speed in words per minute
 * @returns Reading time in minutes as a string
 */
export const calculateReadTime = (text: string, wordsPerMinute = 200): string => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

/**
 * Debounces a function call
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait = 300
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Scrolls to a section smoothly
 * @param sectionId ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Validates an email address
 * @param email Email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};