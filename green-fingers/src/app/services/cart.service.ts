import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // State
  private readonly _cartItems = signal<CartItem[]>([]);
  private readonly _isOpen = signal(false);
  private readonly _notification = signal<string | null>(null);

  // Public readonly signals
  readonly cartItems = this._cartItems.asReadonly();
  readonly isOpen = this._isOpen.asReadonly();
  readonly notification = this._notification.asReadonly();

  // Computed values
  readonly cartCount = computed(() => 
    this._cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly cartTotal = computed(() => 
    this._cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly isEmpty = computed(() => this._cartItems().length === 0);

  constructor() {
    // Load cart from localStorage on init
    this.loadFromStorage();
    
    // Save to localStorage on changes
    effect(() => {
      localStorage.setItem('greenFingersCart', JSON.stringify(this._cartItems()));
    });
  }

  toggle(): void {
    this._isOpen.update(v => !v);
    document.body.style.overflow = this._isOpen() ? 'hidden' : '';
  }

  close(): void {
    this._isOpen.set(false);
    document.body.style.overflow = '';
  }

  open(): void {
    this._isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  addToCart(product: Product): void {
    const current = this._cartItems();
    const existing = current.find(item => item.product.id === product.id);
    
    if (existing) {
      this._cartItems.set(
        current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this._cartItems.set([...current, { product, quantity: 1 }]);
    }
    
    this.showNotification(`${product.name} ajouté au panier !`);
  }

  removeFromCart(productId: number): void {
    this._cartItems.set(this._cartItems().filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this._cartItems.set(
      this._cartItems().map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart(): void {
    this._cartItems.set([]);
  }

  private showNotification(message: string): void {
    this._notification.set(message);
    setTimeout(() => this._notification.set(null), 3000);
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('greenFingersCart');
      if (stored) {
        this._cartItems.set(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }
}
