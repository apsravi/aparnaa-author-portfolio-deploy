'use client';

/*
  EmailJS SETUP (free — 200 emails/month):
  ─────────────────────────────────────────
  1. Create account at https://www.emailjs.com
  2. Dashboard → Email Services → Add Service (Gmail recommended) → copy SERVICE_ID
  3. Dashboard → Email Templates → Create template with variables:
       Subject:  New subscriber: {{from_email}}
       Body:     Name: {{from_name}}\nEmail: {{from_email}}
     Copy TEMPLATE_ID
  4. Dashboard → Account → Public Key → copy PUBLIC_KEY
  5. In Netlify dashboard → Site settings → Environment variables, add:
       NEXT_PUBLIC_EMAILJS_SERVICE_ID  = your service id
       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = your template id
       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  = your public key
  6. Redeploy. Done — every subscriber sends you an email notification.
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

const SVC  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || '';
const TMPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || '';
const IS_CONFIGURED = !!(SVC && TMPL && KEY);

type Status = 'idle' | 'loading' | 'success' | 'error';

export const Newsletter = () => {
  const { ref, isVisible } = useInView();
  const [email, setEmail]   = useState('');
  const [name, setName]     = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg]       = useState('');

  const validate = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate(email)) {
      setStatus('error');
      setMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      if (IS_CONFIGURED) {
        const ejs = (await import('@emailjs/browser')).default;
        await ejs.send(SVC, TMPL, { from_name: name.trim() || 'Reader', from_email: email }, KEY);
      } else {
        // Dev/demo: simulate delay
        await new Promise(r => setTimeout(r, 1400));
      }
      setStatus('success');
      setMsg("You're subscribed! Thank you for joining the community.");
      setEmail(''); setName('');
      setTimeout(() => setStatus('idle'), 7000);
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please try again shortly.');
    }
  };

  return (
    <section id="newsletter" className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-brown/80 to-charcoal dark:from-[#0c0b09] dark:via-[#1a1510] dark:to-[#0c0b09]" />
      {/* Decorative rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-gold/8 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-gold/8 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Icon */}
          <motion.div variants={fadeUpVariants} className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-gold" />
            </div>
          </motion.div>

          <motion.p variants={fadeUpVariants} className="text-gold/80 font-sans-modern tracking-widest text-xs uppercase mb-3">
            Stay Connected
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            className="font-serif-heading text-cream mb-4"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
          >
            Join the Community
          </motion.h2>

          <motion.p variants={fadeUpVariants} className="text-cream/60 font-serif-body mb-10 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
            Subscribe for early access to new book launches, devotional reflections, and behind-the-scenes glimpses into the writing journey.
          </motion.p>

          {/* Form */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className="flex flex-col items-center gap-4 py-10"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-14 h-14 text-green-400" />
                </motion.div>
                <p className="text-cream font-serif-heading text-xl">You're in!</p>
                <p className="text-cream/60 font-serif-body text-sm">{msg}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-3"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name + Email row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    disabled={status === 'loading'}
                    className="flex-1 px-5 py-3.5 rounded-lg bg-white/10 border border-white/15 text-cream placeholder-cream/30 font-serif-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40 transition-all disabled:opacity-50"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={status === 'loading'}
                    className="flex-1 px-5 py-3.5 rounded-lg bg-white/10 border border-white/15 text-cream placeholder-cream/30 font-serif-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      className="flex items-center gap-2 text-red-400 text-sm font-serif-body"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {msg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-amber-500 text-charcoal font-serif-body font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-premium"
                  whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Subscribe</>
                  )}
                </motion.button>

                <p className="text-cream/30 font-sans-modern text-xs tracking-wide">
                  No spam, ever. Unsubscribe anytime.
                  {!IS_CONFIGURED && ' (Demo mode — configure EmailJS to activate)'}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
