import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const HeartIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        delay: 0,
        duration: 8 + Math.random() * 6,
        size: 12 + Math.random() * 24,
        opacity: 0.3 + Math.random() * 0.4,
      };
      setHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, newHeart.duration * 1000);
    };

    // Initial hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createHeart(), i * 500);
    }

    // Create new hearts periodically
    const interval = setInterval(createHeart, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              x: `${heart.x}vw`,
              y: '110vh',
              rotate: -20,
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              rotate: [0, 15, -15, 10, -10, 0],
              opacity: [0, heart.opacity, heart.opacity, heart.opacity, 0],
            }}
            transition={{
              duration: heart.duration,
              ease: 'linear',
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="absolute text-primary"
            style={{ 
              filter: 'drop-shadow(0 0 8px hsl(350, 80%, 55%))',
            }}
          >
            <motion.div
              animate={{
                x: [0, 20, -20, 15, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <HeartIcon size={heart.size} />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
