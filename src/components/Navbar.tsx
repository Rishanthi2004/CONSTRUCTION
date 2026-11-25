import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  onQuoteClick: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onQuoteClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E3DDD2] shadow-[0_2px_20px_rgba(27,31,29,0.06)]'
          : 'bg-gradient-to-b from-[#FAF7F2]/88 via-[#FAF7F2]/45 to-transparent'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-lg lg:text-xl font-semibold tracking-tight text-[#1B1F1D] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#203D33]"
        >
          Summit Builders
        </a>

        {/* Zone 2: Centered concise navigation links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Primary Navigation">
          {NAV_LINKS.map((item, idx) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className="relative py-1 text-sm font-medium text-[#1B1F1D]/85 hover:text-[#203D33] transition-colors duration-200 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#203D33]"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#B85A3A] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"
              />
            </motion.a>
          ))}
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onQuoteClick}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#FAF7F2] bg-[#203D33] hover:bg-[#162B24] rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85A3A]"
          >
            Get a Quote
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#1B1F1D] hover:bg-[#F1ECE3] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#FAF7F2] border-b border-[#E3DDD2] px-6 py-5 space-y-2 shadow-lg"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="block py-2.5 text-base font-medium text-[#1B1F1D] hover:text-[#203D33] border-b border-[#EDE7DC]"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onQuoteClick();
              }}
              className="w-full mt-3 py-3 px-5 text-sm font-medium text-[#FAF7F2] bg-[#203D33] hover:bg-[#162B24] rounded-lg transition-colors cursor-pointer"
            >
              Get a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
