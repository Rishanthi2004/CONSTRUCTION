import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/siteContent';
import { AnimatedWords } from './AnimatedWords';
import { MobileTouchCarousel } from './MobileTouchCarousel';

export function TestimonialsSection() {
  return (
    <section className="py-14 lg:py-24 bg-[#F1ECE3] border-b border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="pb-8 lg:pb-10 border-b border-[#E3DDD2]">
          <AnimatedWords
            as="p"
            stagger={0.04}
            text="06 · Testimonials"
            className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
          />
          <AnimatedWords
            as="h2"
            delay={0.05}
            text="Client perspectives."
            className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
          />
        </div>

        {/* Mobile View: Touch-Swipeable Review Carousel */}
        <MobileTouchCarousel
          className="mt-8 md:hidden"
          items={TESTIMONIALS}
          getKey={(item) => item.id}
          getAriaLabel={(item, idx) => `View review ${idx + 1} from ${item.name}`}
          nextLabel="Next Review"
          renderItem={(item) => (
            <blockquote className="h-full bg-[#FFFDF9] border border-[#E3DDD2] rounded-2xl p-6 flex flex-col justify-between shadow-[0_10px_28px_rgba(32,61,51,0.08)]">
              <div>
                <Quote className="w-6 h-6 text-[#B85A3A]" strokeWidth={1.5} />
                <AnimatedWords
                  as="p"
                  immediate
                  stagger={0.018}
                  duration={0.35}
                  text={`“${item.quote}”`}
                  className="mt-4 text-sm text-[#1B1F1D] leading-relaxed"
                />
              </div>

              <footer className="mt-6 pt-5 border-t border-[#EDE7DC]">
                <AnimatedWords
                  as="span"
                  immediate
                  delay={0.05}
                  stagger={0.03}
                  duration={0.34}
                  text={item.name}
                  className="block font-display text-sm font-semibold text-[#1B1F1D]"
                />
                <div className="mt-0.5 text-xs text-[#5C615D]">
                  {item.role} · {item.organization}
                </div>
                <div className="mt-2 text-xs font-medium text-[#203D33]">{item.project}</div>
              </footer>
            </blockquote>
          )}
        />

        {/* Desktop & Tablet View: 3-Column Grid */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#B85A3A]/70 rounded-2xl p-7 flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(32,61,51,0.1)]"
            >
              <div>
                <Quote
                  className="w-6 h-6 text-[#B85A3A] transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <AnimatedWords
                  as="p"
                  delay={idx * 0.06 + 0.08}
                  stagger={0.022}
                  duration={0.4}
                  text={`“${item.quote}”`}
                  className="mt-4 text-sm sm:text-[15px] text-[#1B1F1D] leading-relaxed"
                />
              </div>

              <footer className="mt-6 pt-5 border-t border-[#EDE7DC]">
                <AnimatedWords
                  as="span"
                  delay={idx * 0.06 + 0.16}
                  stagger={0.035}
                  duration={0.38}
                  text={item.name}
                  className="block font-display text-sm font-semibold text-[#1B1F1D]"
                />
                <div className="mt-0.5 text-xs text-[#5C615D]">
                  {item.role} · {item.organization}
                </div>
                <div className="mt-2 text-xs font-medium text-[#203D33]">{item.project}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
