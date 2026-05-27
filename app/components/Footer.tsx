'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUpVariants } from '@/app/utils/animations';
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Mail,
  Heart,
} from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

interface FooterProps {
  year?: number;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
    pinterest?: string;
  };
}

export const Footer = ({ year = new Date().getFullYear(), socialLinks = {} }: FooterProps) => {
  const socials: SocialLink[] = [
    { icon: <Instagram className="w-5 h-5" />, url: socialLinks.instagram || '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, url: socialLinks.linkedin || '#', label: 'LinkedIn' },
    { icon: <Facebook className="w-5 h-5" />, url: socialLinks.facebook || '#', label: 'Facebook' },
    { icon: <Youtube className="w-5 h-5" />, url: socialLinks.youtube || '#', label: 'YouTube' },
  ].filter(s => s.url !== '#');

  const footerLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Books', href: '#books' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy', href: '#' },
  ];

  return (
    <footer className="bg-charcoal dark:bg-dark-bg text-cream py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={fadeUpVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center font-serif-heading text-charcoal font-bold">
                AR
              </div>
              <span className="font-serif-heading text-lg font-semibold">Aparnaa Ravi</span>
            </div>
            <p className="font-serif-body text-cream/70 text-sm">
              Devotional fiction author crafting stories where ancient wisdom meets modern hearts.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpVariants}>
            <h3 className="font-serif-heading text-lg font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-gold transition-colors font-serif-body text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={fadeUpVariants}>
            <h3 className="font-serif-heading text-lg font-semibold mb-4 text-gold">Connect</h3>
            <div className="flex gap-4 mb-6">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gold/10 hover:bg-gold text-gold hover:text-charcoal transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <a
              href="mailto:hello@aparnaaravi.com"
              className="text-cream/70 hover:text-gold transition-colors font-serif-body text-sm flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              hello@aparnaaravi.com
            </a>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-cream/10 mb-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-serif-body text-cream/60 text-sm">
            © {year} Aparnaa Ravi. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-cream/60 font-serif-body text-sm">
            Made with <Heart className="w-4 h-4 fill-gold text-gold" /> for storytellers
          </div>

          <p className="font-serif-body text-cream/60 text-sm">
            Powered by modern web magic
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
