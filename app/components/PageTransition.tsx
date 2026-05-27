'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ReactNode } from 'react';

/* ── Reading Progress Bar ─────────────────────────────── */
export const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  // Spring-smoothed so it doesn't jump
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold via-amber-400 to-gold dark:from-dark-gold dark:via-amber-300 dark:to-dark-gold pointer-events-none"
      style={{ scaleX }}
    />
  );
};

/* ── Page Entry Fade ──────────────────────────────────── */
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Section Reveal (scroll-triggered) ───────────────── */
export const SectionReveal = ({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);
