'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants, containerVariants } from '@/app/utils/animations';
import { useInView } from '@/app/hooks/useInView';

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

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-dark-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* Image */}
          <motion.div
            className="relative"
            variants={fadeUpVariants}
          >
            <motion.div
              className="relative overflow-hidden rounded-lg shadow-premium"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={profileImage}
                alt="Aparnaa Ravi"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
            <motion.h2
              className="font-serif-heading text-4xl md:text-5xl text-charcoal dark:text-cream mb-6"
              variants={fadeUpVariants}
            >
              About the Author
            </motion.h2>

            <motion.p
              className="text-charcoal dark:text-ivory/80 font-serif-body leading-relaxed mb-6 text-lg"
              variants={fadeUpVariants}
            >
              {bio}
            </motion.p>

            {/* Writing Areas */}
            <motion.div variants={fadeUpVariants}>
              <h3 className="text-gold dark:text-dark-gold font-serif-heading text-lg mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {writingAreas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-beige dark:bg-dark-gold/20 text-charcoal dark:text-dark-gold rounded-full text-sm font-serif-body"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          className="bg-gradient-to-r from-gold to-brown/50 dark:from-dark-gold/20 dark:to-dark-surface rounded-lg p-8 md:p-12 text-center my-20"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.p
            className="font-serif-heading text-2xl md:text-3xl text-white dark:text-cream italic leading-relaxed"
            variants={fadeUpVariants}
          >
            "{quote}"
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div>
          <motion.h3
            className="font-serif-heading text-4xl text-charcoal dark:text-cream mb-12 text-center"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            Writing Journey
          </motion.h3>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.year}
                className="flex gap-8 items-start"
                variants={fadeUpVariants}
              >
                <div className="flex-shrink-0 w-24">
                  <div className="text-gold dark:text-dark-gold font-serif-heading text-2xl font-bold">
                    {achievement.year}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gold/30 dark:border-dark-gold/30 pl-8">
                  <h4 className="font-serif-heading text-xl text-charcoal dark:text-cream mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-charcoal dark:text-ivory/70 font-serif-body">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
