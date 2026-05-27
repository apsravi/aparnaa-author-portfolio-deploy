'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Star, ChevronLeft, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';

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

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const { ref, isVisible } = useInView();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      let newIndex = prev + newDirection;
      if (newIndex < 0) newIndex = testimonials.length - 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      return newIndex;
    });
  };

  if (!testimonials.length) return null;
  const testimonial = testimonials[current];

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-dark-surface/50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <p className="text-gold dark:text-dark-gold font-serif-body tracking-widest text-sm mb-3 uppercase">What Readers Say</p>
          <h2 className="font-serif-heading text-5xl md:text-6xl text-charcoal dark:text-cream mb-4">
            Reader Reviews
          </h2>
          <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-lg">
            Verified reviews from Amazon India readers
          </p>
        </motion.div>

        {/* Review Card */}
        <motion.div
          key={current}
          className="relative bg-gradient-to-br from-cream to-ivory dark:from-dark-surface dark:to-dark-bg rounded-2xl p-8 md:p-12 shadow-elevation-2 border border-beige dark:border-dark-gold/10"
          initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Amazon badge top-right */}
          {testimonial.platform && (
            <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-amber-50 dark:bg-dark-gold/10 border border-amber-200 dark:border-dark-gold/20 px-3 py-1 rounded-full">
              <span className="text-xs text-amber-700 dark:text-dark-gold font-semibold">{testimonial.platform}</span>
              <ExternalLink className="w-3 h-3 text-amber-600 dark:text-dark-gold" />
            </div>
          )}

          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-gold text-gold' : 'text-beige'}`} />
            ))}
            <span className="ml-2 text-sm font-semibold text-charcoal dark:text-ivory">
              {testimonial.rating} out of 5
            </span>
          </div>

          {/* Review Title */}
          {testimonial.reviewTitle && (
            <h3 className="font-serif-heading text-xl text-charcoal dark:text-cream mb-4 leading-snug">
              "{testimonial.reviewTitle}"
            </h3>
          )}

          {/* Review Text */}
          <motion.p
            className="font-serif-body text-base md:text-lg text-charcoal/80 dark:text-ivory/80 leading-relaxed mb-8 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            "{testimonial.text}"
          </motion.p>

          {/* Reviewer Info */}
          <motion.div
            className="flex items-center justify-between flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-brown flex items-center justify-center text-white font-bold text-lg">
                {testimonial.avatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-serif-heading text-charcoal dark:text-cream font-semibold">
                    {testimonial.name}
                  </p>
                  {testimonial.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-charcoal/50 dark:text-ivory/50 font-serif-body">
                  {testimonial.role}
                  {testimonial.reviewDate && ` · ${testimonial.reviewDate}`}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-charcoal/40 dark:text-ivory/40 font-serif-body">Reviewed on</p>
              <p className="text-sm text-charcoal/70 dark:text-ivory/70 font-semibold font-serif-body">
                {testimonial.bookTitle}
              </p>
              {testimonial.format && (
                <p className="text-xs text-charcoal/40 dark:text-ivory/40">{testimonial.format}</p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <motion.div
            className="flex items-center justify-center gap-6 mt-10"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full border-2 border-charcoal dark:border-gold hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg text-charcoal dark:text-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${index === current ? 'bg-charcoal dark:bg-gold w-8' : 'bg-charcoal/20 dark:bg-gold/20 w-2'}`}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
            <motion.button
              onClick={() => paginate(1)}
              className="p-3 rounded-full border-2 border-charcoal dark:border-gold hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg text-charcoal dark:text-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* CTA to leave a review */}
        <motion.div
          className="text-center mt-10"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <a
            href="https://www.amazon.in/dp/B0GF2L5LX7#customerReviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold dark:text-dark-gold hover:underline font-serif-body"
          >
            <ExternalLink className="w-4 h-4" />
            Read all reviews on Amazon India
          </a>
        </motion.div>

      </div>
    </section>
  );
};
