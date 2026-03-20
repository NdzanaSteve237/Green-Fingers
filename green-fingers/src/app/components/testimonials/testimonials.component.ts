import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../models/product.model';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials-section" id="testimonials" data-parallax data-parallax-speed="0.04" data-parallax-clamp="20">
      <div class="container">
        <div class="section-header" data-animate>
          <span class="section-tag">Témoignages</span>
          <h2 class="section-title">Ce que disent nos clients</h2>
          <p class="section-subtitle">
            Des centaines de clients satisfaits qui font confiance à Green Fingers
          </p>
        </div>
        
        <div class="testimonials-marquee" aria-label="Témoignages clients">
          <div class="testimonials-track">
          <div class="testimonial-card" 
               [class.featured]="testimonial.featured"
               data-animate 
               *ngFor="let testimonial of scrollingTestimonials; let i = index">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            
            <div class="testimonial-author">
              <div class="author-avatar" [style.background]="testimonial.avatarColor">
                {{ testimonial.initials }}
              </div>
              <div class="author-info">
                <strong>{{ testimonial.author }}</strong>
                <span>{{ testimonial.location }}</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: (() => void)[] = [];

  testimonials: Testimonial[] = [
    {
      text: "La poudre de curcuma est exceptionnelle ! Je l'utilise tous les jours dans mes plats. La qualité est vraiment incomparable.",
      author: 'Marie Kamga',
      location: 'Cliente fidèle, Douala',
      initials: 'MK',
      avatarColor: '#E5A820'
    },
    {
      text: "Le cacao de Green Fingers est d'une pureté remarquable. Mes gâteaux n'ont jamais été aussi bons ! Toute ma famille est conquise.",
      author: 'Jean Djoufack',
      location: 'Pâtissier amateur, Yaoundé',
      initials: 'JD',
      avatarColor: '#6B3E1F',
      featured: true
    },
    {
      text: "La tisane de citronnelle est devenue mon rituel du soir. Je dors tellement mieux et me sens plus sereine. Merci Green Fingers !",
      author: 'Amina Fouda',
      location: 'Passionnée de bien-être, Bafoussam',
      initials: 'AF',
      avatarColor: '#4A9232'
    },
    {
      text: "Le gingembre Green Fingers a complètement relevé mes infusions et mes sauces. Le goût est puissant, naturel et la livraison a été impeccable.",
      author: 'Claudine Ndzié',
      location: 'Restauratrice, Ebolowa',
      initials: 'CN',
      avatarColor: '#E8854A'
    }
  ];

  get scrollingTestimonials(): Testimonial[] {
    return [...this.testimonials, ...this.testimonials];
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const root = this.host.nativeElement as HTMLElement;
      const elements = root.querySelectorAll('[data-animate]');
      elements.forEach((el: Element, index: number) => {
        const cleanup = this.animationService.observe(el as HTMLElement, {
          delay: index * 120,
          direction: 'up',
          distance: 35
        });
        this.cleanupFns.push(cleanup);
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }
}
