import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import gsap from 'gsap';
import { Heart, Sparkles, Star } from 'lucide-react';

const ValentineQuestion = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [noPositions, setNoPositions] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [noClickCount, setNoClickCount] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const noMessages = [
    "No 💔",
    "Are you sure?",
    "Really?? 🥺",
    "Think again!",
    "Pretty please? 🙏",
    "I'll be sad 😢",
    "One more chance!",
    "Final answer? 😭",
  ];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNoHover = useCallback((index: number) => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 60;
    
    setNoPositions((prev) => ({
      ...prev,
      [index]: {
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      },
    }));
  }, []);

  const handleNoClick = useCallback((index: number) => {
    setNoClickCount((prev) => prev + 1);
    handleNoHover(index);
  }, [handleNoHover]);

  const handleYesClick = useCallback(() => {
    setShowCelebration(true);
    
    // GSAP celebration animation
    if (yesButtonRef.current) {
      gsap.to(yesButtonRef.current, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: 'elastic.out(1, 0.3)',
      });
    }

    // Create floating hearts
    const createCelebrationHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.cssText = `
        position: fixed;
        font-size: ${20 + Math.random() * 30}px;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        pointer-events: none;
        z-index: 10000;
      `;
      document.body.appendChild(heart);

      gsap.to(heart, {
        y: -window.innerHeight - 100,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720 - 360,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        ease: 'power1.out',
        onComplete: () => heart.remove(),
      });
    };

    // Burst of hearts
    for (let i = 0; i < 30; i++) {
      setTimeout(createCelebrationHeart, i * 100);
    }
  }, []);

  const noButtons = Array.from({ length: Math.min(6 + noClickCount, 15) }, (_, i) => ({
    id: i,
    message: noMessages[Math.min(noClickCount, noMessages.length - 1)],
  }));

  // Position for the hidden yes button among the no buttons
  const yesButtonPosition = Math.floor(noButtons.length / 2);

  return (
    <div ref={containerRef} className="relative min-h-[400px] py-12">
      {showCelebration && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={300}
          colors={['#ff4d6d', '#ff6b8a', '#ff9ecd', '#ffb3c6', '#ffd1dc', '#ff85a2']}
          gravity={0.1}
        />
      )}

      <AnimatePresence mode="wait">
        {!showCelebration ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block text-6xl mb-4"
              >
                💝
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-romantic mb-4">
                Will You Be My Valentine?
              </h2>
              <p className="text-foreground/70 font-body">
                Find the hidden "Yes" button if you love me! 💕
              </p>
              {noClickCount > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground mt-2"
                >
                  Hint: The more you click "No", the more buttons appear... 🤭
                </motion.p>
              )}
            </motion.div>

            <div className="relative flex flex-wrap justify-center gap-4 max-w-3xl mx-auto px-4">
              {noButtons.map((btn, index) => (
                <motion.div
                  key={btn.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    ...(noPositions[btn.id] && {
                      x: noPositions[btn.id].x - (containerRef.current?.getBoundingClientRect().left || 0) - 75,
                      y: noPositions[btn.id].y - (containerRef.current?.getBoundingClientRect().top || 0) - 200,
                    }),
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{ position: noPositions[btn.id] ? 'absolute' : 'relative' }}
                >
                  {index === yesButtonPosition ? (
                    <motion.button
                      ref={yesButtonRef}
                      onClick={handleYesClick}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="love-button px-8 py-3 text-primary-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <Heart className="w-5 h-5" fill="currentColor" />
                        Yes! 💖
                        <Heart className="w-5 h-5" fill="currentColor" />
                      </span>
                    </motion.button>
                  ) : (
                    <motion.button
                      onMouseEnter={() => handleNoHover(btn.id)}
                      onClick={() => handleNoClick(btn.id)}
                      whileHover={{ scale: 0.9 }}
                      className="no-button px-6 py-3 text-muted-foreground"
                    >
                      {btn.message}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              💖
            </motion.div>
            
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-display font-bold text-romantic mb-4"
            >
              YAY! I Love You! 🥰
            </motion.h2>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-foreground/80 font-body mb-8"
            >
              You've made me the happiest person in the world!
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="flex justify-center gap-4"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className="text-4xl"
                >
                  {['❤️', '💕', '💖', '💗', '💝'][i]}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex justify-center gap-2"
            >
              {[Sparkles, Heart, Star, Heart, Sparkles].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="text-primary"
                >
                  <Icon className="w-6 h-6" fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineQuestion;
