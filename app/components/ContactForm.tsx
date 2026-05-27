'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { Send, Check, AlertCircle } from 'lucide-react';

export const ContactForm = () => {
  const { ref, isVisible } = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields');
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call - replace with actual EmailJS integration
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus('success');
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setStatusMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-dark-surface/50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="font-serif-heading text-5xl md:text-6xl text-charcoal dark:text-cream mb-4 text-center"
            variants={fadeUpVariants}
          >
            Get in Touch
          </motion.h2>

          <motion.p
            className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-lg text-center mb-12"
            variants={fadeUpVariants}
          >
            Have a question or want to collaborate? I'd love to hear from you.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {/* Name Field */}
            <motion.div variants={fadeUpVariants}>
              <label className="block font-serif-body text-charcoal dark:text-cream mb-2">
                Name <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold dark:focus:ring-dark-gold text-charcoal dark:text-cream"
                placeholder="Your name"
                disabled={status === 'loading' || status === 'success'}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div variants={fadeUpVariants}>
              <label className="block font-serif-body text-charcoal dark:text-cream mb-2">
                Email <span className="text-gold">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold dark:focus:ring-dark-gold text-charcoal dark:text-cream"
                placeholder="your@email.com"
                disabled={status === 'loading' || status === 'success'}
              />
            </motion.div>

            {/* Subject Field */}
            <motion.div variants={fadeUpVariants}>
              <label className="block font-serif-body text-charcoal dark:text-cream mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold dark:focus:ring-dark-gold text-charcoal dark:text-cream"
                placeholder="What is this about?"
                disabled={status === 'loading' || status === 'success'}
              />
            </motion.div>

            {/* Message Field */}
            <motion.div variants={fadeUpVariants}>
              <label className="block font-serif-body text-charcoal dark:text-cream mb-2">
                Message <span className="text-gold">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-6 py-4 bg-cream dark:bg-dark-bg border border-beige dark:border-dark-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold dark:focus:ring-dark-gold text-charcoal dark:text-cream resize-none"
                placeholder="Your message here..."
                disabled={status === 'loading' || status === 'success'}
              />
            </motion.div>

            {/* Status Messages */}
            {status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  status === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}
              >
                {status === 'success' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="font-serif-body">{statusMessage}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2"
              disabled={status === 'loading' || status === 'success'}
              variants={fadeUpVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};
