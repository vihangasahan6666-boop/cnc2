export type ViewType = 'home' | 'projects' | 'about' | 'contact';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  stars: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
