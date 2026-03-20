import { Component, inject, signal, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationService } from '../../services/animation.service';

interface ContactForm {
  prenom: string;
  nom: string;
  email: string;
  objet: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contact-section" id="contact" data-parallax data-parallax-speed="0.04" data-parallax-clamp="20">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info-col" data-animate>
            <span class="section-tag">Contact</span>
            <h2 class="section-title">Parlons de vos besoins</h2>
            <p class="contact-lead">
              Vous avez une question, souhaitez passer une commande en gros ou simplement en savoir plus ? 
              Nous sommes là pour vous !
            </p>
            
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <strong>Adresse</strong>
                  <span>Cameroun, Afrique Centrale</span>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.67A16 16 0 0 0 16 16.73l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <strong>Téléphone</strong>
                  <span>+237 6XX XXX XXX</span>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <span>contact&#64;greenfingers.cm</span>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon-wrap whatsapp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <strong>WhatsApp</strong>
                  <span>+237 6XX XXX XXX</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-form-col" data-animate>
            @if (formSubmitted()) {
              <div class="form-success">
                <div class="form-success-icon">✅</div>
                <h3>Message envoyé !</h3>
                <p>Merci pour votre message. Nous vous répondrons dans les 24 heures.</p>
              </div>
            } @else {
              <form class="contact-form" (ngSubmit)="submitForm()">
                <div class="form-row-2">
                  <div class="form-group">
                    <label for="prenom">Prénom</label>
                    <input id="prenom" type="text" [(ngModel)]="contactForm.prenom" 
                           name="prenom" placeholder="Votre prénom" required>
                  </div>
                  <div class="form-group">
                    <label for="nom">Nom</label>
                    <input id="nom" type="text" [(ngModel)]="contactForm.nom" 
                           name="nom" placeholder="Votre nom" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email">Email</label>
                  <input id="email" type="email" [(ngModel)]="contactForm.email" 
                         name="email" placeholder="votre&#64;email.com" required>
                </div>
                
                <div class="form-group">
                  <label for="objet">Objet</label>
                  <select id="objet" [(ngModel)]="contactForm.objet" name="objet">
                    <option>Commande</option>
                    <option>Informations produits</option>
                    <option>Commande en gros</option>
                    <option>Partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" rows="5" [(ngModel)]="contactForm.message" 
                            name="message" placeholder="Votre message..." required></textarea>
                </div>
                
                <button type="submit" class="btn-primary btn-block">
                  Envoyer le message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: (() => void)[] = [];

  contactForm: ContactForm = {
    prenom: '',
    nom: '',
    email: '',
    objet: 'Commande',
    message: ''
  };

  formSubmitted = signal(false);

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const root = this.host.nativeElement as HTMLElement;
      const elements = root.querySelectorAll('[data-animate]');
      elements.forEach((el: Element, index: number) => {
        const cleanup = this.animationService.observe(el as HTMLElement, {
          delay: index * 150,
          direction: index % 2 === 0 ? 'up' : 'left',
          distance: 40
        });
        this.cleanupFns.push(cleanup);
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  submitForm(): void {
    this.formSubmitted.set(true);
    setTimeout(() => {
      this.formSubmitted.set(false);
      this.contactForm = {
        prenom: '',
        nom: '',
        email: '',
        objet: 'Commande',
        message: ''
      };
    }, 5000);
  }
}
