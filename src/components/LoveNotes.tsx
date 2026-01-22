import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const notes = [
  {
    title: "My Dearest Love 💕",
    message: "Every moment with you feels like a beautiful dream I never want to wake up from.",
  },
  {
    title: "You're My Everything 🌹",
    message: "Your smile lights up my world brighter than a thousand stars.",
  },
  {
    title: "Forever Yours 💖",
    message: "In a world full of chaos, you are my peace, my calm, my home.",
  },
  {
    title: "My Heart Beats For You 💗",
    message: "Every heartbeat whispers your name, every thought leads back to you.",
  },
];

const LoveNotes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
      {notes.map((note, index) => (
        <GlassCard key={index} delay={0.2 + index * 0.15}>
          <motion.div
            className="floating-heart inline-block mb-3"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <h3 className="text-xl font-display font-semibold text-romantic">
              {note.title}
            </h3>
          </motion.div>
          <p className="text-foreground/80 font-body leading-relaxed">
            {note.message}
          </p>
        </GlassCard>
      ))}
    </div>
  );
};

export default LoveNotes;
