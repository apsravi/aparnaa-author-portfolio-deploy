'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { AboutAuthor } from '@/app/components/AboutAuthor';
import { BooksShowcase } from '@/app/components/BooksShowcase';
import { Testimonials } from '@/app/components/Testimonials';
import { Newsletter } from '@/app/components/Newsletter';
import { ContactForm } from '@/app/components/ContactForm';
import { Footer } from '@/app/components/Footer';
import { useTheme } from '@/app/hooks/useTheme';

interface Author {
  name: string;
  tagline: string;
  bio: string;
  shortBio: string;
  heroImage: string;
  profileImage: string;
  authorQuote: string;
  socialLinks: Record<string, string>;
  achievements: Array<{ year: number; title: string; description: string }>;
  writingAreas: string[];
  contact: { email: string; whatsapp: string };
}

interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  genre: string;
  coverImage: string;
  rating: number;
  reviews: number;
  featured: boolean;
  links: { kindle?: string | null; paperback?: string | null; audiobook?: string | null };
  excerpt: string;
  tags: string[];
  asin?: string;
  pages?: number;
  language?: string;
  publishDate?: string;
  price?: { kindle?: string; kindleUnlimited?: string };
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  reviewTitle?: string;
  text: string;
  bookTitle: string;
  platform?: string;
  reviewDate?: string;
  verified?: boolean;
  format?: string;
}

export default function Home() {
  const { mounted } = useTheme();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [authorRes, booksRes, testimonialsRes] = await Promise.all([
          fetch('/content/author.json'),
          fetch('/content/books.json'),
          fetch('/content/testimonials.json'),
        ]);
        setAuthor(await authorRes.json());
        setBooks(await booksRes.json());
        setTestimonials(await testimonialsRes.json());
      } catch (e) {
        console.error('Content load error:', e);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream dark:bg-dark-bg gap-4">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="font-serif-body text-charcoal/50 dark:text-ivory/50 text-sm tracking-wide">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg">
      <Header />
      <main>
        <HeroSection />

        {author && (
          <AboutAuthor
            bio={author.bio}
            profileImage={author.profileImage}
            achievements={author.achievements}
            quote={author.authorQuote}
            writingAreas={author.writingAreas}
          />
        )}

        {books.length > 0 && <BooksShowcase books={books} />}

        {/* Reviews anchor */}
        <div id="reviews">
          {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        </div>

        <ContactForm />

        <div id="newsletter">
          <Newsletter />
        </div>

        <Footer
          year={new Date().getFullYear()}
          socialLinks={author?.socialLinks}
          contact={author?.contact}
        />
      </main>
    </div>
  );
}
