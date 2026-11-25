import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/siteContent';
import { ArchitecturalImage } from './ArchitecturalImage';
import { AnimatedWords } from './AnimatedWords';
import { MobileTouchCarousel } from './MobileTouchCarousel';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForQuote }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-14 lg:py-20 bg-[#F1ECE3] border-b border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E3DDD2]">
          <div>
            <AnimatedWords
              as="p"
              stagger={0.04}
              text="02 · Services"
              className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
            />
            <AnimatedWords
              as="h2"
              delay={0.06}
              text="Core building disciplines."
              className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
            />
          </div>
          <AnimatedWords
            as="p"
            delay={0.14}
            stagger={0.025}
            duration={0.4}
            text="Executed in-house from structural engineering to final handover."
            className="text-xs sm:text-sm text-[#5C615D] max-w-xs"
          />
        </div>

        {/* Mobile View: Touch-Swipeable Service Card Carousel */}
        <MobileTouchCarousel
          className="mt-7 md:hidden"
          items={SERVICES}
          getKey={(svc) => svc.id}
          getTabLabel={(svc) => svc.number}
          getAriaLabel={(svc) => `View service ${svc.number}: ${svc.title}`}
          nextLabel="Next Service"
          renderItem={(service, _idx, _isActive, wasDragged) => (
            <motion.article
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                if (!wasDragged()) setActiveService(service);
              }}
              className="group h-full bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#B85A3A]/70 rounded-xl overflow-hidden flex flex-col shadow-[0_10px_28px_rgba(32,61,51,0.08)] cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden bg-[#EDE7DC]">
                <ArchitecturalImage
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover object-[50%_45%] pointer-events-none"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#5C615D]">
                    <span className="font-mono tabular-nums text-[#B85A3A] font-medium">
                      {service.number}
                    </span>
                    <span>{service.timeline}</span>
                  </div>
                  <AnimatedWords
                    as="h3"
                    immediate
                    stagger={0.03}
                    duration={0.35}
                    text={service.title}
                    className="mt-1.5 font-display text-lg font-semibold text-[#1B1F1D] tracking-tight"
                  />
                  <AnimatedWords
                    as="p"
                    immediate
                    delay={0.05}
                    stagger={0.015}
                    duration={0.32}
                    text={service.summary}
                    className="mt-2 text-xs text-[#5C615D] leading-relaxed line-clamp-3"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#203D33]">
                    <span>View Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-[#5C615D]">Tap card for details</span>
                </div>
              </div>
            </motion.article>
          )}
        />

        {/* Desktop & Tablet View: Compact Multi-Column Grid */}
        <div className="mt-8 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveService(service)}
              className="group bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#B85A3A]/70 rounded-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(32,61,51,0.1)] cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden bg-[#EDE7DC]">
                <ArchitecturalImage
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover object-[50%_45%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#5C615D]">
                    <span className="font-mono tabular-nums text-[#B85A3A] font-medium">
                      {service.number}
                    </span>
                    <span>{service.timeline}</span>
                  </div>
                  <AnimatedWords
                    as="h3"
                    delay={(index % 3) * 0.06 + 0.08}
                    stagger={0.035}
                    duration={0.42}
                    text={service.title}
                    className="mt-1.5 font-display text-base font-semibold text-[#1B1F1D] tracking-tight group-hover:text-[#203D33] transition-colors"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.45,
                      delay: (index % 3) * 0.06 + 0.16,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-1.5 text-xs sm:text-[13px] text-[#5C615D] leading-relaxed line-clamp-2"
                  >
                    {service.summary}
                  </motion.p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#203D33] group-hover:text-[#B85A3A] transition-colors">
                    <span>View Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#1B1F1D]/45 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF7F2] border border-[#E3DDD2] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
            >
              <div className="relative aspect-[16/9] bg-[#F1ECE3]">
                <ArchitecturalImage
                  src={activeService.image}
                  alt={activeService.alt}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFFDF9]/95 text-[#1B1F1D] hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-xs text-[#5C615D]">
                  <span className="font-mono text-[#B85A3A] font-medium">
                    Service {activeService.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeService.timeline}</span>
                </div>
                <h3
                  id="service-modal-title"
                  className="mt-2 font-display text-2xl font-semibold text-[#1B1F1D]"
                >
                  {activeService.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#5C615D] leading-relaxed">
                  {activeService.summary}
                </p>

                <ul className="mt-5 pt-5 border-t border-[#E3DDD2] space-y-2">
                  {activeService.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#1B1F1D]">
                      <Check className="w-4 h-4 text-[#203D33] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveService(null)}
                    className="px-4 py-2 text-sm font-medium text-[#5C615D] hover:text-[#1B1F1D] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const title = activeService.title;
                      setActiveService(null);
                      onSelectServiceForQuote(title);
                    }}
                    className="px-5 py-2.5 text-sm font-medium text-[#FAF7F2] bg-[#203D33] hover:bg-[#162B24] rounded-lg transition-colors cursor-pointer"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
