import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from './services/scroll.service';
import { AnimationService } from './services/animation.service';

// Components
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { ProductsComponent } from './components/products/products.component';
import { CartSidebarComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { ProcessComponent } from './components/process/process.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    ProductsComponent,
    CartSidebarComponent,
    AboutComponent,
    ProcessComponent,
    TestimonialsComponent,
    BlogComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: Array<() => void> = [];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
    parallaxElements.forEach((element) => {
      const speed = Number.parseFloat(element.dataset['parallaxSpeed'] ?? '0.2');
      const axis = element.dataset['parallaxAxis'] === 'x' ? 'x' : 'y';
      const reverse = element.dataset['parallaxReverse'] === 'true';
      const clamp = Number.parseFloat(element.dataset['parallaxClamp'] ?? '80');

      const cleanup = this.animationService.parallax(element, {
        speed: Number.isFinite(speed) ? speed : 0.2,
        axis,
        reverse,
        clamp: Number.isFinite(clamp) ? clamp : 80
      });

      this.cleanupFns.push(cleanup);
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach((cleanup) => cleanup());
    this.cleanupFns = [];
  }

  scrollToProducts(): void {
    this.scrollService.scrollToSection('products');
  }
}
