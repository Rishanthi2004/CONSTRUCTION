import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ABOUT_IMAGE, ABOUT_SECONDARY_IMAGE, COMPANY_STATS } from '../data/siteContent';
import { ArchitecturalImage } from './ArchitecturalImage';
import { AnimatedWords } from './AnimatedWords';

function AnimatedStat({
  value,
  suffix = '',
  decimals = 0,
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let rafId = 0;
    const duration = 1000;
    const start = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < start) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="pt-5 border-t border-[#E3DDD2]"
    >
      <div className="font-display text-3xl lg:text-4xl font-semibold text-[#203D33] tracking-tight tabular-nums">
        {display.toFixed(decimals)}
        <span className="text-[#B85A3A]">{suffix}</span>
      </div>
      <AnimatedWords
        as="p"
        delay={delay + 0.1}
        stagger={0.03}
        text={label}
        className="mt-1.5 text-sm text-[#5C615D] leading-snug"
      />
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-14 lg:py-24 bg-[#FAF7F2] border-b border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* Dual Site Construction Photography Cards */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-[#E3DDD2] hover:border-[#B85A3A]/70 bg-[#F1ECE3] shadow-[0_8px_28px_rgba(27,31,29,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_36px_rgba(32,61,51,0.12)]"
            >
              <ArchitecturalImage
                src={ABOUT_SECONDARY_IMAGE}
                alt="Multi-storey brick masonry and reinforced concrete column structure under construction"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative aspect-[3/4] mt-4 sm:mt-6 rounded-xl overflow-hidden border border-[#E3DDD2] hover:border-[#B85A3A]/70 bg-[#F1ECE3] shadow-[0_8px_28px_rgba(27,31,29,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_36px_rgba(32,61,51,0.12)]"
            >
              <ArchitecturalImage
                src={ABOUT_IMAGE}
                alt="Timber-look and stacked stone exterior cladding craftsmanship on site"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <AnimatedWords
                as="p"
                stagger={0.04}
                text="01 · About Us"
                className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
              />

              <AnimatedWords
                as="h2"
                delay={0.06}
                text="Architectural discipline backed by structural certainty."
                className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
              />

              <AnimatedWords
                as="p"
                delay={0.2}
                stagger={0.018}
                duration={0.42}
                text="Since 2002, our chartered engineers and master builders have turned raw concrete frameworks and brick masonry into enduring custom residences and commercial landmarks under one transparent contract."
                className="mt-4 text-sm sm:text-base text-[#5C615D] leading-relaxed max-w-[56ch]"
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-5 sm:gap-x-8 gap-y-5 sm:gap-y-7">
              {COMPANY_STATS.map((stat, idx) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  label={stat.label}
                  delay={idx * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
