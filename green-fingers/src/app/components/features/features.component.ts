import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="features-section" id="features" data-parallax data-parallax-speed="0.03" data-parallax-clamp="18">
      <div class="container">
        <div class="section-header" data-animate>
          <span class="section-tag">Nos Atouts</span>
          <h2 class="section-title">Pourquoi choisir Green Fingers ?</h2>
          <p class="section-subtitle">
            Des produits d'exception, cultivés avec passion pour votre bien-être
          </p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-animate *ngFor="let feature of features; let i = index">
            <div class="feature-icon-wrap" [class]="feature.colorClass">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" 
                   fill="none" stroke="currentColor" stroke-width="2">
                <path *ngIf="feature.icon === 'leaf'" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline *ngIf="feature.icon === 'check'" points="20 6 9 17 4 12"/>
                <circle *ngIf="feature.icon === 'globe'" cx="12" cy="12" r="10"/>
                <path *ngIf="feature.icon === 'globe'" d="M2 12h20"/>
                <path *ngIf="feature.icon === 'globe'" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <rect *ngIf="feature.icon === 'truck'" x="1" y="3" width="15" height="13"/>
                <polygon *ngIf="feature.icon === 'truck'" points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle *ngIf="feature.icon === 'truck'" cx="5.5" cy="18.5" r="2.5"/>
                <circle *ngIf="feature.icon === 'truck'" cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: (() => void)[] = [];

  features = [
    {
      icon: 'leaf',
      title: '100% Naturel',
      description: 'Cultivés sans pesticides ni additifs chimiques, pour une santé préservée',
      colorClass: 'green'
    },
    {
      icon: 'check',
      title: 'Qualité Certifiée',
      description: 'Chaque lot est contrôlé pour vous garantir le meilleur de la nature',
      colorClass: 'gold'
    },
    {
      icon: 'globe',
      title: 'Traçabilité Totale',
      description: 'De la semence à votre table, nous traçons chaque étape de la production',
      colorClass: 'brown'
    },
    {
      icon: 'truck',
      title: 'Livraison Soignée',
      description: 'Commandez en ligne, recevez vos produits frais directement chez vous',
      colorClass: 'blue'
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const root = this.host.nativeElement as HTMLElement;
      const elements = root.querySelectorAll('[data-animate]');
      elements.forEach((el: Element, index: number) => {
        const cleanup = this.animationService.observe(el as HTMLElement, {
          delay: index * 100,
          direction: 'up',
          distance: 30
        });
        this.cleanupFns.push(cleanup);
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }
}
