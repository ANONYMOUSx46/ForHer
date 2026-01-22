import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LiquidBackground from '@/components/LiquidBackground';
import FloatingHearts from '@/components/FloatingHearts';
import SplashCursor from '@/components/SplashCursor';
import HeroSection from '@/components/HeroSection';
import LoveNotes from '@/components/LoveNotes';
import ValentineQuestion from '@/components/ValentineQuestion';
import MusicPlayer from '@/components/MusicPlayer';
import GlassCard from '@/components/GlassCard';
import { Heart, Sparkles } from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 3D Liquid Background */}
      <LiquidBackground />
      
      {/* Floating Hearts */}
      <FloatingHearts />
      
      {/* Custom Splash Cursor */}
      <SplashCursor />
      
      {/* Music Player */}
      <MusicPlayer />

      {/* Main Content */}
      <main className="relative z-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Love Notes Section */}
        <section id="notes" className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block text-5xl mb-4"
            >
              💌
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-romantic mb-4">
              Little Notes From My Heart
            </h2>
            <p className="text-foreground/60 font-body max-w-md mx-auto">
              Every word written with love, every thought filled with you
            </p>
          </motion.div>

          <LoveNotes />
        </section>

        {/* Special Message Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <GlassCard delay={0.2} className="text-center p-8 md:p-12">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-10 h-10 text-accent" />
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold text-romantic mb-4">
                Why You're Special ✨
              </h3>
              
              <p className="text-foreground/80 font-body leading-relaxed text-lg mb-6">
                You're not just my girlfriend, you're my best friend, my confidant, 
                and the person I want to share every moment with. Your laugh is my favorite 
                sound, your smile is my favorite sight, and being with you is my favorite feeling.
              </p>
              
              <div className="flex justify-center gap-2">
                {['❤️', '💕', '💖', '💗', '💝'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Valentine Question Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="max-w-4xl mx-auto p-8 md:p-12">
              <ValentineQuestion />
            </GlassCard>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </motion.div>
            <p className="text-foreground/50 font-body text-sm">
              Made be meeee Your BoyFriend with alll my love, just for you 💖
            </p>
            <p className="text-foreground/30 font-body text-xs">
              Happy Valentine's Day 2026
            </p>
          </motion.div>
        </footer>
      </main>
    </div>
  );
};

export default Index;

