import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const smoothX = useSpring(x, { stiffness: 120, damping: 15, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 15, mass: 0.2 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX - 150);
      y.set(event.clientY - 150);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5]"
      aria-hidden
    >
      <motion.div
        className="h-72 w-72 rounded-full bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-pink-500/25 blur-3xl"
        style={{ translateX: smoothX, translateY: smoothY }}
      />
    </motion.div>
  );
};

export default CursorGlow;
