'use client';

/*
  NETLIFY FORMS — zero setup.
  Submissions appear at: Netlify Dashboard → Forms → "newsletter"
  Enable email alerts: Forms → newsletter → Settings → Email Notifications
  → aparnaaraviwrites@gmail.com
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const Newsletter = () => {
  const { ref, isVisible } = useInView();
  const [email, setEmail] = useState('');
  const [name, setName]   = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg]       = useState('');

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error'); setMsg('Please enter a valid email address.'); return;
    }
    setStatus('loading');
    try {
      const body = new URLSearchParams({
        'form-name': 'newsletter',
        name: name.trim() || 'Reader',
        email,
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setMsg("You're subscribed! Welcome to the community.");
      setEmail(''); setName('');
      setTimeout(() => setStatus('idle'), 8000);
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* Hidden form for Netlify bot detection */}
      <form name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
      </form>

      <section id="newsletter" className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-brown/80 to-charcoal dark:from-[#0c0b09] dark:via-[#1a1510] dark:to-[#0c0b09]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-gold/8 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-gold/8 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} className="text-center">

            <motion.div variants={fadeUpVariants} className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-gold" />
              </div>
            </motion.div>

            <motion.p variants={fadeUpVariants} className="text-gold/80 font-sans-modern tracking-widest text-xs uppercase mb-3">Stay Connected</motion.p>

            <motion.h2 variants={fadeUpVariants} className="font-serif-heading text-cream mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
              Join the Community
            </motion.h2>

            <motion.p variants={fadeUpVariants} className="text-cream/60 font-serif-body mb-10 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
              Subscribe for early access to new book launches, devotional reflections, and behind-the-scenes glimpses into the writing journey.
            </motion.p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" className="flex flex-col items-center gap-4 py-10"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                    <CheckCircle2 className="w-14 h-14 text-green-400" />
                  </motion.div>
                  <p className="text-cream font-serif-heading text-xl">You're in!</p>
                  <p className="text-cream/60 font-serif-body text-sm">{msg}</p>
                </motion.div>
              ) : (
                <motion.form key="form"
                  name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} className="space-y-3"
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <input name="bot-field" type="hidden" />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="text" name="name" value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      disabled={status === 'loading'}
                      className="flex-1 px-5 py-3.5 rounded-lg bg-white/10 border border-white/15 text-cream placeholder-cream/30 font-serif-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/60 transition-all disabled:opacity-50" />
                    <input type="email" name="email" value={email} required
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={status === 'loading'}
                      className="flex-1 px-5 py-3.5 rounded-lg bg-white/10 border border-white/15 text-cream placeholder-cream/30 font-serif-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/60 transition-all disabled:opacity-50" />
                  </div>

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div className="flex items-center gap-2 text-red-400 text-sm font-serif-body"
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="w-4 h-4 shrink-0" />{msg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button type="submit" disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-amber-500 text-charcoal font-serif-body font-semibold rounded-lg transition-all disabled:opacity-60 shadow-premium"
                    whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}>
                    {status === 'loading'
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</>
                      : <><Sparkles className="w-4 h-4" /> Subscribe</>}
                  </motion.button>

                  <p className="text-cream/30 font-sans-modern text-xs tracking-wide">No spam, ever. Unsubscribe anytime.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};
