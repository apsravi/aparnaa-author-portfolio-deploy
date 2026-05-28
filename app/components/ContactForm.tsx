'use client';

/*
  NETLIFY FORMS — zero setup required.
  On deploy, Netlify auto-detects the `data-netlify="true"` attribute
  and captures every submission.

  To get email notifications:
  1. Go to Netlify Dashboard → Forms → "contact"
  2. Click Settings → Email Notifications → Add email
  3. Enter: aparnaaraviwrites@gmail.com
  Done — every contact form submission emails you directly.
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Mail, User, Tag, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const ContactForm = () => {
  const { ref, isVisible } = useInView();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.';
    if (form.message.trim().length < 10) return 'Message must be at least 10 characters.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setStatus('error'); setMsg(err); return; }
    setStatus('loading');
    try {
      // Netlify Forms submission
      const body = new URLSearchParams({
        'form-name': 'contact',
        name: form.name,
        email: form.email,
        subject: form.subject || 'Website Inquiry',
        message: form.message,
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
      setMsg("Message sent! Appu S R will get back to you soon.");
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 8000);
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please email directly: aparnaaraviwrites@gmail.com');
    }
  };

  const inputBase = "w-full pl-10 pr-4 py-3.5 rounded-xl bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/15 text-charcoal dark:text-cream font-serif-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 dark:focus:ring-dark-gold/50 transition-all placeholder-charcoal/30 dark:placeholder-ivory/20 disabled:opacity-50";

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-dark-surface/40">

      {/* Hidden Netlify form for bot detection */}
      <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message" />
      </form>

      <div className="max-w-2xl mx-auto">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={fadeUpVariants} className="text-center mb-12">
            <p className="text-gold dark:text-dark-gold font-sans-modern tracking-widest text-xs uppercase mb-3">Say Hello</p>
            <h2 className="font-serif-heading text-charcoal dark:text-cream mb-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
              Get in Touch
            </h2>
            <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-sm leading-relaxed">
              For reader queries, collaborations, or book club requests —{' '}
              <a href="mailto:aparnaaraviwrites@gmail.com" className="text-gold dark:text-dark-gold hover:underline">
                aparnaaraviwrites@gmail.com
              </a>
            </p>
          </motion.div>

          {/* Form / Success toggle */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="success"
                className="flex flex-col items-center gap-5 py-16 text-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </motion.div>
                <h3 className="font-serif-heading text-2xl text-charcoal dark:text-cream">Message Sent!</h3>
                <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body">{msg}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                name="contact"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
              >
                {/* Honeypot */}
                <input name="bot-field" type="hidden" />

                {/* Name */}
                <motion.div variants={fadeUpVariants} className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 dark:text-ivory/30" />
                  <input
                    type="text" name="name" value={form.name} required
                    onChange={e => set('name', e.target.value)}
                    placeholder="Your name"
                    disabled={status === 'loading'}
                    className={inputBase}
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUpVariants} className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 dark:text-ivory/30" />
                  <input
                    type="email" name="email" value={form.email} required
                    onChange={e => set('email', e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === 'loading'}
                    className={inputBase}
                  />
                </motion.div>

                {/* Subject */}
                <motion.div variants={fadeUpVariants} className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 dark:text-ivory/30" />
                  <input
                    type="text" name="subject" value={form.subject}
                    onChange={e => set('subject', e.target.value)}
                    placeholder="What is this about? (optional)"
                    disabled={status === 'loading'}
                    className={inputBase}
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUpVariants} className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-charcoal/30 dark:text-ivory/30" />
                  <textarea
                    name="message" value={form.message} required rows={5}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Your message…"
                    disabled={status === 'loading'}
                    className={`${inputBase} resize-none pt-4`}
                  />
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm font-serif-body"
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <AlertCircle className="w-4 h-4 shrink-0" />{msg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  variants={fadeUpVariants}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-charcoal dark:bg-gold text-cream dark:text-dark-bg font-serif-body font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-elevation-2"
                  whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading'
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    : <><Send className="w-4 h-4" /> Send Message</>}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
