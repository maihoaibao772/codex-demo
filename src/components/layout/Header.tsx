import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/Button';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/vocabulary', label: 'Từ vựng' },
  { to: '/flashcards', label: 'Flashcard' },
  { to: '/exercises', label: 'Bài tập' },
  { to: '/grammar', label: 'Ngữ pháp' },
  { to: '/roadmap', label: 'Lộ trình' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-primary">
          <span className="h-10 w-10 rounded-2xl bg-primary/10 grid place-items-center text-xl">🐼</span>
          <div className="leading-tight">
            <div>Chinese Zoo</div>
            <small className="text-xs text-slate-500">Learn Mandarin</small>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-primary ${isActive ? 'text-primary' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button as={Link} to="/roadmap" size="sm">
            Bắt đầu HSK 1
          </Button>
        </div>
        <button
          className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((p) => !p)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-2 py-2 transition hover:bg-primary/5 ${isActive ? 'text-primary' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button as={Link} to="/roadmap" size="sm" className="w-full">
              Bắt đầu HSK 1
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
