import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { PROJECTS, ProjectItem, TRANSFORMATIONS } from '../data/siteContent';
import { ArchitecturalImage } from './ArchitecturalImage';
import { AnimatedWords } from './AnimatedWords';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { MobileTouchCarousel } from './MobileTouchCarousel';

type ProjectFilter = 'All' | 'Residential' | 'Commercial' | 'Estate';

interface ProjectsSectionProps {
  onInquireProject: (projectTitle: string, category: string) => void;
}

const FILTERS: ProjectFilter[] = ['All', 'Residential', 'Commercial', 'Estate'];

export function ProjectsSection({ onInquireProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const handleFilterChange = (cat: ProjectFilter) => {
    setFilter(cat);
  };

  return (
    <section id="projects" className="py-14 lg:py-20 bg-[#FAF7F2] border-b border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* Interactive Before & After Construction Transformation */}
        <div className="pb-12 border-b border-[#E3DDD2]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
            <div>
              <AnimatedWords
                as="p"
                stagger={0.04}
                text="03 · Site-to-Finish Transformations"
                className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
              />
              <AnimatedWords
                as="h2"
                delay={0.05}
                text="From raw structure to finished residence."
                className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
              />
            </div>
            <AnimatedWords
              as="p"
              delay={0.14}
              stagger={0.025}
              duration={0.4}
              text="Drag across to compare structural construction with completed delivery."
              className="text-xs sm:text-sm text-[#5C615D] max-w-xs"
            />
          </div>

          <div className="max-w-4xl">
            {TRANSFORMATIONS.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.58,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.008 }}
                className="bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#B85A3A]/70 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(32,61,51,0.1)]"
              >
                <div className="md:col-span-6">
                  <BeforeAfterSlider
                    beforeSrc={item.beforeSrc}
                    afterSrc={item.afterSrc}
                    beforeAlt={item.beforeAlt}
                    afterAlt={item.afterAlt}
                    mode={item.mode}
                    aspectClass="aspect-[4/3]"
                    alignBottomCrop={item.alignBottomCrop}
                  />
                </div>
                <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[#F1ECE3]/55">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-2 text-[11px] text-[#5C615D]"
                    >
                      <span className="font-medium text-[#203D33]">{item.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{item.area}</span>
                    </motion.div>
                    <AnimatedWords
                      as="h3"
                      delay={0.1}
                      stagger={0.04}
                      duration={0.44}
                      text={item.title}
                      className="mt-2 font-display text-xl font-semibold text-[#1B1F1D] tracking-tight"
                    />
                    <AnimatedWords
                      as="p"
                      delay={0.18}
                      stagger={0.02}
                      duration={0.38}
                      text={item.summary}
                      className="mt-2 text-xs sm:text-sm text-[#5C615D] leading-relaxed"
                    />
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E3DDD2] flex items-center justify-between">
                    <span className="text-[11px] text-[#5C615D]">
                      Drag slider to compare stages
                    </span>
                    <motion.button
                      type="button"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onInquireProject(item.title, 'Residential')}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#203D33] hover:text-[#B85A3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Build Similar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Featured Portfolio Grid */}
        <div className="pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E3DDD2]">
            <div>
              <AnimatedWords
                as="p"
                stagger={0.04}
                text="Featured Projects"
                className="text-xs font-medium tracking-[0.14em] uppercase text-[#B85A3A]"
              />
              <AnimatedWords
                as="h2"
                delay={0.05}
                text="Selected architectural landmarks."
                className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.12]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-1 p-1 bg-[#F1ECE3] border border-[#E3DDD2] rounded-lg self-start md:self-auto"
              role="tablist"
              aria-label="Filter featured projects by category"
            >
              {FILTERS.map((cat) => {
                const active = filter === cat;
                return (
                  <motion.button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#203D33] text-[#FAF7F2]'
                        : 'text-[#5C615D] hover:text-[#1B1F1D]'
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Mobile View: Touch-Swipeable Project Card Carousel */}
          <MobileTouchCarousel
            className="mt-7 md:hidden"
            items={visibleProjects}
            resetDependency={filter}
            getKey={(proj) => proj.id}
            getAriaLabel={(proj, idx) => `View project ${idx + 1}: ${proj.title}`}
            nextLabel="Next Project"
            renderItem={(project, _idx, _isActive, wasDragged) => (
              <motion.article
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (!wasDragged()) setSelectedProject(project);
                }}
                className="group h-full bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#B85A3A]/70 rounded-xl overflow-hidden flex flex-col shadow-[0_10px_28px_rgba(32,61,51,0.08)] cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-[#EDE7DC]">
                  <ArchitecturalImage
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#5C615D]">
                      <span className="font-medium text-[#203D33]">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.area}</span>
                    </div>

                    <AnimatedWords
                      as="h3"
                      immediate
                      stagger={0.03}
                      duration={0.35}
                      text={project.title}
                      className="mt-2 font-display text-lg font-semibold text-[#1B1F1D] tracking-tight"
                    />
                    <AnimatedWords
                      as="p"
                      immediate
                      delay={0.05}
                      stagger={0.015}
                      duration={0.32}
                      text={project.summary}
                      className="mt-2 text-xs text-[#5C615D] leading-relaxed line-clamp-3"
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#203D33]">
                      <span>Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-mono text-[11px] text-[#5C615D] tabular-nums">
                      {project.year}
                    </span>
                  </div>
                </div>
              </motion.article>
            )}
          />

          {/* Desktop & Tablet View: Compact Multi-Column Grid */}
          <div className="mt-8 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.55,
                  delay: (idx % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#FFFDF9] border border-[#E3DDD2] hover:border-[#B85A3A]/70 rounded-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(32,61,51,0.1)] cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-[#EDE7DC]">
                  <ArchitecturalImage
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#5C615D]">
                      <span className="font-medium text-[#203D33]">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.area}</span>
                    </div>

                    <AnimatedWords
                      as="h3"
                      delay={(idx % 3) * 0.06 + 0.08}
                      stagger={0.035}
                      duration={0.42}
                      text={project.title}
                      className="mt-2 font-display text-base sm:text-lg font-semibold text-[#1B1F1D] tracking-tight group-hover:text-[#203D33] transition-colors"
                    />
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.45,
                        delay: (idx % 3) * 0.06 + 0.16,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mt-1.5 text-xs sm:text-[13px] text-[#5C615D] leading-relaxed line-clamp-2"
                    >
                      {project.summary}
                    </motion.p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#203D33] group-hover:text-[#B85A3A] transition-colors">
                      <span>Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="font-mono text-[11px] text-[#5C615D] tabular-nums">
                      {project.year}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#1B1F1D]/45 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF7F2] border border-[#E3DDD2] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              <div className="relative aspect-[16/9] bg-[#F1ECE3]">
                <ArchitecturalImage
                  src={selectedProject.image}
                  alt={selectedProject.alt}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project dossier"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFFDF9]/95 text-[#1B1F1D] hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#5C615D]">
                  <span className="font-medium text-[#203D33]">{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{selectedProject.area}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{selectedProject.duration}</span>
                </div>

                <h3
                  id="project-modal-title"
                  className="mt-2 font-display text-2xl font-semibold text-[#1B1F1D]"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#5C615D] leading-relaxed">
                  {selectedProject.summary}
                </p>

                <ul className="mt-5 pt-5 border-t border-[#E3DDD2] space-y-2">
                  {selectedProject.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#1B1F1D]">
                      <Check className="w-4 h-4 text-[#203D33] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 text-sm font-medium text-[#5C615D] hover:text-[#1B1F1D] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedProject.title;
                      const category = selectedProject.category;
                      setSelectedProject(null);
                      onInquireProject(title, category);
                    }}
                    className="px-5 py-2.5 text-sm font-medium text-[#FAF7F2] bg-[#203D33] hover:bg-[#162B24] rounded-lg transition-colors cursor-pointer"
                  >
                    Build Similar
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
