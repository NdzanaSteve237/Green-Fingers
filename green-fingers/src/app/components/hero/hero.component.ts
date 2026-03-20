import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero" data-parallax data-parallax-speed="0.04" data-parallax-clamp="22">
      <!-- Parallax Background Layers -->
      <div class="parallax-layer parallax-bg-slow" #parallaxBg data-parallax data-parallax-speed="0.12" data-parallax-clamp="120"></div>
      <div class="parallax-layer parallax-bg-mid" #parallaxMid data-parallax data-parallax-speed="0.2" data-parallax-clamp="150"></div>
      <div class="hero-overlay"></div>
      
      <!-- Floating Elements -->
      <div class="floating-leaf leaf-1" #leaf1 data-parallax data-parallax-speed="0.18" data-parallax-axis="x" data-parallax-clamp="24"></div>
      <div class="floating-leaf leaf-2" #leaf2 data-parallax data-parallax-speed="0.14" data-parallax-reverse="true" data-parallax-clamp="36"></div>
      <div class="floating-leaf leaf-3" #leaf3 data-parallax data-parallax-speed="0.11" data-parallax-axis="x" data-parallax-reverse="true" data-parallax-clamp="20"></div>
      
      <div class="hero-content container" #heroContent data-parallax data-parallax-speed="0.07" data-parallax-reverse="true" data-parallax-clamp="32">
        <div class="hero-badge" #badge>
          <span class="badge-icon">&#127807;</span>
          <span>100% Naturel</span>
          <span class="sep">•</span>
          <span>Artisanal</span>
          <span class="sep">•</span>
          <span>Local</span>
        </div>
        
        <h1 class="hero-title" #title>
          <span class="hero-brand">GREEN FINGERS</span>
          <span class="hero-tagline">De la semence à la table</span>
        </h1>
        
        <p class="hero-desc" #desc>
          Des produits agricoles transformés avec passion, cultivés localement 
          pour vous apporter le meilleur de la nature directement dans votre assiette.
        </p>
        
        <div class="hero-cta-row" #cta>
          <button class="btn-primary btn-hero" (click)="scrollToProducts()">
            Découvrir nos produits
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <button class="btn-outline-white btn-hero" (click)="scrollToAbout()">
            Notre histoire
          </button>
        </div>
        
        <div class="hero-stats" #stats>
          <div class="stat-item">
            <span class="stat-num" data-target="100">100%</span>
            <span class="stat-lbl">Naturel</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-num" data-target="4">4+</span>
            <span class="stat-lbl">Produits</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-num">Local</span>
            <span class="stat-lbl">Production</span>
          </div>
        </div>
      </div>
      
      <div class="hero-scroll-cue" #scrollCue>
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span class="scroll-text">Scroll</span>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly scrollService = inject(ScrollService);
  private readonly animationService = inject(AnimationService);
  
  private cleanupFns: (() => void)[] = [];

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.initScrollAnimations();
    }
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
  }

  private initScrollAnimations(): void {
    // Staggered entrance animations
    const root = this.host.nativeElement as HTMLElement;
    const animatedElements = root.querySelectorAll('[data-animate]');
    animatedElements.forEach((el: Element, index: number) => {
      const cleanup = this.animationService.observe(el as HTMLElement, {
        delay: index * 150,
        direction: 'up',
        distance: 40
      });
      this.cleanupFns.push(cleanup);
    });
  }

  scrollToProducts(): void {
    this.scrollService.scrollToSection('products');
  }

  scrollToAbout(): void {
    this.scrollService.scrollToSection('about');
  }
}
