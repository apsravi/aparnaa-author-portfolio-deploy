'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Star, ShoppingCart, BookOpen, Clock, ExternalLink, Award } from 'lucide-react';
import { ZoomableImage } from '@/app/components/ImageLightbox';

interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  genre: string;
  coverImage: string;
  publishDate: string;
  publishYear: number;
  rating: number;
  reviews: number;
  featured: boolean;
  status: 'published' | 'upcoming';
  asin?: string;
  pages?: number;
  language?: string;
  readingAge?: string;
  bestSellersRank?: Record<string, string>;
  links: { kindle?: string | null; paperback?: string | null };
  price?: { kindle?: string; kindleUnlimited?: string };
  excerpt: string;
  tags: string[];
}

interface PublishedBooksProps {
  books: Book[];
}

const getCoverUrl = (book: Book) =>
  book.asin
    ? `https://images-na.ssl-images-amazon.com/images/P/${book.asin}.jpg`
    : book.coverImage || null;

const formatDate = (dateStr: string) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
};

export const PublishedBooks = ({ books }: PublishedBooksProps) => {
  const { ref, isVisible } = useInView();

  // Sort by publishYear desc, then by publishDate desc within same year
  const sorted = [...books].sort((a, b) => {
    if (b.publishYear !== a.publishYear) return b.publishYear - a.publishYear;
    if (!a.publishDate) return 1;
    if (!b.publishDate) return -1;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  // Group by year
  const grouped: Record<number, Book[]> = {};
  sorted.forEach((book) => {
    const yr = book.publishYear;
    if (!grouped[yr]) grouped[yr] = [];
    grouped[yr].push(book);
  });
  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  const published = sorted.filter(b => b.status === 'published');
  const upcoming = sorted.filter(b => b.status === 'upcoming');

  return (
    <section id="published-books" className="py-20 md:py-32 px-4 md:px-8 bg-cream dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <p className="text-gold dark:text-dark-gold font-serif-body tracking-widest text-sm mb-3 uppercase">Complete Bibliography</p>
          <h2 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl text-charcoal dark:text-cream mb-4">
            Books by Appu S R
          </h2>
          <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-base md:text-lg max-w-xl mx-auto">
            Every book, sorted by year of publication
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { val: published.length, label: 'Published' },
              { val: upcoming.length, label: 'Coming Soon' },
              { val: `${published.reduce((a, b) => a + ((b.pages ?? 0)), 0)}+`, label: 'Pages Written' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-serif-heading text-2xl md:text-3xl text-gold dark:text-dark-gold font-bold">{s.val}</p>
                <p className="text-xs text-charcoal/50 dark:text-ivory/50 font-sans-modern uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Year groups */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {years.map((year) => (
            <div key={year}>
              {/* Year divider */}
              <motion.div
                variants={fadeUpVariants}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent dark:via-dark-gold/30" />
                <span className="font-serif-heading text-2xl md:text-3xl text-gold dark:text-dark-gold px-2 shrink-0">{year}</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/30 to-transparent dark:via-dark-gold/30" />
              </motion.div>

              {/* Books in this year */}
              <div className="space-y-6">
                {grouped[year].map((book) => (
                  <motion.div
                    key={book.id}
                    variants={fadeUpVariants}
                    className={`relative rounded-2xl overflow-hidden border transition-all duration-300 ${
                      book.status === 'upcoming'
                        ? 'border-dashed border-gold/30 dark:border-dark-gold/20 bg-white/50 dark:bg-dark-surface/30'
                        : 'border-beige dark:border-dark-gold/10 bg-white dark:bg-dark-surface shadow-elevation-2 hover:shadow-elevation-3'
                    }`}
                    whileHover={book.status === 'published' ? { y: -4 } : {}}
                  >
                    {/* Upcoming ribbon */}
                    {book.status === 'upcoming' && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 dark:bg-dark-gold/10 border border-gold/30 text-gold dark:text-dark-gold text-xs font-sans-modern rounded-full">
                          <Clock className="w-3 h-3" />
                          Coming Soon
                        </span>
                      </div>
                    )}

                    {/* Featured ribbon */}
                    {book.featured && book.status === 'published' && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white text-xs font-sans-modern rounded-full">
                          <Award className="w-3 h-3" />
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-0">
                      {/* Cover */}
                      <div className={`relative flex-shrink-0 flex items-center justify-center sm:w-40 md:w-48 ${
                        book.status === 'upcoming'
                          ? 'bg-gradient-to-br from-gold/5 to-amber-50/50 dark:from-dark-gold/5 dark:to-dark-surface/50 min-h-[140px]'
                          : 'bg-amber-50/60 dark:bg-dark-gold/5 min-h-[180px]'
                      }`}>
                        {book.status === 'published' && getCoverUrl(book) ? (
                          <ZoomableImage
                            src={getCoverUrl(book)!}
                            alt={book.title}
                            className="w-full h-full sm:max-h-[220px]"
                            bookLink={book.links.kindle || undefined}
                            bookTitle={book.title}
                            bookSubtitle={book.subtitle}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 gap-2">
                            <BookOpen className="w-10 h-10 text-gold/40 dark:text-dark-gold/30" />
                            <span className="text-xs text-gold/60 dark:text-dark-gold/40 font-serif-body text-center">Coming Soon</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-5 md:p-8">
                        {/* Genre */}
                        <p className="text-xs text-gold dark:text-dark-gold font-sans-modern tracking-widest uppercase mb-2">{book.genre}</p>

                        {/* Title */}
                        <h3 className="font-serif-heading text-xl md:text-2xl text-charcoal dark:text-cream mb-1 leading-snug pr-24">
                          {book.title}
                        </h3>
                        <p className="text-brown/60 dark:text-ivory/50 font-serif-body italic text-sm mb-3">{book.subtitle}</p>

                        {/* Rating — published only */}
                        {book.status === 'published' && book.rating > 0 && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < book.rating ? 'fill-gold text-gold' : 'text-beige dark:text-dark-gold/20'}`} />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-charcoal dark:text-ivory">{book.rating} / 5</span>
                            <span className="text-xs text-charcoal/40 dark:text-ivory/40">({book.reviews} review{book.reviews !== 1 ? 's' : ''})</span>
                          </div>
                        )}

                        {/* Excerpt */}
                        <p className="text-charcoal/70 dark:text-ivory/60 font-serif-body text-sm leading-relaxed mb-4 line-clamp-3">
                          {book.excerpt}
                        </p>

                        {/* Meta pills */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {(book.pages ?? 0) > 0 && (
                            <span className="px-2.5 py-1 bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/10 rounded-full text-xs text-charcoal/60 dark:text-ivory/50">
                              {book.pages} pages
                            </span>
                          )}
                          {book.language && (
                            <span className="px-2.5 py-1 bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/10 rounded-full text-xs text-charcoal/60 dark:text-ivory/50">
                              {book.language}
                            </span>
                          )}
                          {book.readingAge && (
                            <span className="px-2.5 py-1 bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/10 rounded-full text-xs text-charcoal/60 dark:text-ivory/50">
                              Ages {book.readingAge}
                            </span>
                          )}
                          {formatDate(book.publishDate) && (
                            <span className="px-2.5 py-1 bg-gold/10 dark:bg-dark-gold/10 border border-gold/20 rounded-full text-xs text-gold dark:text-dark-gold">
                              {formatDate(book.publishDate)}
                            </span>
                          )}
                        </div>

                        {/* Amazon ranks */}
                        {book.bestSellersRank && Object.keys(book.bestSellersRank).length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {Object.entries(book.bestSellersRank).map(([key, val]) => (
                              <span key={key} className="px-2.5 py-1 bg-amber-50 dark:bg-dark-gold/10 border border-amber-200 dark:border-dark-gold/20 rounded-full text-xs text-amber-700 dark:text-dark-gold">
                                🏆 {val} {key === 'kindleStore' ? 'Kindle Store' : key === 'indianWriting' ? 'Indian Writing' : key === 'religiousInspirational' ? 'Religious Fiction' : 'Spiritual Fiction'}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* CTAs */}
                        {book.status === 'published' && book.links.kindle && (
                          <div className="flex flex-wrap gap-3">
                            <motion.a
                              href={book.links.kindle}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal dark:bg-gold text-cream dark:text-dark-bg text-sm font-serif-body font-semibold rounded-lg hover:opacity-90 transition-all"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Buy on Kindle {book.price?.kindle && `— ${book.price.kindle}`}
                            </motion.a>
                            {book.price?.kindleUnlimited && (
                              <motion.a
                                href={book.links.kindle}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-charcoal dark:border-gold text-charcoal dark:text-gold text-sm font-serif-body font-semibold rounded-lg hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg transition-all"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                <BookOpen className="w-4 h-4" />
                                Free on KU
                              </motion.a>
                            )}
                            <motion.a
                              href={book.links.kindle}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-charcoal/40 dark:text-ivory/40 hover:text-gold dark:hover:text-dark-gold transition-colors self-center"
                              whileHover={{ scale: 1.02 }}
                            >
                              <ExternalLink className="w-3 h-3" />
                              View on Amazon India
                            </motion.a>
                          </div>
                        )}

                        {book.status === 'upcoming' && (
                          <p className="text-charcoal/40 dark:text-ivory/30 font-serif-body text-sm italic">
                            Stay tuned — more details coming soon.
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
