'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Play, Instagram, ExternalLink, Volume2 } from 'lucide-react';

const REEL_URL   = 'https://www.instagram.com/reel/DY3iK78x19Y/';
const EMBED_URL  = 'https://www.instagram.com/reel/DY3iK78x19Y/embed/';
const IG_HANDLE  = '@appusrwrites';
const IG_PROFILE = 'https://www.instagram.com/appusrwrites';

export const PromoVideo = () => {
  const { ref, isVisible } = useInView();
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <section id="promo-video" className="py-20 md:py-32 px-4 md:px-8 bg-charcoal dark:bg-[#0a0906] overflow-hidden relative">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <p className="text-gold font-sans-modern tracking-widest text-xs uppercase mb-3">Watch & Share</p>
          <h2 className="font-serif-heading text-cream mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            Book Reel
          </h2>
          <p className="text-cream/50 font-serif-body text-sm">
            A glimpse into the devotional world of SundaraKandam
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          custom={1}
          className="flex flex-col lg:flex-row gap-10 items-center justify-center"
        >
          {/* Instagram embed */}
          <div className="relative w-full max-w-sm mx-auto">

            {/* Watermark frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-gold/20">

              {/* Pre-play overlay */}
              <AnimatePresence>
                {!playing && (
                  <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-charcoal/80 backdrop-blur-sm cursor-pointer"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setPlaying(true)}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-premium mb-4"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="w-8 h-8 text-charcoal fill-charcoal ml-1" />
                    </motion.div>
                    <p className="text-cream font-serif-heading text-lg">Watch Reel</p>
                    <p className="text-cream/50 font-sans-modern text-xs mt-1 flex items-center gap-1">
                      <Instagram className="w-3 h-3" /> {IG_HANDLE}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Instagram embed iframe */}
              <div className="relative bg-black" style={{ aspectRatio: '9/16', minHeight: '480px' }}>
                {playing ? (
                  <iframe
                    ref={iframeRef}
                    src={EMBED_URL}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Appu S R — SundaraKandam Book Reel"
                  />
                ) : (
                  /* Placeholder before play */
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gradient-to-b from-charcoal/60 to-charcoal/90"
                    onClick={() => setPlaying(true)}
                  >
                    <div className="text-center p-8">
                      <div className="w-24 h-32 mx-auto mb-4 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                        <span className="font-serif-heading text-gold text-2xl">SR</span>
                      </div>
                      <p className="font-serif-heading text-cream text-base">SundaraKandam</p>
                      <p className="text-cream/40 text-xs font-sans-modern mt-1">Hanuman's Divine Mission</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Watermark overlay — always visible */}
              <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
                <div className="bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent px-4 pt-8 pb-4 flex items-end justify-between">
                  <div>
                    <p className="font-serif-heading text-gold text-sm font-bold leading-tight">Appu S R</p>
                    <p className="text-cream/60 font-sans-modern text-[10px] tracking-wider uppercase">Devotional Fiction Author</p>
                  </div>
                  <a
                    href={IG_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto flex items-center gap-1.5 text-cream/70 hover:text-gold transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="font-sans-modern text-xs">{IG_HANDLE}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-3xl border border-gold/10 -z-10 pointer-events-none" />
          </div>

          {/* Right side text */}
          <div className="max-w-sm text-center lg:text-left space-y-6">
            <motion.div variants={fadeUpVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} custom={2}>
              <h3 className="font-serif-heading text-cream mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
                SundaraKandam:<br />
                <span className="text-gold">Hanuman's Divine Mission</span>
              </h3>
              <p className="text-cream/60 font-serif-body text-sm leading-relaxed">
                A heartfelt retelling of the Ramayana's most uplifting chapter — narrated for the modern devotional reader. Follow Hanuman's courage, surrender, and boundless faith in Shri Rama.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} custom={3}
              className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a href="https://www.amazon.in/dp/B0GF2L5LX7" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold text-charcoal font-serif-body font-semibold rounded-lg hover:bg-amber-500 transition-all text-sm">
                Buy on Kindle — ₹199
              </a>
              <a href={REEL_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-gold/40 text-gold font-serif-body text-sm rounded-lg hover:bg-gold/10 transition-all">
                <Instagram className="w-4 h-4" />
                View on Instagram
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>

            <motion.div variants={fadeUpVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} custom={4}
              className="flex items-center justify-center lg:justify-start gap-2 text-cream/30 font-sans-modern text-xs">
              <Volume2 className="w-3 h-3" />
              <span>Enable sound for the full experience</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Instagram follow CTA */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          custom={5}
          className="text-center mt-12"
        >
          <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold/20 rounded-full text-cream/50 hover:text-gold hover:border-gold/50 transition-all font-sans-modern text-xs tracking-widest uppercase">
            <Instagram className="w-4 h-4" />
            Follow {IG_HANDLE} for more
          </a>
        </motion.div>

      </div>
    </section>
  );
};
