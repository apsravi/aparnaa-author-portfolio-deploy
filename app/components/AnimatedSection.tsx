'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

/* ── Magnetic button — wraps any button/link ── */
export const MagneticWrap = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={move} onMouseLeave={reset} className={className}>
      {children}
    </motion.div>
  );
};

/* ── Counter — animates a number from 0 to value ── */
export const AnimatedCounter = ({
  value, suffix = '', duration = 1.5, className = '',
}: {
  value: number; suffix?: string; duration?: number; className?: string;
}) => {
  const motionVal = useMotionValue(0);
  const rounded   = useTransform(motionVal, v => `${Math.round(v)}${suffix}`);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => {
        const controls = { start: 0, end: value, duration };
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = (now - startTime) / 1000;
          const progress = Math.min(elapsed / controls.duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          motionVal.set(controls.start + (controls.end - controls.start) * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
};

/* ── Stagger container ── */
export const StaggerContainer = ({
  children, className = '', delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
    }}
  >
    {children}
  </motion.div>
);

/* ── Stagger child ── */
export const StaggerItem = ({
  children, className = '',
}: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    }}
  >
    {children}
  </motion.div>
);

/* ── Reveal on scroll with blur ── */
export const BlurReveal = ({
  children, className = '', delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

/* ── Scale reveal ── */
export const ScaleReveal = ({
  children, className = '', delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

/* ── Horizontal slide reveal ── */
export const SlideReveal = ({
  children, direction = 'left', className = '', delay = 0,
}: { children: ReactNode; direction?: 'left' | 'right'; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);
