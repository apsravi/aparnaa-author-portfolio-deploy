'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cream via-ivory to-beige dark:from-dark-bg dark:via-dark-surface dark:to-dark-gold/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/20 rounded-full dark:bg-dark-gold/30"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Author Image with Animation */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <motion.div
            className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gold shadow-premium"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/images/aparnaa-profile.jpg"
              alt="Aparnaa Ravi"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Author Name */}
        <motion.h1
          className="font-serif-heading text-5xl md:text-7xl text-charcoal dark:text-cream mb-4 tracking-wide"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Aparnaa Ravi
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-gold dark:text-dark-gold text-lg md:text-xl font-serif-body tracking-widest mb-6"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Author • Storyteller • Devotional Fiction Writer
        </motion.p>

        {/* Introduction */}
        <motion.p
          className="text-charcoal dark:text-ivory/90 text-base md:text-lg font-serif-body leading-relaxed mb-8 max-w-2xl mx-auto"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          Weaving ancient mythology with modern consciousness, I craft devotional stories that ignite
          spiritual awakening and celebrate the divine in everyday moments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Books
          </motion.button>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            About the Author
          </motion.button>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Subscribe
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-charcoal dark:text-gold" />
      </motion.div>
    </section>
  );
};
