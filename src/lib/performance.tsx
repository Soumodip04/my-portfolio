'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoadedTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<PerformanceMetrics> = {};

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public initializeMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Page Load Time
    window.addEventListener('load', () => {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      this.metrics.pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
      this.metrics.domContentLoadedTime = navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart;
    });

    // Core Web Vitals
    this.measureCoreWebVitals();

    // Resource Performance
    this.monitorResources();

    // User Interaction Performance
    this.monitorUserInteractions();

    // Memory Usage
    this.monitorMemoryUsage();

    // Error Tracking
    this.setupErrorTracking();
  }

  private measureCoreWebVitals(): void {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.firstContentfulPaint = entry.startTime;
          this.sendMetric('FCP', entry.startTime);
        }
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
      this.sendMetric('LCP', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value || 0;
        }
      }
      this.metrics.cumulativeLayoutShift = clsValue;
      this.sendMetric('CLS', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fidEntry = entry as PerformanceEntry & { processingStart?: number };
        this.metrics.firstInputDelay = (fidEntry.processingStart || 0) - entry.startTime;
        this.sendMetric('FID', this.metrics.firstInputDelay);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  }

  private monitorResources(): void {
    const resourceObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Track slow resources
        if (resource.duration > 1000) {
          trackEvent('slow_resource', {
            name: resource.name,
            duration: resource.duration,
            size: resource.transferSize,
            type: resource.initiatorType,
          });
        }

        // Track large resources
        if (resource.transferSize > 500000) { // 500KB
          trackEvent('large_resource', {
            name: resource.name,
            size: resource.transferSize,
            type: resource.initiatorType,
          });
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
  }

  private monitorUserInteractions(): void {
    // Track interaction delays
    let interactionStart = 0;
    
    document.addEventListener('click', () => {
      interactionStart = performance.now();
    });

    document.addEventListener('keydown', () => {
      interactionStart = performance.now();
    });

    // Measure time to next paint after interaction
    const interactionObserver = new PerformanceObserver(() => {
      if (interactionStart > 0) {
        const delay = performance.now() - interactionStart;
        if (delay > 100) { // Only track if delay is significant
          trackEvent('interaction_delay', { delay });
        }
        interactionStart = 0;
      }
    });
    interactionObserver.observe({ entryTypes: ['paint'] });
  }

  private monitorMemoryUsage(): void {
    const memoryPerformance = performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };

    if (memoryPerformance.memory) {
      setInterval(() => {
        const memory = memoryPerformance.memory!;
        const memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
        };

        // Alert if memory usage is high
        if (memoryUsage.percentage > 80) {
          trackEvent('high_memory_usage', memoryUsage);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  private setupErrorTracking(): void {
    window.addEventListener('error', (event) => {
      trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      trackEvent('unhandled_promise_rejection', {
        reason: event.reason,
        promise: event.promise.toString(),
      });
    });
  }

  private sendMetric(name: string, value: number): void {
    trackEvent('core_web_vital', {
      metric: name,
      value: value,
      rating: this.getRating(name, value),
    });
  }

  private getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public generateReport(): void {
    const report = {
      ...this.metrics,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection: (navigator as Navigator & {
        connection?: {
          effectiveType: string;
          downlink: number;
          rtt: number;
        };
      }).connection ? {
        effectiveType: (navigator as Navigator & {
          connection: {
            effectiveType: string;
            downlink: number;
            rtt: number;
          };
        }).connection.effectiveType,
        downlink: (navigator as Navigator & {
          connection: {
            effectiveType: string;
            downlink: number;
            rtt: number;
          };
        }).connection.downlink,
        rtt: (navigator as Navigator & {
          connection: {
            effectiveType: string;
            downlink: number;
            rtt: number;
          };
        }).connection.rtt,
      } : null,
    };

    trackEvent('performance_report', report);
  }
}

// React Hook for Performance Monitoring
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Only run performance monitoring in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const monitor = PerformanceMonitor.getInstance();
    monitor.initializeMonitoring();

    // Generate report after 5 seconds
    const reportTimer = setTimeout(() => {
      monitor.generateReport();
    }, 5000);

    return () => {
      clearTimeout(reportTimer);
    };
  }, []);

  return {
    getMetrics: () => PerformanceMonitor.getInstance().getMetrics(),
    generateReport: () => PerformanceMonitor.getInstance().generateReport(),
  };
};

export default PerformanceMonitor;
