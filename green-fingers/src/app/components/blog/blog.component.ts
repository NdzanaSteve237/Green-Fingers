import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/product.model';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="blog-section" id="blog" data-parallax data-parallax-speed="0.04" data-parallax-clamp="20">
      <div class="container">
        <div class="section-header" data-animate>
          <span class="section-tag">Notre Blog</span>
          <h2 class="section-title">Conseils & recettes naturels</h2>
          <p class="section-subtitle">
            Découvrez nos articles sur les bienfaits de nos produits et des recettes inspirantes
          </p>
        </div>
        
        <div class="blog-grid">
          <article class="blog-card" data-animate *ngFor="let post of blogPosts; let i = index">
            <div class="blog-img" [class]="post.colorClass">
              <span class="blog-category-tag">{{ post.category }}</span>
            </div>
            
            <div class="blog-body">
              <div class="blog-meta">
                <span class="blog-date">📅 {{ post.date }}</span>
                <span class="blog-read">⏱️ {{ post.readTime }} de lecture</span>
              </div>
              
              <h3 class="blog-title">{{ post.title }}</h3>
              <p class="blog-excerpt">{{ post.excerpt }}</p>
              
              <a class="blog-read-link">
                Lire la suite →
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly animationService = inject(AnimationService);
  private cleanupFns: (() => void)[] = [];

  blogPosts: BlogPost[] = [
    {
      title: 'Les bienfaits du curcuma sur la santé',
      date: '15 Mars 2025',
      category: 'Santé',
      excerpt: 'Découvrez pourquoi le curcuma est considéré comme l\'or de la nature et ses nombreux bienfaits pour votre santé.',
      readTime: '5 min',
      colorClass: 'blog-curcuma'
    },
    {
      title: 'Comment utiliser le gingembre en cuisine',
      date: '8 Mars 2025',
      category: 'Cuisine',
      excerpt: 'Le gingembre est un ingrédient polyvalent. Voici nos meilleures recettes et astuces de cuisine.',
      readTime: '7 min',
      colorClass: 'blog-gingembre'
    },
    {
      title: 'La tisane de citronnelle, rituel du soir',
      date: '1 Mars 2025',
      category: 'Bien-être',
      excerpt: 'Intégrez la tisane de citronnelle dans votre routine du soir pour une relaxation optimale.',
      readTime: '4 min',
      colorClass: 'blog-citronnelle'
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
