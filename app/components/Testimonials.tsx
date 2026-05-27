'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  bookTitle: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const { ref, isVisible } = useInView();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="font-serif-heading text-5xl md:text-6xl text-charcoal dark:text-cream mb-4">
            Reader Testimonials
          </h2>
          <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-lg">
            What readers are saying about the stories
          </p>
        </motion.div>

        {/* Testimonial Card with Animation */}
        <motion.div
          ref={ref}
          key={current}
          className="bg-gradient-to-br from-cream to-ivory dark:from-dark-surface dark:to-dark-bg rounded-lg p-8 md:p-12 shadow-elevation-2"
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stars */}
          <div className="flex gap-1 mb-6 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(testimonial.rating)
                    ? 'fill-gold text-gold'
                    : 'text-beige dark:text-dark-gold/30'
                }`}
              />
            ))}
          </div>

          {/* Testimonial Text */}
          <motion.p
            className="font-serif-body text-lg md:text-xl text-charcoal dark:text-ivory leading-relaxed mb-8 italic text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            "{testimonial.text}"
          </motion.p>

          {/* Author Info */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold">
              {testimonial.avatar}
            </div>
            <div className="text-left">
              <p className="font-serif-heading text-charcoal dark:text-cream font-semibold">
                {testimonial.name}
              </p>
              <p className="text-sm text-charcoal/60 dark:text-ivory/60 font-serif-body">
                {testimonial.role} • {testimonial.bookTitle}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => paginate(-1)}
            className="p-3 rounded-full border-2 border-charcoal dark:border-gold hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? 'bg-charcoal dark:bg-gold w-8'
                    : 'bg-charcoal/20 dark:bg-gold/20 w-2'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => paginate(1)}
            className="p-3 rounded-full border-2 border-charcoal dark:border-gold hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
