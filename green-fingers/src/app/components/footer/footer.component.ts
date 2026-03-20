import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-body">
        <div class="container footer-grid">
          <div class="footer-brand-col">
            <div class="footer-logo-text">GREEN FINGERS</div>
            <p class="footer-tagline-italic">De la semence à la table</p>
            <p class="footer-about-text">
              Des produits naturels, cultivés avec passion pour votre bien-être et celui de votre famille.
            </p>
            <div class="footer-socials">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="footer-links-col">
            <h4>Navigation</h4>
            <ul>
              <li><a (click)="scrollTo('home')">Accueil</a></li>
              <li><a (click)="scrollTo('products')">Produits</a></li>
              <li><a (click)="scrollTo('about')">Notre Histoire</a></li>
              <li><a (click)="scrollTo('blog')">Blog</a></li>
              <li><a (click)="scrollTo('contact')">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-links-col">
            <h4>Nos Produits</h4>
            <ul>
              <li><a>Poudre de Curcuma</a></li>
              <li><a>Poudre de Cacao</a></li>
              <li><a>Poudre de Gingembre</a></li>
              <li><a>Tisane de Citronnelle</a></li>
            </ul>
          </div>
          
          <div class="footer-newsletter-col">
            <h4>Newsletter</h4>
            <p>Recevez nos offres exclusives, recettes et conseils santé.</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Votre adresse email">
              <button class="btn-primary">S'abonner</button>
            </div>
            <p class="newsletter-note">En vous abonnant, vous acceptez notre politique de confidentialité.</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <p>&copy; 2025 Green Fingers. Tous droits réservés. | De la semence à la table</p>
          <div class="footer-bottom-links">
            <a>Politique de confidentialité</a>
            <a>Conditions d'utilisation</a>
            <a>Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);

  scrollTo(section: string): void {
    this.scrollService.scrollToSection(section);
  }
}
