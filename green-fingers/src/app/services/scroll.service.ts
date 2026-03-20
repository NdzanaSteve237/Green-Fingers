import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ParallaxConfig {
  speed: number;
  direction: 'vertical' | 'horizontal';
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  // Signals
  readonly scrollY = signal(0);
  readonly scrollProgress = signal(0);
  readonly activeSection = signal('home');
  readonly isScrolled = signal(false);

  private rafId: number | null = null;
  private lastScrollY = 0;
  private observers: IntersectionObserver[] = [];

  constructor() {
    if (this.isBrowser) {
      this.initScrollListener();
      this.initSectionObserver();
    }
  }

  private initScrollListener(): void {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        this.rafId = requestAnimationFrame(() => {
          const y = window.scrollY;
          this.scrollY.set(y);
          this.isScrolled.set(y > 60);
          
          // Calculate scroll progress (0-1)
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          this.scrollProgress.set(docHeight > 0 ? y / docHeight : 0);
          
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  private initSectionObserver(): void {
    const sections = ['home', 'products', 'about', 'blog', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    this.observers.push(observer);
  }

  scrollToSection(sectionId: string, offset = 80): void {
    if (!this.isBrowser) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  // Parallax calculation
  getParallaxOffset(element: HTMLElement, speed: number = 0.5): number {
    if (!this.isBrowser) return 0;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distance = elementCenter - viewportCenter;
    
    return distance * speed * -0.1;
  }

  destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.observers.forEach(obs => obs.disconnect());
    this.observers = [];
  }
}
