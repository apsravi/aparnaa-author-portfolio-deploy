'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Instagram, BookOpen } from 'lucide-react';
import { useTheme } from '@/app/hooks/useTheme';

const INSTAGRAM = 'https://www.instagram.com/appusrwrites?igsh=Njh2dDdyaGJybHV0';
const AMAZON    = 'https://www.amazon.in/dp/B0GF2L5LX7';

const NAV = [
  { label: 'Home',          href: '#' },
  { label: 'About',         href: '#about' },
  { label: 'Books',         href: '#books' },
  { label: 'Bibliography',  href: '#published-books' },
  { label: 'Reviews',       href: '#reviews' },
  { label: 'Contact',       href: '#contact' },
];

export const Header = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [activeNav, setActiveNav] = useState('#');

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onKey]);

  const scrollTo = (href: string) => {
    setOpen(false);
    setActiveNav(href);
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 dark:bg-dark-surface/95 shadow-elevation-1 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => scrollTo('#')}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <motion.div
              className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center font-serif-heading text-white font-bold text-base shadow-sm"
              whileHover={{ scale: 1.08, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              A
            </motion.div>
            <div className="hidden sm:block">
              <p className="font-serif-heading text-charcoal dark:text-cream text-base leading-none group-hover:text-gold dark:group-hover:text-dark-gold transition-colors">
                Appu S R
              </p>
              <p className="text-[10px] text-charcoal/40 dark:text-ivory/40 font-sans-modern tracking-widest uppercase leading-none mt-0.5">
                Author
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`relative font-serif-body text-sm transition-colors group ${
                  activeNav === href
                    ? 'text-gold dark:text-dark-gold'
                    : 'text-charcoal/70 dark:text-ivory/70 hover:text-charcoal dark:hover:text-cream'
                }`}
              >
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-gold dark:bg-dark-gold transition-all duration-300 ${
                  activeNav === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Instagram */}
            <motion.a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center text-charcoal/60 dark:text-ivory/60 hover:text-gold dark:hover:text-dark-gold hover:bg-gold/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </motion.a>

            {/* Amazon book */}
            <motion.a
              href={AMAZON}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/20 text-gold dark:text-dark-gold font-sans-modern text-xs tracking-wide transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Buy Book
            </motion.a>

            {/* Theme toggle */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal/60 dark:text-ivory/60 hover:text-gold dark:hover:text-dark-gold hover:bg-gold/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'light'
                      ? <Moon className="w-4 h-4" />
                      : <Sun  className="w-4 h-4" />
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}

            {/* Hamburger */}
            <motion.button
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-charcoal dark:text-cream hover:bg-gold/10 transition-colors"
              onClick={() => setOpen(o => !o)}
              whileTap={{ scale: 0.9 }}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-charcoal/40 dark:bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-40 w-72 max-w-[85vw] bg-cream dark:bg-dark-surface shadow-[−4px_0_40px_rgba(0,0,0,0.2)] md:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-beige dark:border-dark-gold/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center font-serif-heading text-white text-sm font-bold">A</div>
                  <span className="font-serif-heading text-charcoal dark:text-cream text-base">Appu S R</span>
                </div>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-charcoal/60 dark:text-ivory/60 hover:bg-gold/10 transition-colors"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {NAV.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-serif-body text-base transition-all ${
                      activeNav === href
                        ? 'bg-gold/10 text-gold dark:text-dark-gold'
                        : 'text-charcoal dark:text-ivory hover:bg-gold/5 hover:text-gold dark:hover:text-dark-gold'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </nav>

              {/* Panel footer */}
              <div className="px-6 py-5 border-t border-beige dark:border-dark-gold/10 space-y-3">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-charcoal/70 dark:text-ivory/70 hover:text-gold dark:hover:text-dark-gold font-serif-body text-sm transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @appusrwrites on Instagram
                </a>
                <a
                  href={AMAZON}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-charcoal/70 dark:text-ivory/70 hover:text-gold dark:hover:text-dark-gold font-serif-body text-sm transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Buy SundaraKandam on Kindle
                </a>
                {mounted && (
                  <button
                    onClick={() => { toggleTheme(); setOpen(false); }}
                    className="flex items-center gap-3 text-charcoal/70 dark:text-ivory/70 font-serif-body text-sm"
                  >
                    {theme === 'light'
                      ? <><Moon className="w-4 h-4" /> Switch to Dark Mode</>
                      : <><Sun  className="w-4 h-4" /> Switch to Light Mode</>
                    }
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
