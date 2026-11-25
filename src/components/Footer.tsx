import { motion } from 'motion/react';
import { AnimatedWords } from './AnimatedWords';

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F1ECE3] border-t border-[#E3DDD2] py-10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <AnimatedWords
            as="span"
            stagger={0.045}
            text="Summit Builders"
            className="block font-display text-base font-semibold tracking-tight text-[#1B1F1D]"
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 text-xs text-[#5C615D]"
          >
            &copy; {new Date().getFullYear()} Summit Builders. Zurich · Portland.
          </motion.p>
        </div>

        <nav
          className="flex flex-wrap items-center gap-6 text-xs text-[#5C615D]"
          aria-label="Footer Navigation"
        >
          {FOOTER_LINKS.map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.08 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="hover:text-[#203D33] transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
