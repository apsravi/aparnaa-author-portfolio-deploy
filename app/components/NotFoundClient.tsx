'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundClient() {
  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg flex items-center justify-center px-4 overflow-hidden relative">

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[220, 380, 540, 700].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-gold/8 dark:border-dark-gold/8"
            style={{ width: size, height: size }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 18 + i * 6, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">

        {/* Icon */}
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}>
          <div className="w-20 h-20 rounded-2xl bg-gold/10 dark:bg-dark-gold/10 border border-gold/20 dark:border-dark-gold/20 flex items-center justify-center shadow-premium">
            <Search className="w-9 h-9 text-gold dark:text-dark-gold" />
          </div>
        </motion.div>

        {/* Ghost 404 */}
        <motion.p
          className="font-serif-heading leading-none text-gold/10 dark:text-dark-gold/8 select-none font-bold -mb-4"
          style={{ fontSize: 'clamp(6rem, 20vw, 10rem)' }}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          404
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="font-serif-heading text-charcoal dark:text-cream mb-4"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}>
          This page wandered off
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="font-serif-body text-charcoal/60 dark:text-ivory/60 leading-relaxed mb-10 max-w-sm mx-auto"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Like Hanuman leaping across the ocean, this page has ventured somewhere unknown. Let's bring you back.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}>
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal dark:bg-gold text-cream dark:text-dark-bg font-serif-body font-semibold rounded-lg hover:opacity-90 transition-all shadow-elevation-2">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-charcoal dark:border-gold text-charcoal dark:text-gold font-serif-body font-semibold rounded-lg hover:bg-charcoal dark:hover:bg-gold hover:text-cream dark:hover:text-dark-bg transition-all">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </motion.div>

        {/* Book suggestion */}
        <motion.div className="border-t border-beige dark:border-dark-gold/10 pt-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <p className="text-xs text-charcoal/40 dark:text-ivory/30 font-sans-modern uppercase tracking-widest mb-4">
            While you're here
          </p>
          <Link href="/#books"
            className="inline-flex items-center gap-2 text-gold dark:text-dark-gold font-serif-body text-sm hover:underline underline-offset-4">
            <BookOpen className="w-4 h-4 shrink-0" />
            Read SundaraKandam: Hanuman's Divine Mission on Kindle
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
