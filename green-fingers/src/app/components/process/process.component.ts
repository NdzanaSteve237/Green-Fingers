import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="process-section" id="process" data-parallax data-parallax-speed="0.05" data-parallax-clamp="24">
      <!-- Parallax Background -->
      <div class="parallax-bg" #parallaxBg data-parallax data-parallax-speed="0.2" data-parallax-clamp="95"></div>
      <div class="process-overlay"></div>
      
      <div class="container process-inner">
        <div class="section-header light" data-animate>
          <span class="section-tag light">Notre Processus</span>
          <h2 class="section-title light">De la semence à la table</h2>
          <p class="section-subtitle light">
            Un processus rigoureux pour vous garantir des produits d'exception à chaque étape
          </p>
        </div>
        
        <div class="process-steps" #stepsContainer>
          <div class="process-step" data-animate *ngFor="let step of steps; let i = index">
            <div class="step-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" 
                   fill="none" stroke="currentColor" stroke-width="2">
                <path *ngIf="i === 0" d="M12 22V12"/>
                <path *ngIf="i === 0" d="M12 12C12 12 7 8 7 4c0 0 2.5 1 5 5"/>
                <path *ngIf="i === 0" d="M12 12C12 12 17 8 17 4c0 0-2.5 1-5 5"/>
                <circle *ngIf="i === 1" cx="12" cy="12" r="10"/>
                <path *ngIf="i === 1" d="M12 8v4l3 3"/>
                <polyline *ngIf="i === 2" points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                <path *ngIf="i === 3" d="M3 11l19-9-9 19-2-8-8-2z"/>
              </svg>
              <span class="step-num">{{ step.number }}</span>
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: (() => void)[] = [];

  steps = [
    {
      number: '01',
      title: 'Semence',
      description: 'Sélection rigoureuse de semences naturelles non-OGM, adaptées au terroir local'
    },
    {
      number: '02',
      title: 'Culture Bio',
      description: 'Cultivation biologique, sans pesticides ni engrais chimiques, dans nos champs'
    },
    {
      number: '03',
      title: 'Transformation',
      description: 'Transformation artisanale soigneuse pour préserver tous les nutriments et arômes'
    },
    {
      number: '04',
      title: 'Votre Table',
      description: 'Conditionnement soigné et livraison directe chez vous, frais et plein de bienfaits'
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      // Animation
      const root = this.host.nativeElement as HTMLElement;
      const elements = root.querySelectorAll('[data-animate]');
      elements.forEach((el: Element, index: number) => {
        const cleanup = this.animationService.observe(el as HTMLElement, {
          delay: index * 150,
          direction: 'up',
          distance: 40
        });
        this.cleanupFns.push(cleanup);
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }
}
