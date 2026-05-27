'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { AboutAuthor } from '@/app/components/AboutAuthor';
import { BooksShowcase } from '@/app/components/BooksShowcase';
import { PublishedBooks } from '@/app/components/PublishedBooks';
import { Testimonials } from '@/app/components/Testimonials';
import { Newsletter } from '@/app/components/Newsletter';
import { ContactForm } from '@/app/components/ContactForm';
import { Footer } from '@/app/components/Footer';
import { LoadingScreen } from '@/app/components/LoadingScreen';
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
  status: 'published' | 'upcoming';
  publishDate: string;
  publishYear: number;
  links: { kindle?: string | null; paperback?: string | null; audiobook?: string | null };
  excerpt: string;
  tags: string[];
  asin?: string;
  pages?: number;
  language?: string;
  readingAge?: string;
  bestSellersRank?: Record<string, string>;
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
    const load = async () => {
      try {
        const [a, b, t] = await Promise.all([
          fetch('/content/author.json').then(r => r.json()),
          fetch('/content/books.json').then(r => r.json()),
          fetch('/content/testimonials.json').then(r => r.json()),
        ]);
        setAuthor(a);
        setBooks(b);
        setTestimonials(t);
      } catch (e) {
        console.error('Content load error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const isLoading = !mounted || loading;

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <div className="min-h-screen bg-cream dark:bg-dark-bg overflow-x-hidden">
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

            {/* Featured book spotlight */}
            {books.length > 0 && <BooksShowcase books={books} />}

            {/* Full bibliography sorted by year */}
            {books.length > 0 && <PublishedBooks books={books} />}

            {/* Reviews */}
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
      )}
    </>
  );
}
