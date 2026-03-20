import { Injectable, signal, inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

export interface AnimationConfig {
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
}

export interface ParallaxConfig {
  speed?: number;
  axis?: 'y' | 'x';
  reverse?: boolean;
  clamp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly renderer: Renderer2;
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private observers: Map<Element, IntersectionObserver> = new Map();

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  // Observe element for scroll-triggered animations
  observe(element: HTMLElement, config: AnimationConfig = {}): () => void {
    if (!this.isBrowser) return () => {};

    const {
      direction = 'up',
      delay = 0,
      duration = 600,
      distance = 30,
      threshold = 0.1,
      once = true
    } = config;

    // Set initial state
    this.setInitialStyles(element, direction, distance);
    
    // Add delay as CSS variable
    this.renderer.setStyle(element, '--animation-delay', `${delay}ms`);
    this.renderer.setStyle(element, '--animation-duration', `${duration}ms`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Small delay to ensure browser processes the initial styles
            setTimeout(() => {
              this.renderer.addClass(element, 'animate-in');
              this.renderer.setStyle(element, 'opacity', '1');
              this.renderer.setStyle(element, 'transform', 'translate3d(0, 0, 0)');
            }, 10);
            
            if (once) {
              observer.unobserve(element);
              this.observers.delete(element);
            }
          } else if (!once) {
            this.renderer.removeClass(element, 'animate-in');
            this.setInitialStyles(element, direction, distance);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    this.observers.set(element, observer);

    // Return cleanup function
    return () => {
      observer.disconnect();
      this.observers.delete(element);
    };
  }

  // Stagger animation for multiple elements
  stagger(container: HTMLElement, selector: string, baseDelay = 100): (() => void)[] {
    if (!this.isBrowser) return [];

    const elements = container.querySelectorAll(selector);
    const cleanupFns: (() => void)[] = [];

    elements.forEach((el, index) => {
      const cleanup = this.observe(el as HTMLElement, {
        delay: index * baseDelay,
        direction: 'up'
      });
      cleanupFns.push(cleanup);
    });

    return cleanupFns;
  }

  private setInitialStyles(element: HTMLElement, direction: AnimationDirection, distance: number): void {
    const transforms: Record<AnimationDirection, string> = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      scale: `scale(0.9)`,
      fade: 'none'
    };

    this.renderer.setStyle(element, 'transform', transforms[direction] || transforms.up);
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transition', 
      `transform var(--animation-duration, 600ms) cubic-bezier(0.34, 1.56, 0.64, 1) var(--animation-delay, 0ms), ` +
      `opacity var(--animation-duration, 600ms) ease var(--animation-delay, 0ms)`
    );
    this.renderer.setStyle(element, 'will-change', 'transform, opacity');
  }

  // Parallax effect for specific elements
  parallax(element: HTMLElement, config: ParallaxConfig = {}): () => void {
    if (!this.isBrowser) return () => {};

    const {
      speed = 0.2,
      axis = 'y',
      reverse = false,
      clamp = 80
    } = config;

    let rafId: number;
    let ticking = false;

    const updatePosition = () => {
      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const delta = elementCenter - viewportCenter;
      const signedSpeed = reverse ? -Math.abs(speed) : Math.abs(speed);
      const offset = Math.max(-clamp, Math.min(clamp, delta * signedSpeed * -0.2));

      if (axis === 'x') {
        this.renderer.setStyle(element, 'transform', `translate3d(${offset}px, 0, 0)`);
      } else {
        this.renderer.setStyle(element, 'transform', `translate3d(0, ${offset}px, 0)`);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }

  // Clean up all observers
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}
