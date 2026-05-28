'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Play, Instagram, ExternalLink, Volume2, Sparkles, BookOpen } from 'lucide-react';

const REEL_URL  = 'https://www.instagram.com/reel/DY3iK78x19Y/';
const EMBED_URL = 'https://www.instagram.com/reel/DY3iK78x19Y/embed/';
const IG_HANDLE  = '@appusrwrites';
const IG_PROFILE = 'https://www.instagram.com/appusrwrites';

/* Floating sparkle particle */
const Particle = ({ delay, x, size }: { delay: number; x: string; size: number }) => (
  <motion.div
    className="absolute pointer-events-none rounded-full bg-gold/40 dark:bg-dark-gold/30"
    style={{ width: size, height: size, left: x, bottom: '10%' }}
    animate={{ y: [0, -260, 0], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* Animated star burst */
const StarBurst = ({ className }: { className: string }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
  >
    {[...Array(6)].map((_, i) => (
      <div key={i}
        className="absolute w-0.5 h-6 bg-gold/20 dark:bg-dark-gold/20 origin-bottom"
        style={{ transform: `rotate(${i * 60}deg) translateY(-100%)` }}
      />
    ))}
  </motion.div>
);

export const PromoVideo = () => {
  const { ref, isVisible } = useInView();
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* Tilt effect on video card */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetTilt = () => { mouseX.set(0); mouseY.set(0); };

  /* Typing animation for tagline */
  const words = ['A story for little hearts.', 'Devotion made simple.', 'Coming soon to Kindle.'];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    const target = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIdx, isVisible]);

  return (
    <section id="promo-video" className="relative py-24 md:py-36 px-4 md:px-8 overflow-hidden">

      {/* ── Multi-layer animated background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c07] via-[#1a1408] to-[#0c0b09]" />

      {/* Slow radial pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.07), transparent)' }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none"
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <Particle key={i} delay={i * 0.7} x={`${8 + i * 11}%`} size={3 + (i % 3)} />
      ))}

      {/* Star bursts */}
      <StarBurst className="top-16 left-16 w-12 h-12" />
      <StarBurst className="bottom-20 right-20 w-8 h-8" />

      {/* Corner decorative lines */}
      {[['top-8 left-8', 'border-t border-l'], ['top-8 right-8', 'border-t border-r'],
        ['bottom-8 left-8', 'border-b border-l'], ['bottom-8 right-8', 'border-b border-r']
      ].map(([pos, border], i) => (
        <motion.div key={i}
          className={`absolute w-12 h-12 ${pos} ${border} border-gold/20 dark:border-dark-gold/20`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div ref={ref} variants={fadeUpVariants} initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'} className="text-center mb-14">

          {/* Animated badge */}
          <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-5"
            animate={{ borderColor: ['rgba(212,175,55,0.2)', 'rgba(212,175,55,0.5)', 'rgba(212,175,55,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity }}>
            <motion.div className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-gold font-sans-modern text-xs tracking-widest uppercase">Sneak Peek</span>
            <Sparkles className="w-3 h-3 text-gold" />
          </motion.div>

          <motion.h2 className="font-serif-heading text-cream mb-3"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
            variants={fadeUpVariants}>
            Coming Soon to Kindle
          </motion.h2>

          {/* Typing tagline */}
          <div className="h-7 flex items-center justify-center">
            <p className="font-serif-body text-gold/80 text-base md:text-lg italic">
              {displayed}
              <motion.span className="inline-block w-0.5 h-5 bg-gold ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
            </p>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: 3D tilt video card ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={fadeUpVariants} initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'} custom={1}
          >
            <motion.div
              className="relative w-full max-w-xs"
              style={{ rotateX, rotateY, transformPerspective: 800 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              {/* Glow behind card */}
              <motion.div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.2), transparent 70%)' }}
              />

              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-[0_40px_100px_rgba(0,0,0,0.7)]">

                {/* Pre-play overlay */}
                <AnimatePresence>
                  {!playing && (
                    <motion.div
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-charcoal/60 to-charcoal/95 cursor-pointer"
                      initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.35 }}
                      onClick={() => setPlaying(true)}
                    >
                      {/* Ripple rings around play button */}
                      {[1, 2, 3].map(i => (
                        <motion.div key={i}
                          className="absolute rounded-full border border-gold/20"
                          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
                          style={{ width: 80, height: 80 }}
                        />
                      ))}

                      {/* Play button */}
                      <motion.div
                        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-premium cursor-pointer mb-5 z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ boxShadow: ['0 0 0 0 rgba(212,175,55,0.4)', '0 0 0 20px rgba(212,175,55,0)', '0 0 0 0 rgba(212,175,55,0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="w-8 h-8 text-charcoal fill-charcoal ml-1" />
                      </motion.div>

                      <motion.p className="text-cream font-serif-heading text-lg z-10"
                        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                        Watch the Reel
                      </motion.p>
                      <div className="flex items-center gap-1.5 mt-1 z-10">
                        <Instagram className="w-3.5 h-3.5 text-cream/50" />
                        <span className="text-cream/50 font-sans-modern text-xs">{IG_HANDLE}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video */}
                <div style={{ aspectRatio: '9/16', minHeight: 420 }} className="bg-charcoal relative">
                  {playing && (
                    <iframe src={EMBED_URL} className="absolute inset-0 w-full h-full"
                      frameBorder="0" scrolling="no" allowTransparency={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title="Upcoming Children's Devotional Book — Appu S R"
                    />
                  )}
                </div>

                {/* Watermark — always on top */}
                <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
                  <div className="bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent px-4 pt-10 pb-4 flex items-end justify-between">
                    <div>
                      <p className="font-serif-heading text-gold text-sm font-bold leading-tight">Appu S R</p>
                      <p className="text-cream/50 font-sans-modern text-[10px] tracking-wider uppercase">Devotional Author · Chennai</p>
                    </div>
                    <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
                      className="pointer-events-auto flex items-center gap-1 text-cream/60 hover:text-gold transition-colors">
                      <Instagram className="w-3.5 h-3.5" />
                      <span className="font-sans-modern text-[11px]">{IG_HANDLE}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating label card */}
              <motion.div
                className="absolute -bottom-5 -left-5 bg-white dark:bg-dark-surface border border-gold/20 rounded-xl px-4 py-2.5 shadow-elevation-3"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-gold font-sans-modern text-[10px] uppercase tracking-widest mb-0.5">Coming Soon</p>
                <p className="font-serif-heading text-charcoal dark:text-cream text-sm leading-snug max-w-[130px]">
                  Children's Devotional Book
                </p>
              </motion.div>

              {/* Floating Kindle badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-br from-gold to-amber-500 rounded-xl px-3 py-2 shadow-premium"
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <BookOpen className="w-4 h-4 text-charcoal" />
                <p className="text-charcoal font-bold text-[10px] font-sans-modern mt-0.5">Kindle</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right: Description ── */}
          <motion.div
            className="text-center lg:text-left space-y-6"
            variants={fadeUpVariants} initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'} custom={2}
          >
            {/* Label */}
            <motion.div className="inline-flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}>
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold font-sans-modern text-xs tracking-widest uppercase">Next Book</span>
            </motion.div>

            <div>
              <h3 className="font-serif-heading text-cream mb-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
                A Devotional Book<br />
                <span className="text-gold">for Little Hearts</span>
              </h3>
              <p className="text-cream/60 font-serif-body leading-relaxed text-sm md:text-base">
                Appu S R's next work is a children's devotional story — bringing the wisdom of ancient India to young readers in a language that's simple, joyful, and deeply meaningful. The reel above is the first glimpse.
              </p>
            </div>

            {/* Feature list with animated entrance */}
            <div className="space-y-3">
              {[
                { icon: '📖', text: 'Written for children aged 5–12 years' },
                { icon: '🙏', text: 'Rooted in devotion and Indian spiritual tradition' },
                { icon: '✨', text: 'Simple language, rich illustrations (planned)' },
                { icon: '📱', text: 'Publishing on Kindle — coming soon' },
              ].map((item, i) => (
                <motion.div key={i} className="flex items-center gap-3 justify-center lg:justify-start"
                  initial={{ opacity: 0, x: -16 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}>
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <p className="text-cream/70 font-serif-body text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <motion.a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-charcoal font-serif-body font-semibold rounded-lg text-sm hover:opacity-90 transition-all shadow-premium"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Instagram className="w-4 h-4" /> Follow for Updates
              </motion.a>
              <motion.a href={REEL_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold/40 text-gold font-serif-body text-sm rounded-lg hover:bg-gold/10 transition-all"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <ExternalLink className="w-4 h-4" /> Watch on Instagram
              </motion.a>
            </div>

            {/* Sound hint */}
            <motion.p className="flex items-center gap-2 text-cream/25 font-sans-modern text-xs justify-center lg:justify-start"
              animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Volume2 className="w-3 h-3" /> Enable sound for the full experience
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Instagram CTA */}
        <motion.div className="text-center mt-14"
          variants={fadeUpVariants} initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'} custom={3}>
          <motion.a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold/20 rounded-full text-cream/40 hover:text-gold hover:border-gold/50 transition-all font-sans-modern text-xs tracking-widest uppercase"
            whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.6)' }}>
            <Instagram className="w-4 h-4" /> Follow {IG_HANDLE} for updates
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
