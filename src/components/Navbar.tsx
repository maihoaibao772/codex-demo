import { Link, NavLink } from 'react-router-dom';
import { LayoutGroup, motion } from 'framer-motion';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/picture', label: 'Ảnh để đời' },
  { path: '/story', label: 'Story Mode' },
];

const linkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
};

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 top-0 z-50 w-full bg-gradient-to-b from-black/70 via-black/30 to-transparent px-6 py-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="gradient-text text-2xl font-semibold tracking-widest">
          mahiiruu_
        </Link>
        <LayoutGroup>
          <div className="flex items-center gap-6 text-sm uppercase tracking-[0.3em] text-white/60">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.15 * index, duration: 0.4 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'relative transition-colors hover:text-white',
                      isActive ? 'text-neon-cyan' : ''
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="relative">
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-purple"
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </motion.nav>
  );
}
