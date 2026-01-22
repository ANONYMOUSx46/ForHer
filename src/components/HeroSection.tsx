import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative"
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 left-10 md:left-20"
      >
        <Sparkles className="w-8 h-8 text-accent sparkle" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-32 right-10 md:right-20"
      >
        <Heart className="w-10 h-10 text-primary floating-heart" fill="currentColor" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-40 left-20"
      >
        <Heart className="w-6 h-6 text-secondary floating-heart" style={{ animationDelay: '1s' }} fill="currentColor" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-6"
        >
          <span className="text-7xl md:text-9xl">💕</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-7xl font-display font-bold mb-6"
        >
          <span className="text-romantic">To My</span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-foreground"
          >
            Beautiful Valentine
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-lg md:text-xl text-foreground/70 font-body max-w-xl mx-auto mb-8"
        >
          A little something special, just for you, the one who makes my heart skip a beat every single day 💖
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <a
              href="#notes"
              className="love-button px-8 py-4 text-lg text-primary-foreground inline-flex items-center gap-2"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              Read My Love Notes
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground font-body text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll down</span>
          <span className="text-2xl">💝</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
