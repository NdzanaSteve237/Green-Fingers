import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header" [class.scrolled]="scrollService.isScrolled()" [class.menu-open]="mobileMenuOpen">
      <div class="container header-inner">
        <!-- Logo -->
        <div class="logo" (click)="scrollToSection('home')" role="button" tabindex="0">
          <img src="logo.jpeg" class="logo-image" alt="Green Fingers Logo">
          <div class="logo-text-block">
            <span class="logo-name">GREEN FINGERS</span>
            <span class="logo-slogan">De la semence à la table</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="nav" [class.open]="mobileMenuOpen">
          <a class="nav-link" 
             [class.active]="scrollService.activeSection() === 'home'"
             (click)="scrollToSection('home')">Accueil</a>
          <a class="nav-link" 
             [class.active]="scrollService.activeSection() === 'products'"
             (click)="scrollToSection('products')">Produits</a>
          <a class="nav-link" 
             [class.active]="scrollService.activeSection() === 'about'"
             (click)="scrollToSection('about')">Notre Histoire</a>
          <a class="nav-link" 
             [class.active]="scrollService.activeSection() === 'blog'"
             (click)="scrollToSection('blog')">Blog</a>
          <a class="nav-link" 
             [class.active]="scrollService.activeSection() === 'contact'"
             (click)="scrollToSection('contact')">Contact</a>
          <button class="nav-cta-mobile btn-primary" (click)="scrollToSection('products')">
            Commander
          </button>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <button class="cart-btn" (click)="cartService.toggle()" aria-label="Panier">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="cart-label">Panier</span>
            @if (cartService.cartCount() > 0) {
              <span class="cart-badge">{{ cartService.cartCount() }}</span>
            }
          </button>
          
          <button class="account-btn" aria-label="Compte">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span class="account-label">Compte</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" 
                (click)="toggleMobileMenu()" 
                [attr.aria-expanded]="mobileMenuOpen"
                aria-label="Menu">
          @if (mobileMenuOpen) {
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          }
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="scroll-progress" [style.width.%]="scrollService.scrollProgress() * 100"></div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected readonly cartService = inject(CartService);
  protected readonly scrollService = inject(ScrollService);

  mobileMenuOpen = false;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  scrollToSection(sectionId: string): void {
    this.closeMobileMenu();
    this.scrollService.scrollToSection(sectionId);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
