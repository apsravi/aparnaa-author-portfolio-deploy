'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { ChevronDown, BookOpen, User, Mail } from 'lucide-react';

export const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">

      {/* ── Background layers ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-cream via-ivory to-beige dark:from-[#0c0b09] dark:via-[#12100d] dark:to-[#1a1612]" />

      {/* Warm radial glow behind author photo */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-amber-100/60 via-transparent to-transparent dark:from-amber-900/20 dark:via-transparent dark:to-transparent" />
      </div>

      {/* Decorative circles */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full border border-gold/10 dark:border-dark-gold/10 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-32 left-20 w-40 h-40 rounded-full border border-gold/10 dark:border-dark-gold/10 z-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating gold particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-gold/30 dark:bg-dark-gold/40 rounded-full z-0"
          animate={{ y: [0, -120, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          style={{ left: `${8 + i * 12}%`, top: `${40 + i * 7}%` }}
        />
      ))}

      {/* ── Main grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen py-24">

        {/* ── Left: Text content ── */}
        <div className="order-2 md:order-1 text-center md:text-left">

          {/* Label */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 dark:border-dark-gold/30 bg-gold/5 dark:bg-dark-gold/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold dark:bg-dark-gold animate-pulse" />
            <span className="text-xs tracking-widest text-gold dark:text-dark-gold font-sans-modern uppercase">Kindle Author · Chennai, India</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-serif-heading text-5xl md:text-6xl lg:text-7xl text-charcoal dark:text-cream leading-tight mb-3"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Appu
            <span className="block text-gold dark:text-dark-gold">S R</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-serif-body text-base md:text-lg text-brown/70 dark:text-ivory/60 tracking-widest mb-6 uppercase"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Author · Storyteller · Devotional Fiction
          </motion.p>

          {/* Divider */}
          <motion.div
            className="w-16 h-0.5 bg-gold dark:bg-dark-gold mb-6 mx-auto md:mx-0"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          />

          {/* Bio */}
          <motion.p
            className="text-charcoal/70 dark:text-ivory/70 font-serif-body text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto md:mx-0"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            Bringing the timeless wisdom of the Ramayana to modern readers — in clear, heartfelt English that speaks to all ages and every seeking soul.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <motion.button
              onClick={() => scrollTo('books')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-charcoal dark:bg-gold text-cream dark:text-dark-bg font-serif-body font-semibold rounded-lg hover:opacity-90 transition-all shadow-elevation-2"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <BookOpen className="w-4 h-4" />
              Explore Books
            </motion.button>

            <motion.button
              onClick={() => scrollTo('about')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-charcoal dark:border-gold text-charcoal dark:text-gold font-serif-body font-semibold rounded-lg hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg transition-all"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <User className="w-4 h-4" />
              About the Author
            </motion.button>

            <motion.button
              onClick={() => scrollTo('newsletter')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-charcoal/30 dark:border-gold/30 text-charcoal/70 dark:text-gold/70 font-serif-body font-semibold rounded-lg hover:border-charcoal dark:hover:border-gold hover:text-charcoal dark:hover:text-gold transition-all"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="w-4 h-4" />
              Subscribe
            </motion.button>
          </motion.div>

          {/* Book stat strip */}
          <motion.div
            className="flex items-center gap-6 mt-12 justify-center md:justify-start"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            {[
              { value: '5.0★', label: 'Rating' },
              { value: '₹199', label: 'Kindle' },
              { value: 'Free', label: 'KU Access' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif-heading text-xl text-charcoal dark:text-gold font-bold">{stat.value}</p>
                <p className="text-xs text-charcoal/40 dark:text-ivory/40 font-sans-modern uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Author photo ── */}
        <motion.div
          className="order-1 md:order-2 flex justify-center md:justify-end"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <div className="relative">
            {/* Decorative ring */}
            <motion.div
              className="absolute -inset-4 rounded-2xl border-2 border-gold/20 dark:border-dark-gold/20"
              animate={{ rotate: [0, 3, 0, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Photo */}
            <motion.div
              className="relative w-72 md:w-80 lg:w-96 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="/images/aparnaa-hero.jpg"
                alt="Appu S R — Author"
                className="w-full h-full object-cover object-top"
                style={{ maxHeight: '600px' }}
              />
              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream/80 dark:from-dark-bg/80 to-transparent" />
            </motion.div>

            {/* Floating badge — book name */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-surface rounded-xl shadow-elevation-3 px-4 py-3 border border-beige dark:border-dark-gold/20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs text-gold dark:text-dark-gold font-sans-modern uppercase tracking-widest mb-0.5">Latest Release</p>
              <p className="font-serif-heading text-charcoal dark:text-cream text-sm leading-snug max-w-[160px]">SundaraKandam: Hanuman's Divine Mission</p>
            </motion.div>

            {/* Floating badge — rating */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gold dark:bg-dark-gold rounded-xl shadow-elevation-3 px-4 py-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <p className="text-white dark:text-dark-bg font-serif-heading text-lg font-bold leading-none">5.0★</p>
              <p className="text-white/80 dark:text-dark-bg/80 text-xs font-sans-modern">Amazon Rating</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-charcoal/40 dark:text-ivory/40 hover:text-gold dark:hover:text-dark-gold transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-sans-modern tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
};
