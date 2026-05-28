'use client';


import { motion } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';
import { BookOpen, MapPin, Feather } from 'lucide-react';
import { BlurReveal, StaggerContainer, StaggerItem } from '@/app/components/AnimatedSection';

interface Achievement {
  year: number;
  title: string;
  description: string;
}

interface AboutProps {
  bio: string;
  profileImage: string;
  achievements: Achievement[];
  quote: string;
  writingAreas: string[];
}

export const AboutAuthor = ({ bio, profileImage, achievements, quote, writingAreas }: AboutProps) => {
  const { ref, isVisible } = useInView();
  const bioParagraphs = bio.split('\n\n').filter(Boolean);

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-dark-surface/40">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          ref={ref}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <p className="text-gold dark:text-dark-gold font-serif-body tracking-widest text-sm mb-3 uppercase">The Writer</p>
          <h2 className="font-serif-heading text-5xl md:text-6xl text-charcoal dark:text-cream">
            About the Author
          </h2>
        </motion.div>

        {/* Two-column: photo + bio */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-20"
        >
          {/* Photo */}
          <motion.div variants={fadeUpVariants} className="relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-premium"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={profileImage}
                alt="Appu S R"
                className="w-full h-auto object-cover object-top"
                style={{ maxHeight: '520px' }}
              />
              {/* Gold overlay stripe at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-cream font-serif-body text-sm">Chennai, India</span>
                </div>
              </div>
            </motion.div>

            {/* Expertise floating card */}
            <motion.div
              className="absolute -right-4 top-12 bg-white dark:bg-dark-surface rounded-xl shadow-elevation-3 p-4 border border-beige dark:border-dark-gold/20 max-w-[160px]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Feather className="w-5 h-5 text-gold dark:text-dark-gold mb-2" />
              <p className="font-serif-heading text-charcoal dark:text-cream text-sm leading-snug">Pen Name</p>
              <p className="text-gold dark:text-dark-gold font-bold text-base font-serif-heading">Appu S R</p>
            </motion.div>
          </motion.div>

          {/* Bio text */}
          <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
            {bioParagraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUpVariants}
                className={`font-serif-body leading-relaxed text-charcoal/80 dark:text-ivory/80 text-base md:text-lg ${i < bioParagraphs.length - 1 ? 'mb-5' : 'mb-8'}`}
              >
                {para}
              </motion.p>
            ))}

            {/* Writing areas */}
            <BlurReveal delay={0.2}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-gold dark:text-dark-gold" />
                <h3 className="text-gold dark:text-dark-gold font-serif-heading text-lg">Writing Specialisations</h3>
              </div>
              <StaggerContainer className="flex flex-wrap gap-2">
                {writingAreas.map((area) => (
                  <StaggerItem key={area}>
                    <motion.span
                      className="px-4 py-1.5 bg-cream dark:bg-dark-bg border border-gold/20 dark:border-dark-gold/20 text-charcoal dark:text-ivory rounded-full text-sm font-serif-body inline-block"
                      whileHover={{ scale: 1.06, borderColor: 'rgba(212,175,55,0.6)', y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {area}
                    </motion.span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </BlurReveal>
          </motion.div>
        </motion.div>

        {/* Quote band */}
        <motion.div
          className="relative rounded-2xl overflow-hidden my-20"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-brown to-charcoal dark:from-dark-surface dark:via-dark-gold/20 dark:to-dark-surface" />
          <div className="relative px-8 md:px-16 py-12 text-center">
            <p className="text-4xl text-gold/30 dark:text-dark-gold/20 font-serif-heading leading-none mb-4">"</p>
            <p className="font-serif-heading text-xl md:text-2xl text-cream dark:text-cream italic leading-relaxed max-w-3xl mx-auto">
              {quote}
            </p>
            <p className="mt-6 text-sm text-cream/50 dark:text-ivory/40 font-sans-modern tracking-widest uppercase">— Appu S R</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUpVariants} className="text-center mb-12">
            <p className="text-gold dark:text-dark-gold font-serif-body tracking-widest text-sm mb-2 uppercase">Milestones</p>
            <h3 className="font-serif-heading text-4xl text-charcoal dark:text-cream">Writing Journey</h3>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[2.75rem] top-0 bottom-0 w-px bg-gold/20 dark:bg-dark-gold/20 hidden md:block" />

            <div className="space-y-8">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6 md:gap-10 items-start"
                  variants={fadeUpVariants}
                >
                  {/* Year bubble */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gold/10 dark:bg-dark-gold/10 border-2 border-gold/30 dark:border-dark-gold/30 flex items-center justify-center z-10">
                    <span className="text-gold dark:text-dark-gold font-serif-heading text-sm font-bold">{a.year}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-6 pt-3">
                    <h4 className="font-serif-heading text-xl text-charcoal dark:text-cream mb-1">{a.title}</h4>
                    <p className="text-charcoal/60 dark:text-ivory/60 font-serif-body text-sm leading-relaxed">{a.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
