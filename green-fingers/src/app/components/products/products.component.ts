import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ScrollService } from '../../services/scroll.service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="products-section" id="products" data-parallax data-parallax-speed="0.04" data-parallax-clamp="20">
      <div class="container">
        <div class="section-header" data-animate>
          <span class="section-tag">Nos Produits</span>
          <h2 class="section-title">Une sélection d'exception</h2>
          <p class="section-subtitle">
            Des produits soigneusement cultivés et transformés pour préserver toutes leurs vertus naturelles
          </p>
        </div>
        
        <div class="products-grid">
          <div class="product-card" data-animate *ngFor="let product of products; let i = index">
            <div class="product-badge" *ngIf="product.badge" [class]="'badge-' + product.color">
              {{ product.badge }}
            </div>
            
            <div class="product-visual" [class]="'visual-' + product.color">
              <div class="product-pattern"></div>
              <div class="product-icon-large">{{ product.icon }}</div>
              <div class="product-weight-tag">{{ product.weight }}</div>
            </div>
            
            <div class="product-body">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-desc">{{ product.description }}</p>
              
              <div class="product-benefits">
                <span class="benefit-pill" *ngFor="let benefit of product.benefits">
                  {{ benefit }}
                </span>
              </div>
              
              <div class="product-footer">
                <div class="product-price-block">
                  <span class="product-price">{{ formatPrice(product.price) }}</span>
                  <span class="product-unit">/ {{ product.weight }}</span>
                </div>
                <button class="btn-add-cart" (click)="addToCart(product)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="products-cta-row" data-animate>
          <button class="btn-primary btn-large" (click)="scrollToContact()">
            Commander en gros — Contactez-nous
          </button>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly cartService = inject(CartService);
  private readonly scrollService = inject(ScrollService);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: (() => void)[] = [];

  products: Product[] = [
    {
      id: 1,
      name: 'Poudre de Curcuma',
      price: 2500,
      unit: 'FCFA',
      weight: '100g',
      description: 'Notre curcuma bio soigneusement cultivé et transformé pour préserver toutes ses propriétés anti-inflammatoires naturelles.',
      benefits: ['Anti-inflammatoire', 'Antioxydant', 'Digestif'],
      color: 'curcuma',
      icon: '✦',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Poudre de Cacao',
      price: 3000,
      unit: 'FCFA',
      weight: '150g',
      description: 'Un cacao pur, riche et aromatique, issu de fèves sélectionnées avec soin. Idéal pour vos pâtisseries.',
      benefits: ['Riche en magnésium', 'Antioxydant', 'Énergisant'],
      color: 'cacao',
      icon: '◆'
    },
    {
      id: 3,
      name: 'Poudre de Gingembre',
      price: 2000,
      unit: 'FCFA',
      weight: '80g',
      description: 'Notre gingembre frais, séché et moulu avec soin, apporte une chaleur épicée à vos plats.',
      benefits: ['Anti-nausée', 'Digestif', 'Réchauffant'],
      color: 'gingembre',
      icon: '❋',
      badge: 'Nouveau'
    },
    {
      id: 4,
      name: 'Tisane de Citronnelle',
      price: 1500,
      unit: 'FCFA',
      weight: '50g',
      description: 'Une tisane relaxante et digestive à base de citronnelle fraîche, récoltée à la main.',
      benefits: ['Relaxant', 'Digestif', 'Apaisant'],
      color: 'citronnelle',
      icon: '✿'
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
          distance: 40
        });
        this.cleanupFns.push(cleanup);
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-FR') + ' FCFA';
  }
}
