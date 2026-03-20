export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  weight: string;
  description: string;
  benefits: string[];
  color: 'curcuma' | 'cacao' | 'gingembre' | 'citronnelle';
  icon: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  colorClass: 'blog-curcuma' | 'blog-gingembre' | 'blog-citronnelle';
}

export interface Testimonial {
  text: string;
  author: string;
  location: string;
  initials: string;
  avatarColor: string;
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}
