'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Instagram } from 'lucide-react';
import { useEffect, useRef } from 'react';

const FEED_ID    = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_ID || 'KQhk4mY2tm6FgwA3fXmb';
const IG_PROFILE = 'https://www.instagram.com/appusrwrites';
const IG_HANDLE  = '@appusrwrites';

export const InstagramFeed = () => {
  const { ref, isVisible } = useInView();
  const beholdRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!isVisible || scriptLoaded.current || !beholdRef.current) return;
    scriptLoaded.current = true;

    // Load Behold embed script
    const script = document.createElement('script');
    script.type  = 'module';
    script.src   = 'https://w.behold.so/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }, [isVisible]);

  return (
    <section id="instagram" className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-dark-surface/40">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div ref={ref} variants={fadeUpVariants} initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'} className="text-center mb-12">
          <p className="text-gold dark:text-dark-gold font-sans-modern tracking-widest text-xs uppercase mb-3">
            Follow Along
          </p>
          <h2 className="font-serif-heading text-charcoal dark:text-cream mb-4"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            On Instagram
          </h2>
          <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gold dark:text-dark-gold font-sans-modern text-sm hover:underline underline-offset-4">
            <Instagram className="w-4 h-4" /> {IG_HANDLE}
          </a>
        </motion.div>

        {/* Behold widget — auto-updates every 15 min when new post is added */}
        <motion.div
          ref={beholdRef}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          custom={1}
          className="w-full"
        >
          {/* @ts-ignore — Behold custom element */}
          <behold-widget feed-id={FEED_ID} />
        </motion.div>

        {/* Follow CTA */}
        <motion.div className="text-center mt-10" variants={fadeUpVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'} custom={2}>
          <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold/30 dark:border-dark-gold/30 rounded-full text-charcoal/60 dark:text-ivory/50 hover:text-gold dark:hover:text-dark-gold hover:border-gold dark:hover:border-dark-gold transition-all font-sans-modern text-xs tracking-widest uppercase">
            <Instagram className="w-4 h-4" /> Follow {IG_HANDLE}
          </a>
          <p className="text-charcoal/30 dark:text-ivory/20 font-sans-modern text-xs mt-3">
            Auto-updates when new posts are published
          </p>
        </motion.div>
      </div>
    </section>
  );
};
