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
  achievements: Array<{
    year: number;
    title: string;
    description: string;
  }>;
  writingAreas: string[];
  contact: {
    email: string;
    whatsapp: string;
  };
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
  links: {
    kindle?: string;
    paperback?: string;
    audiobook?: string | null;
  };
  excerpt: string;
  tags: string[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  bookTitle: string;
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

        const authorData = await authorRes.json();
        const booksData = await booksRes.json();
        const testimonialsData = await testimonialsRes.json();

        setAuthor(authorData);
        setBooks(booksData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-dark-bg">
        <div className="animate-spin">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full" />
        </div>
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

        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}

        <ContactForm />

        <Newsletter />

        {author && (
          <Footer
            year={new Date().getFullYear()}
            socialLinks={author.socialLinks}
          />
        )}
      </main>
    </div>
  );
}
