import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about-section" id="about" data-parallax data-parallax-speed="0.06" data-parallax-clamp="26">
      <div class="container">
        <div class="about-grid">
          <div class="about-visual-col" data-animate>
            <div class="about-img-frame">
              <div class="about-img-placeholder">
                <div class="about-img-inner">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
                    <circle cx="100" cy="100" r="90" fill="rgba(45,106,31,0.12)"/>
                    <path d="M100 20 C60 40 30 80 40 120 C50 160 90 180 100 180 C110 180 150 160 160 120 C170 80 140 40 100 20Z" fill="rgba(74,146,50,0.25)"/>
                    <path d="M100 170 C100 100 70 80 50 60" fill="none" stroke="#2D6A1F" stroke-width="3" stroke-linecap="round"/>
                    <path d="M100 140 Q120 120 140 110" fill="none" stroke="#4A9232" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M100 120 Q80 100 60 95" fill="none" stroke="#4A9232" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="100" cy="50" r="20" fill="#E5A820" opacity="0.85"/>
                  </svg>
                  <span class="about-img-label">GREEN FINGERS</span>
                </div>
              </div>
              <div class="about-badge-founded">
                <strong>2024</strong>
                <span>Fondée</span>
              </div>
              <div class="about-badge-products">
                <strong>4+</strong>
                <span>Produits</span>
              </div>
            </div>
          </div>
          
          <div class="about-content-col" data-animate>
            <span class="section-tag">Notre Histoire</span>
            <h2 class="section-title">Une passion pour la nature et le bien-être</h2>
            
            <p class="about-lead">
              Green Fingers est née d'une passion profonde pour l'agriculture durable et les produits naturels. 
              Nous croyons que la nature offre tout ce dont nous avons besoin pour vivre sainement.
            </p>
            
            <p class="about-body">
              Depuis notre création, nous nous engageons à vous proposer des produits agricoles transformés 
              de la plus haute qualité — cultivés localement, transformés artisanalement, livrés avec soin.
            </p>
            
            <div class="about-values">
              <div class="value-row">
                <div class="value-dot"></div>
                <span>Agriculture responsable et 100% durable</span>
              </div>
              <div class="value-row">
                <div class="value-dot"></div>
                <span>Transformation artisanale préservant tous les nutriments</span>
              </div>
              <div class="value-row">
                <div class="value-dot"></div>
                <span>Traçabilité complète de la semence à la table</span>
              </div>
              <div class="value-row">
                <div class="value-dot"></div>
                <span>Engagement fort envers notre communauté locale</span>
              </div>
            </div>
            
            <button class="btn-primary" (click)="scrollToContact()">
              Contactez-nous →
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly scrollService = inject(ScrollService);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: (() => void)[] = [];

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const root = this.host.nativeElement as HTMLElement;
      const elements = root.querySelectorAll('[data-animate]');
      elements.forEach((el: Element, index: number) => {
        const cleanup = this.animationService.observe(el as HTMLElement, {
          delay: index * 150,
          direction: index % 2 === 0 ? 'up' : 'right',
          distance: 40
        });
        this.cleanupFns.push(cleanup);
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }
}
