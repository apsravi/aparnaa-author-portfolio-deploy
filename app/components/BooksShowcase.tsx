'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Star, BookOpen, ShoppingCart } from 'lucide-react';

interface BookLink {
  kindle?: string;
  paperback?: string;
  audiobook?: string | null;
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

  return (
    <section id="books" className="py-20 md:py-32 px-4 md:px-8 bg-gradient-premium">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="font-serif-heading text-5xl md:text-6xl text-charcoal dark:text-cream mb-4">
            Kindle Published Books
          </h2>
          <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-lg max-w-2xl mx-auto">
            Discover stories of mythology, spirituality, and transformation
          </p>
        </motion.div>

        {/* Featured Book Carousel */}
        {featuredBook && (
          <motion.div
            className="mb-20"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <div className="bg-white dark:bg-dark-surface rounded-lg overflow-hidden shadow-premium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                <motion.div
                  className="flex justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    className="w-full max-w-xs object-cover rounded-lg shadow-elevation-3"
                  />
                </motion.div>

                <div className="flex flex-col justify-center">
                  <span className="text-gold dark:text-dark-gold font-serif-body text-sm tracking-widest mb-4">
                    FEATURED BOOK
                  </span>
                  <h3 className="font-serif-heading text-4xl text-charcoal dark:text-cream mb-2">
                    {featuredBook.title}
                  </h3>
                  <p className="text-gold dark:text-dark-gold font-serif-body mb-4">{featuredBook.subtitle}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(featuredBook.rating)
                              ? 'fill-gold text-gold'
                              : 'text-beige dark:text-dark-gold/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-charcoal dark:text-ivory text-sm">
                      {featuredBook.rating} ({featuredBook.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-charcoal dark:text-ivory/80 font-serif-body leading-relaxed mb-6">
                    {featuredBook.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {featuredBook.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-beige dark:bg-dark-gold/20 text-charcoal dark:text-dark-gold text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {featuredBook.links.kindle && (
                      <motion.a
                        href={featuredBook.links.kindle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                      >
                        <ShoppingCart className="w-4 h-4 inline mr-2" />
                        Buy on Kindle
                      </motion.a>
                    )}
                    <motion.button
                      className="btn-secondary"
                      whileHover={{ scale: 1.05 }}
                    >
                      <BookOpen className="w-4 h-4 inline mr-2" />
                      Read Sample
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
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
                  : 'bg-beige dark:bg-dark-gold/20 text-charcoal dark:text-dark-gold hover:bg-charcoal/10 dark:hover:bg-dark-gold/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Books Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {filteredBooks.map(book => (
            <motion.div
              key={book.id}
              className="card-premium overflow-hidden"
              variants={fadeUpVariants}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              whileHover={{ y: -8 }}
            >
              {/* Book Cover */}
              <div className="relative h-64 overflow-hidden bg-beige dark:bg-dark-gold/10">
                <motion.img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredBook === book.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Book Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif-heading text-lg text-charcoal dark:text-cream flex-1">
                    {book.title}
                  </h3>
                </div>

                <p className="text-gold dark:text-dark-gold font-serif-body text-sm mb-3 line-clamp-2">
                  {book.subtitle}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(book.rating)
                            ? 'fill-gold text-gold'
                            : 'text-beige dark:text-dark-gold/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal dark:text-ivory/60">({book.reviews})</span>
                </div>

                <div className="flex gap-2">
                  {book.links.kindle && (
                    <motion.a
                      href={book.links.kindle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-charcoal dark:bg-gold text-cream dark:text-dark-bg text-sm py-2 rounded hover:opacity-80 transition-opacity text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      Buy
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
