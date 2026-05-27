'use client';

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ZoomIn } from 'lucide-react';

/* ── Types ── */
interface LightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  bookLink?: string;
  bookTitle?: string;
  bookSubtitle?: string;
}

/* ── Main Lightbox ── */
export const ImageLightbox = ({
  src, alt, isOpen, onClose, bookLink, bookTitle, bookSubtitle,
}: LightboxProps) => {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 flex flex-col items-center max-w-xs sm:max-w-sm w-full"
            initial={{ opacity: 0, scale: 0.8, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <motion.button
              onClick={onClose}
              className="absolute -top-5 -right-5 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close lightbox"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
              <img src={src} alt={alt} className="w-full h-auto object-cover" />
            </div>

            {/* Caption */}
            {(bookTitle || bookLink) && (
              <motion.div
                className="mt-5 text-center space-y-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                {bookTitle && (
                  <p className="font-serif-heading text-white text-lg leading-snug">{bookTitle}</p>
                )}
                {bookSubtitle && (
                  <p className="font-serif-body text-white/50 text-sm italic">{bookSubtitle}</p>
                )}
                {bookLink && (
                  <a
                    href={bookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gold hover:text-amber-300 font-sans-modern text-xs tracking-widest uppercase transition-colors mt-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Buy on Amazon India
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── ZoomableImage wrapper — drop-in replacement ── */
export const ZoomableImage = ({
  src, alt, className = '', bookLink, bookTitle, bookSubtitle,
}: {
  src: string; alt: string; className?: string;
  bookLink?: string; bookTitle?: string; bookSubtitle?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`relative cursor-zoom-in group ${className}`}
        onClick={() => src && setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && src && setOpen(true)}
        aria-label={`View ${alt} full size`}
      >
        <img
          src={src} alt={alt}
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Zoom hint overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 flex items-center justify-center transition-all duration-300">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <ImageLightbox
        src={src} alt={alt} isOpen={open} onClose={() => setOpen(false)}
        bookLink={bookLink} bookTitle={bookTitle} bookSubtitle={bookSubtitle}
      />
    </>
  );
};
