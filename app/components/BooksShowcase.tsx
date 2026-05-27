'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Star, BookOpen, ShoppingCart, Award, ExternalLink } from 'lucide-react';
import { ZoomableImage } from '@/app/components/ImageLightbox';

interface BookLink {
  kindle?: string | null;
  paperback?: string | null;
  audiobook?: string | null;
}

interface BookPrice {
  kindle?: string;
  kindleUnlimited?: string;
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
  links: BookLink;
  excerpt: string;
  tags: string[];
  asin?: string;
  pages?: number;
  language?: string;
  publishDate?: string;
  price?: BookPrice;
}

interface BooksProps {
  books: Book[];
}


export const BooksShowcase = ({ books }: BooksProps) => {
  const { ref, isVisible } = useInView();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  const categories = ['all', ...new Set(books.map(book => book.genre))];
  const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(book => book.genre === selectedCategory);

  const featuredBook = books.find(book => book.featured);

  const getCoverUrl = (book: Book) => {
    if (book.asin) {
      return `https://images-na.ssl-images-amazon.com/images/P/${book.asin}.jpg`;
    }
    return book.coverImage;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <section id="books" className="py-20 md:py-32 px-4 md:px-8 bg-cream dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <p className="text-gold dark:text-dark-gold font-serif-body tracking-widest text-sm mb-3 uppercase">Published Works</p>
          <h2 className="font-serif-heading text-5xl md:text-6xl text-charcoal dark:text-cream mb-4">
            Kindle Books
          </h2>
          <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-lg max-w-2xl mx-auto">
            Devotional stories that illuminate ancient wisdom for the modern soul
          </p>
        </motion.div>

        {/* Featured Book */}
        {featuredBook && (
          <motion.div
            className="mb-20"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <div className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-premium border border-beige dark:border-dark-gold/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                {/* Book Cover Side */}
                <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-dark-gold/10 dark:to-dark-surface flex items-center justify-center p-12 min-h-[500px]">
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1">
                      <Award className="w-3 h-3" /> Featured
                    </span>
                  </div>
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.03, rotate: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden w-56">
                      <ZoomableImage
                        src={getCoverUrl(featuredBook) || ''}
                        alt={featuredBook.title}
                        bookLink={featuredBook.links.kindle || undefined}
                        bookTitle={featuredBook.title}
                        bookSubtitle={featuredBook.subtitle}
                      />
                    </div>
                    {/* Floating badge */}
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      FREE on KU
                    </div>
                  </motion.div>
                </div>

                {/* Book Details Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="text-xs text-gold dark:text-dark-gold tracking-widest uppercase font-sans-modern">
                      {featuredBook.genre}
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-3xl md:text-4xl text-charcoal dark:text-cream mb-1 leading-tight">
                    {featuredBook.title}
                  </h3>
                  <p className="text-brown/70 dark:text-ivory/60 font-serif-body text-lg italic mb-4">
                    {featuredBook.subtitle}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-charcoal dark:text-ivory font-bold text-sm">
                      {featuredBook.rating}.0 out of 5
                    </span>
                    <span className="text-charcoal/50 dark:text-ivory/50 text-sm">
                      ({featuredBook.reviews} global rating)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-charcoal/80 dark:text-ivory/80 font-serif-body leading-relaxed mb-6 text-base line-clamp-4">
                    {featuredBook.excerpt}
                  </p>

                  {/* Book Meta */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    {featuredBook.pages && (
                      <div className="bg-cream dark:bg-dark-bg rounded-lg p-3">
                        <p className="text-charcoal/50 dark:text-ivory/50 text-xs">Pages</p>
                        <p className="text-charcoal dark:text-ivory font-semibold">{featuredBook.pages} pages</p>
                      </div>
                    )}
                    {featuredBook.language && (
                      <div className="bg-cream dark:bg-dark-bg rounded-lg p-3">
                        <p className="text-charcoal/50 dark:text-ivory/50 text-xs">Language</p>
                        <p className="text-charcoal dark:text-ivory font-semibold">{featuredBook.language}</p>
                      </div>
                    )}
                    {featuredBook.publishDate && (
                      <div className="bg-cream dark:bg-dark-bg rounded-lg p-3">
                        <p className="text-charcoal/50 dark:text-ivory/50 text-xs">Published</p>
                        <p className="text-charcoal dark:text-ivory font-semibold">{formatDate(featuredBook.publishDate)}</p>
                      </div>
                    )}
                    {featuredBook.price?.kindle && (
                      <div className="bg-cream dark:bg-dark-bg rounded-lg p-3">
                        <p className="text-charcoal/50 dark:text-ivory/50 text-xs">Kindle Price</p>
                        <p className="text-charcoal dark:text-ivory font-semibold">{featuredBook.price.kindle}</p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredBook.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gold/10 dark:bg-dark-gold/20 text-gold dark:text-dark-gold text-xs rounded-full capitalize border border-gold/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {featuredBook.links.kindle && (
                      <motion.a
                        href={featuredBook.links.kindle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-charcoal dark:bg-gold text-cream dark:text-dark-bg font-serif-body font-semibold rounded-lg hover:opacity-90 transition-all"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy on Kindle — ₹199
                      </motion.a>
                    )}
                    {featuredBook.links.kindle && (
                      <motion.a
                        href={featuredBook.links.kindle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-charcoal dark:border-gold text-charcoal dark:text-gold font-serif-body font-semibold rounded-lg hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg transition-all"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <BookOpen className="w-4 h-4" />
                        Read Free on KU
                      </motion.a>
                    )}
                  </div>

                  {/* Amazon link */}
                  {featuredBook.links.kindle && (
                    <a
                      href={featuredBook.links.kindle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-xs text-charcoal/40 dark:text-ivory/40 hover:text-gold dark:hover:text-dark-gold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View on Amazon India
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter — only shown if more than 1 book */}
        {books.length > 1 && (
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-12"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-serif-body text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-charcoal dark:bg-gold text-cream dark:text-dark-bg'
                    : 'bg-beige dark:bg-dark-gold/20 text-charcoal dark:text-dark-gold hover:bg-charcoal/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Books Grid */}
        <motion.div
          className={`grid gap-6 ${books.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {filteredBooks.filter(b => !b.featured).map(book => (
            <motion.div
              key={book.id}
              className="bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-elevation-2 border border-beige dark:border-dark-gold/10"
              variants={fadeUpVariants}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-64 overflow-hidden bg-amber-50 dark:bg-dark-gold/10">
                <motion.img
                  src={getCoverUrl(book)}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredBook === book.id ? 1.08 : 1 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600/D4AF37/ffffff?text=Book';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif-heading text-xl text-charcoal dark:text-cream mb-1">{book.title}</h3>
                <p className="text-gold dark:text-dark-gold font-serif-body text-sm mb-3 italic">{book.subtitle}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'fill-gold text-gold' : 'text-beige'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal/50 dark:text-ivory/50">({book.reviews})</span>
                </div>
                {book.links.kindle && (
                  <motion.a
                    href={book.links.kindle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-charcoal dark:bg-gold text-cream dark:text-dark-bg text-sm py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                  >
                    <ShoppingCart className="w-4 h-4" /> Buy on Kindle
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon teaser */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-gold/30 dark:border-dark-gold/30 rounded-full">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-sm">More titles coming soon — stay tuned</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
