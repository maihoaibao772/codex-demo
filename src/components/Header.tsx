import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Quotes", href: "#quotes" },
  { label: "Contact", href: "#contact" },
  { label: "Linh Tinh", href: "#linh-tinh" }
];

const Header = () => {
  const [active, setActive] = useState<string>("About");

  const handleClick = (label: string, href: string) => {
    setActive(label);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur border-b border-white/10 bg-slate-950/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm uppercase tracking-[0.3em]">
        <span className="font-display text-lg text-white/80">mahiiruu_ Ultra</span>
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleClick(item.label, item.href)}
                className="relative px-2 py-1 font-medium text-white/75 transition-colors hover:text-white"
              >
                {item.label}
                {active === item.label && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
