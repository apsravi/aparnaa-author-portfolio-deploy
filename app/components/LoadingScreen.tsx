'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream dark:bg-dark-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        >
          {/* Spinning mandala rings */}
          <div className="relative w-24 h-24 mb-8">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold/30 dark:border-dark-gold/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-t-gold border-r-gold border-b-transparent border-l-transparent dark:border-t-dark-gold dark:border-r-dark-gold"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-gold/50 dark:border-dark-gold/40"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Center dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-3 h-3 rounded-full bg-gold dark:bg-dark-gold" />
            </motion.div>
          </div>

          {/* Name */}
          <motion.p
            className="font-serif-heading text-2xl text-charcoal dark:text-cream tracking-widest mb-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Appu S R
          </motion.p>
          <motion.p
            className="text-xs text-charcoal/40 dark:text-ivory/40 font-sans-modern tracking-[0.3em] uppercase"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            Devotional Fiction Author
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
