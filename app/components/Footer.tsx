'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Heart, ExternalLink, BookOpen, Instagram } from 'lucide-react';

interface FooterProps {
  year?: number;
  socialLinks?: Record<string, string>;
  contact?: { email: string };
}

export const Footer = ({ year = new Date().getFullYear(), socialLinks = {}, contact }: FooterProps) => {
  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Books', href: '#books' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const amazonLink = socialLinks?.amazon || 'https://www.amazon.in/dp/B0GF2L5LX7';
  const instagramLink = socialLinks?.instagram || '';

  return (
    <footer className="bg-charcoal dark:bg-[#0a0906] text-cream py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-serif-heading text-charcoal font-bold text-lg">
                AR
              </div>
              <div>
                <p className="font-serif-heading text-cream text-lg leading-none">Aparnaa Ravi</p>
                <p className="text-cream/40 text-xs font-sans-modern">Pen name: Appu S R</p>
              </div>
            </div>
            <p className="font-serif-body text-cream/60 text-sm leading-relaxed mb-5">
              Devotional fiction author bringing the Ramayana and ancient epics to modern readers — one heartfelt story at a time.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {instagramLink && (
                <motion.a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/20 flex items-center justify-center text-gold transition-all"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
              )}
              <motion.a
                href={amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/20 flex items-center justify-center text-gold transition-all"
                whileHover={{ scale: 1.1 }}
                aria-label="Amazon Author Page"
              >
                <BookOpen className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif-heading text-gold text-base mb-5 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 hover:text-gold transition-colors font-serif-body text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Amazon CTA */}
          <div>
            <h3 className="font-serif-heading text-gold text-base mb-5 tracking-wide">Get in Touch</h3>
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors font-serif-body text-sm mb-5"
              >
                <Mail className="w-4 h-4" />
                {contact.email}
              </a>
            )}
            {instagramLink && (
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors font-serif-body text-sm mb-5"
              >
                <Instagram className="w-4 h-4" />
                @appusrwrites
              </a>
            )}
            <motion.a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-lg text-gold text-sm font-serif-body transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <BookOpen className="w-4 h-4" />
              View Book on Amazon
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-cream/10 mb-8" />

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-serif-body text-cream/40 text-sm">
            © {year} Aparnaa Ravi (Appu S R). All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-cream/40 font-serif-body text-sm">
            Made with <Heart className="w-3.5 h-3.5 fill-gold text-gold mx-0.5" /> for devotional readers
          </div>
        </motion.div>

      </div>
    </footer>
  );
};
