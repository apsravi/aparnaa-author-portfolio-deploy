'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Mail, Check, AlertCircle } from 'lucide-react';

export const Newsletter = () => {
  const { ref, isVisible } = useInView();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call - replace with actual EmailJS integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email.');
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-gold dark:bg-dark-gold/10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div variants={fadeUpVariants}>
            <Mail className="w-12 h-12 text-white dark:text-dark-gold mx-auto mb-6" />
          </motion.div>

          <motion.h2
            className="font-serif-heading text-5xl md:text-6xl text-white dark:text-cream mb-4"
            variants={fadeUpVariants}
          >
            Join the Community
          </motion.h2>

          <motion.p
            className="text-white/90 dark:text-ivory/80 font-serif-body text-lg mb-8 leading-relaxed"
            variants={fadeUpVariants}
          >
            Subscribe to receive exclusive updates about new releases, devotional reflections, and behind-the-scenes insights into my creative journey.
          </motion.p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeUpVariants}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-charcoal dark:text-dark-bg font-serif-body focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-cream"
              disabled={status === 'loading' || status === 'success'}
            />
            <motion.button
              type="submit"
              className="px-8 py-4 bg-white dark:bg-cream text-charcoal dark:text-dark-bg font-serif-body font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </motion.button>
          </motion.form>

          {/* Status Messages */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: status !== 'idle' ? 1 : 0,
              y: status !== 'idle' ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex items-center justify-center gap-2"
          >
            {status === 'success' && (
              <>
                <Check className="w-5 h-5 text-white dark:text-green-400" />
                <span className="text-white dark:text-cream font-serif-body">{message}</span>
              </>
            )}
            {status === 'error' && (
              <>
                <AlertCircle className="w-5 h-5 text-white dark:text-red-400" />
                <span className="text-white dark:text-cream font-serif-body">{message}</span>
              </>
            )}
          </motion.div>

          <motion.p
            className="text-white/70 dark:text-ivory/60 font-serif-body text-sm mt-6"
            variants={fadeUpVariants}
          >
            No spam, just meaningful content. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
