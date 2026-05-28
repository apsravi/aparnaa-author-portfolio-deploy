'use client';

/*
  INSTAGRAM FEED SETUP — Free, no API approval needed (5 minutes):
  ──────────────────────────────────────────────────────────────────
  1. Go to https://behold.so (free account)
  2. Click "Connect Instagram" → authorize @appusrwrites
  3. Copy your Feed ID (looks like: abc123xyz)
  4. In Netlify Dashboard → Environment Variables → add:
       NEXT_PUBLIC_INSTAGRAM_FEED_ID = your_feed_id
  5. Redeploy — your latest Instagram posts appear automatically
  
  Feed updates every 15 minutes. Every new Instagram post appears on
  your site within 15 minutes. No token renewal. No API approval.
  Free for up to 30 posts shown.
*/

import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Instagram, ExternalLink, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const FEED_ID       = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_ID || '';
const IG_PROFILE    = 'https://www.instagram.com/appusrwrites';
const IG_HANDLE     = '@appusrwrites';
const BEHOLD_SETUP  = 'https://behold.so';

interface Post {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

export const InstagramFeed = () => {
  const { ref, isVisible } = useInView();
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    if (!FEED_ID) { setLoading(false); return; }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`https://feeds.behold.so/${FEED_ID}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPosts(data.slice(0, 9)); // Show latest 9 posts (3x3 grid)
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="instagram" className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-dark-surface/40">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div ref={ref} variants={fadeUpVariants} initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'} className="text-center mb-12">
          <p className="text-gold dark:text-dark-gold font-sans-modern tracking-widest text-xs uppercase mb-3">Follow Along</p>
          <h2 className="font-serif-heading text-charcoal dark:text-cream mb-3"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            On Instagram
          </h2>
          <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gold dark:text-dark-gold font-sans-modern text-sm hover:underline">
            <Instagram className="w-4 h-4" />{IG_HANDLE}
          </a>
        </motion.div>

        {/* Feed grid */}
        {!FEED_ID ? (
          // Setup prompt — shown until Behold is configured
          <motion.div variants={fadeUpVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
            className="text-center py-16 border-2 border-dashed border-gold/20 dark:border-dark-gold/20 rounded-2xl">
            <Instagram className="w-10 h-10 text-gold/40 mx-auto mb-4" />
            <p className="font-serif-heading text-charcoal dark:text-cream text-xl mb-2">Connect Instagram</p>
            <p className="text-charcoal/50 dark:text-ivory/50 font-serif-body text-sm mb-6 max-w-sm mx-auto">
              Set up your free Behold feed to automatically display your latest Instagram posts here.
            </p>
            <a href={BEHOLD_SETUP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-charcoal font-serif-body font-semibold rounded-lg text-sm hover:opacity-90 transition-all">
              <ExternalLink className="w-4 h-4" /> Set up free at Behold.so
            </a>
          </motion.div>
        ) : loading ? (
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-square bg-beige dark:bg-dark-surface rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-charcoal/40 dark:text-ivory/40">
            <RefreshCw className="w-8 h-8 mx-auto mb-3" />
            <p className="font-serif-body text-sm">Could not load posts. Visit Instagram directly.</p>
            <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-gold text-sm hover:underline">
              <Instagram className="w-4 h-4" /> Visit {IG_HANDLE}
            </a>
          </div>
        ) : (
          <motion.div className="grid grid-cols-3 gap-2 md:gap-4"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
            {posts.map((post, i) => (
              <motion.a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-xl group"
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
                whileHover={{ scale: 1.03, zIndex: 10 }}>
                <img src={post.mediaUrl} alt={post.caption?.slice(0, 60) || `Post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-center justify-center">
                  <Instagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Video indicator */}
                {post.mediaType === 'VIDEO' && (
                  <div className="absolute top-2 right-2 bg-charcoal/60 rounded-full p-1">
                    <svg className="w-3 h-3 text-white fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Follow CTA */}
        <motion.div className="text-center mt-10" variants={fadeUpVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
          <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold/30 dark:border-dark-gold/30 rounded-full text-charcoal/60 dark:text-ivory/50 hover:text-gold dark:hover:text-dark-gold hover:border-gold dark:hover:border-dark-gold transition-all font-sans-modern text-xs tracking-widest uppercase"
          >
            <Instagram className="w-4 h-4" /> Follow {IG_HANDLE} on Instagram
          </a>
          {FEED_ID && (
            <p className="text-charcoal/30 dark:text-ivory/20 font-sans-modern text-xs mt-3">
              Auto-updates every 15 minutes
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
