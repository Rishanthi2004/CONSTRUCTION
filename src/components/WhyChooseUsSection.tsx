import { motion } from 'motion/react';
import { ShieldCheck, Eye, Compass, Clock, Layers } from 'lucide-react';
import { WHY_CHOOSE_PILLARS } from '../data/siteContent';
import { AnimatedWords } from './AnimatedWords';
import { MobileTouchCarousel } from './MobileTouchCarousel';

const PILLAR_ICONS = [ShieldCheck, Eye, Compass, Clock, Layers];

export function WhyChooseUsSection() {
  return (
    <section className="py-14 lg:py-24 bg-[#F1ECE3] border-b border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 lg:pb-10 border-b border-[#E3DDD2]">
          <div>
            <AnimatedWords
              as="p"
              stagger={0.04}
              text="04 · Why Summit"
              className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
            />
            <AnimatedWords
              as="h2"
              delay={0.05}
              text="Measurable engineering precision."
              className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
            />
          </div>
          <AnimatedWords
            as="p"
            delay={0.14}
            stagger={0.025}
            duration={0.4}
            text="Verified quality, transparent cost tracking, and contractual delivery certainty."
            className="text-xs sm:text-sm text-[#5C615D] max-w-sm"
          />
        </div>

        {/* Mobile View: Touch-Swipeable Pillar Carousel */}
        <MobileTouchCarousel
          className="mt-7 md:hidden"
          items={WHY_CHOOSE_PILLARS}
          getKey={(pillar) => pillar.number}
          getTabLabel={(pillar) => pillar.number}
          getAriaLabel={(pillar) => `View pillar ${pillar.number}: ${pillar.title}`}
          nextLabel="Next Standard"
          renderItem={(pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            return (
              <div className="h-full bg-[#FFFDF9] border border-[#E3DDD2] rounded-xl p-5 flex flex-col justify-between shadow-[0_10px_26px_rgba(32,61,51,0.07)]">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#F1ECE3] border border-[#E3DDD2] flex items-center justify-center text-[#203D33]">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-[#B85A3A] font-semibold">
                    {pillar.metric}
                  </span>
                </div>

                <div className="mt-5">
                  <AnimatedWords
                    as="h3"
                    immediate
                    stagger={0.03}
                    duration={0.35}
                    text={pillar.title}
                    className="font-display text-lg font-semibold text-[#1B1F1D] tracking-tight"
                  />
                  <AnimatedWords
                    as="p"
                    immediate
                    delay={0.05}
                    stagger={0.015}
                    duration={0.32}
                    text={pillar.description}
                    className="mt-2 text-xs text-[#5C615D] leading-relaxed"
                  />
                </div>
              </div>
            );
          }}
        />

        {/* Desktop & Tablet View: Multi-Column Grid */}
        <div className="mt-10 hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {WHY_CHOOSE_PILLARS.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
                className="group bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#B85A3A]/70 rounded-xl p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(32,61,51,0.1)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#F1ECE3] border border-[#E3DDD2] flex items-center justify-center text-[#203D33] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#B85A3A]/50">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[11px] tabular-nums text-[#B85A3A] font-medium">
                    {pillar.metric}
                  </span>
                </div>

                <div className="mt-6">
                  <AnimatedWords
                    as="h3"
                    delay={idx * 0.06 + 0.08}
                    stagger={0.035}
                    duration={0.42}
                    text={pillar.title}
                    className="font-display text-base font-semibold text-[#1B1F1D] tracking-tight group-hover:text-[#203D33] transition-colors"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.06 + 0.16,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-2 text-xs sm:text-sm text-[#5C615D] leading-relaxed"
                  >
                    {pillar.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
