import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Notification Toast -->
    @if (cartService.notification()) {
      <div class="notification-toast">
        <span class="toast-icon">✓</span>
        <span>{{ cartService.notification() }}</span>
      </div>
    }
    
    <!-- Cart Overlay -->
    @if (cartService.isOpen()) {
      <div class="cart-overlay" (click)="cartService.close()"></div>
    }
    
    <!-- Cart Sidebar -->
    <div class="cart-sidebar" [class.open]="cartService.isOpen()">
      <div class="cart-header">
        <h3>Votre Panier</h3>
        <button class="cart-close-btn" (click)="cartService.close()">✕</button>
      </div>
      
      @if (cartService.isEmpty()) {
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p>Votre panier est vide</p>
          <button class="btn-primary" (click)="goToProducts()">
            Voir nos produits
          </button>
        </div>
      } @else {
        <div class="cart-items">
          @for (item of cartService.cartItems(); track item.product.id) {
            <div class="cart-item">
              <div class="cart-item-visual" [class]="'bg-' + item.product.color">
                <span class="cart-item-icon">{{ item.product.icon }}</span>
              </div>
              
              <div class="cart-item-details">
                <span class="cart-item-name">{{ item.product.name }}</span>
                <span class="cart-item-weight">{{ item.product.weight }}</span>
                
                <div class="cart-item-qty-row">
                  <button class="qty-btn" (click)="updateQty(item.product.id, item.quantity - 1)">−</button>
                  <span class="qty-val">{{ item.quantity }}</span>
                  <button class="qty-btn" (click)="updateQty(item.product.id, item.quantity + 1)">+</button>
                </div>
              </div>
              
              <div class="cart-item-right">
                <span class="cart-item-price">{{ formatPrice(item.product.price * item.quantity) }}</span>
                <button class="remove-btn" (click)="cartService.removeFromCart(item.product.id)">
                  ✕
                </button>
              </div>
            </div>
          }
        </div>
        
        <div class="cart-footer">
          <div class="cart-total-row">
            <span>Total</span>
            <strong>{{ formatPrice(cartService.cartTotal()) }}</strong>
          </div>
          <button class="btn-primary btn-block" (click)="checkoutOnWhatsApp()">Commander maintenant →</button>
          <button class="btn-outline btn-block" (click)="cartService.close()">
            Continuer mes achats
          </button>
        </div>
      }
    </div>
  `,
  styleUrls: ['./cart.component.scss']
})
export class CartSidebarComponent {
  protected readonly cartService = inject(CartService);
  private readonly scrollService = inject(ScrollService);
  private readonly whatsappNumber = '237679971708';

  updateQty(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  goToProducts(): void {
    this.cartService.close();
    this.scrollService.scrollToSection('products');
  }

  checkoutOnWhatsApp(): void {
    const items = this.cartService.cartItems();
    if (!items.length || typeof window === 'undefined') {
      return;
    }

    const lines = items.map((item, index) => {
      const total = item.product.price * item.quantity;
      return `${index + 1}. ${item.product.name} (${item.product.weight}) x${item.quantity} - ${this.formatPrice(total)}`;
    });

    const message = [
      'Bonjour Green Fingers,',
      '',
      'Je souhaite valider la commande suivante :',
      ...lines,
      '',
      `Total : ${this.formatPrice(this.cartService.cartTotal())}`,
      '',
      'Merci de me recontacter pour la confirmation.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    this.cartService.clearCart();
    this.cartService.close();
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-FR') + ' FCFA';
  }
}
