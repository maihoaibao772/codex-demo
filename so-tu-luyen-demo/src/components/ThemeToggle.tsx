import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (window.localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label="Đổi giao diện"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-10 w-[72px] items-center justify-between rounded-full bg-slate-200 p-1 transition-colors dark:bg-slate-800',
        'focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/60'
      )}
    >
      <Sun className="h-5 w-5 text-amber-500" />
      <Moon className="h-5 w-5 text-slate-500" />
      <motion.span
        layout
        className="absolute inset-y-1 w-8 rounded-full bg-white shadow-sm dark:bg-slate-700"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ left: theme === 'dark' ? 'calc(100% - 2.5rem)' : '0.25rem' }}
      />
    </button>
  );
};

export default ThemeToggle;
