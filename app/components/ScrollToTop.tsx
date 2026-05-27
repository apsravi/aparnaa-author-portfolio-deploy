'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
      setVisible(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // SVG ring math
  const SIZE = 52;
  const STROKE = 3;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const dash = (progress / 100) * CIRC;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={`Scroll to top — ${Math.round(progress)}% read`}
          className="fixed bottom-6 right-5 z-50 group focus:outline-none"
          initial={{ opacity: 0, scale: 0.5, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 16 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Progress ring */}
          <svg
            width={SIZE} height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            {/* Track */}
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
              strokeWidth={STROKE} className="stroke-gold/20 dark:stroke-dark-gold/20" />
            {/* Fill */}
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
              strokeWidth={STROKE} strokeLinecap="round"
              strokeDasharray={`${dash} ${CIRC}`}
              className="stroke-gold dark:stroke-dark-gold transition-all duration-100" />
          </svg>

          {/* Button face */}
          <div className="relative w-[52px] h-[52px] rounded-full bg-white dark:bg-dark-surface border border-gold/20 dark:border-dark-gold/20 flex items-center justify-center shadow-elevation-3 group-hover:bg-gold dark:group-hover:bg-dark-gold transition-colors duration-200">
            <ChevronUp className="w-5 h-5 text-gold dark:text-dark-gold group-hover:text-white dark:group-hover:text-dark-bg transition-colors duration-200" />
          </div>

          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-xs font-sans-modern text-charcoal dark:text-ivory bg-white dark:bg-dark-surface border border-beige dark:border-dark-gold/20 px-2 py-1 rounded-md shadow-elevation-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {Math.round(progress)}% read
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
