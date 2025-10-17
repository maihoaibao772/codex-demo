import { Sparkles, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

type FooterProps = {
  showFX: boolean;
  toggleFX: () => void;
  showWave: boolean;
  toggleWave: () => void;
};

export function Footer({ showFX, toggleFX, showWave, toggleWave }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="relative z-30 border-t border-white/10 bg-black/40 px-6 py-6 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm tracking-[0.4em] text-white/50">
          © mahiiruu_ 2025 | crafted in chaos.
        </p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={showFX ? 'default' : 'outline'}
            size="sm"
            onClick={toggleFX}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>{showFX ? 'FX ON' : 'FX OFF'}</span>
          </Button>
          <Button
            type="button"
            variant={showWave ? 'default' : 'outline'}
            size="sm"
            onClick={toggleWave}
            className="flex items-center gap-2"
          >
            <Waves className="h-4 w-4" />
            <span>{showWave ? 'Wave ON' : 'Wave OFF'}</span>
          </Button>
        </div>
      </div>
    </motion.footer>
  );
}
