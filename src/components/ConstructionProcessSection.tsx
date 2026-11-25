import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONSTRUCTION_PROCESS } from '../data/siteContent';
import { AnimatedWords } from './AnimatedWords';
import { ArchitecturalImage } from './ArchitecturalImage';
import { MobileTouchCarousel } from './MobileTouchCarousel';

export function ConstructionProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = CONSTRUCTION_PROCESS[activeIndex];

  const selectStage = (nextIndex: number) => {
    const normalized = (nextIndex + CONSTRUCTION_PROCESS.length) % CONSTRUCTION_PROCESS.length;
    setActiveIndex(normalized);
  };

  const handleNext = () => {
    selectStage(activeIndex + 1);
  };

  return (
    <section id="process" className="py-14 lg:py-28 bg-[#FAF7F2] border-b border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 lg:pb-10 border-b border-[#E3DDD2]">
          <div>
            <AnimatedWords
              as="p"
              stagger={0.04}
              text="05 · Construction Process"
              className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
            />
            <AnimatedWords
              as="h2"
              delay={0.05}
              text="From planning to key handover."
              className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
            />
          </div>
          <AnimatedWords
            as="p"
            delay={0.14}
            stagger={0.025}
            duration={0.4}
            text="Select any phase to inspect how each build rises from raw land to finished landmark."
            className="text-xs sm:text-sm text-[#5C615D] max-w-sm"
          />
        </div>

        {/* Mobile View: Touch-Swipeable Construction Phase Carousel */}
        <MobileTouchCarousel
          className="mt-7 lg:hidden"
          items={CONSTRUCTION_PROCESS}
          getKey={(stage) => stage.step}
          getTabLabel={(stage) => stage.step}
          getAriaLabel={(stage) => `Phase ${stage.step}: ${stage.title}`}
          nextLabel="Next Phase"
          renderItem={(stage) => (
            <div className="h-full bg-[#FFFDF9] border border-[#E3DDD2] rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_12px_30px_rgba(32,61,51,0.08)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE7DC]">
                <ArchitecturalImage
                  src={stage.image}
                  alt={stage.alt}
                  className="w-full h-full object-cover object-[50%_55%] pointer-events-none"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1B1F1D]/80 via-[#1B1F1D]/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-[#FAF7F2]">
                  <div className="font-mono text-[11px] tabular-nums text-[#E79E82]">
                    Phase {stage.step} · {stage.duration}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E79E82] shrink-0" />
                    <span>{stage.milestone}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <AnimatedWords
                    as="h3"
                    immediate
                    stagger={0.03}
                    duration={0.35}
                    text={stage.title}
                    className="font-display text-lg font-semibold text-[#1B1F1D] tracking-tight"
                  />
                  <AnimatedWords
                    as="p"
                    immediate
                    delay={0.05}
                    stagger={0.015}
                    duration={0.32}
                    text={stage.description}
                    className="mt-1.5 text-xs text-[#5C615D] leading-relaxed"
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-[#EDE7DC]">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-medium text-[#1B1F1D]">Completion Benchmark</span>
                    <span className="font-mono tabular-nums text-[#203D33] font-semibold">
                      {stage.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F1ECE3] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#203D33] rounded-full transition-all duration-500"
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        {/* Desktop View: Unique Split Architectural Elevation Stepper & Live Visual Stage */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Left: Vertical Structural Datum Index */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            <div className="relative pl-6 border-l border-[#E3DDD2] space-y-2">
              {CONSTRUCTION_PROCESS.map((stage, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.button
                    key={stage.step}
                    type="button"
                    onClick={() => selectStage(idx)}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative w-full text-left px-5 py-4 rounded-xl transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#F1ECE3] text-[#1B1F1D]'
                        : 'bg-transparent text-[#5C615D] hover:bg-[#F1ECE3]/65 hover:text-[#1B1F1D]'
                    }`}
                  >
                    {/* Animated Active Datum Bar on the Vertical Axis */}
                    {isActive && (
                      <motion.span
                        layoutId="process-active-datum"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        aria-hidden="true"
                        className="absolute -left-[25px] top-3 bottom-3 w-[3px] rounded-full bg-[#203D33]"
                      />
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={`font-mono text-xs tabular-nums font-medium shrink-0 ${
                            isActive ? 'text-[#B85A3A]' : 'text-[#5C615D]/70'
                          }`}
                        >
                          {stage.step}
                        </span>
                        <AnimatedWords
                          as="span"
                          delay={idx * 0.04 + 0.06}
                          stagger={0.03}
                          duration={0.38}
                          text={stage.title}
                          className={`font-display text-base sm:text-lg font-semibold tracking-tight truncate ${
                            isActive ? 'text-[#203D33]' : 'text-[#1B1F1D]'
                          }`}
                        />
                      </div>

                      <span className="font-mono text-[11px] tabular-nums text-[#5C615D] shrink-0">
                        {stage.duration}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <AnimatedWords
                            as="p"
                            immediate
                            stagger={0.018}
                            duration={0.35}
                            text={stage.description}
                            className="mt-2 pl-7 text-sm text-[#5C615D] leading-relaxed"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Architectural Phase Blueprint Viewport */}
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="lg:col-span-7 flex flex-col justify-between bg-[#F1ECE3] border border-[#E3DDD2] hover:border-[#B85A3A]/60 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(32,61,51,0.1)]"
          >
            {/* Visual Frame */}
            <div className="relative flex-1 min-h-[380px] overflow-hidden bg-[#E3DDD2]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.step}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <ArchitecturalImage
                    src={activeStage.image}
                    alt={activeStage.alt}
                    className="w-full h-full object-cover object-[50%_55%]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle Architectural Framing Scrim */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1B1F1D]/80 via-[#1B1F1D]/30 to-transparent"
              />

              {/* Bottom Stage Readout */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4 text-[#FAF7F2]">
                <div key={activeStage.step}>
                  <AnimatedWords
                    as="span"
                    immediate
                    stagger={0.03}
                    duration={0.35}
                    text={`Phase ${activeStage.step} / 06 · ${activeStage.duration}`}
                    className="block font-mono text-xs tabular-nums text-[#E79E82]"
                  />
                  <div className="mt-1 flex items-center gap-2 text-base font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#E79E82] shrink-0" />
                    <AnimatedWords
                      as="span"
                      immediate
                      delay={0.05}
                      stagger={0.03}
                      duration={0.38}
                      text={activeStage.milestone}
                    />
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04, x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#1B1F1D] bg-[#FFFDF9] hover:bg-[#F1ECE3] rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {activeIndex === CONSTRUCTION_PROCESS.length - 1 ? 'Restart' : 'Next Stage'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

            {/* Bottom Architectural Completion Meter */}
            <div className="px-6 py-4 bg-[#FFFDF9] border-t border-[#E3DDD2] flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-2">
                  <AnimatedWords
                    key={`meter-${activeStage.step}`}
                    as="span"
                    immediate
                    stagger={0.03}
                    duration={0.35}
                    text={`${activeStage.title} Completion Benchmark`}
                    className="font-medium text-[#1B1F1D]"
                  />
                  <span className="font-mono tabular-nums text-[#203D33] font-semibold">
                    {activeStage.progress}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#F1ECE3] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#203D33] rounded-full"
                    initial={false}
                    animate={{ width: `${activeStage.progress}%` }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
