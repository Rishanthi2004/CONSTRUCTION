/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ConstructionProcessSection } from './components/ConstructionProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Residential Construction');
  const [prefilledNote, setPrefilledNote] = useState<string>('');

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedProjectType(serviceTitle);
    setPrefilledNote(`Interested in ${serviceTitle}. Please share consultation availability.`);
    scrollToSection('#contact');
  };

  const handleInquireProject = (projectTitle: string, category: string) => {
    const mappedType =
      category === 'Commercial'
        ? 'Commercial Construction'
        : category === 'Estate'
          ? 'Turnkey Projects'
          : 'Residential Construction';
    setSelectedProjectType(mappedType);
    setPrefilledNote(`Interested in a build comparable to ${projectTitle}.`);
    scrollToSection('#contact');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1B1F1D]">
        <Navbar onQuoteClick={() => scrollToSection('#contact')} />

        <main className="flex-1">
          <HeroSection
            onExploreProjects={() => scrollToSection('#projects')}
            onStartConstruction={() => scrollToSection('#contact')}
          />

          <AboutSection />

          <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />

          <ProjectsSection onInquireProject={handleInquireProject} />

          <WhyChooseUsSection />

          <ConstructionProcessSection />

          <TestimonialsSection />

          <ContactSection
            preselectedProjectType={selectedProjectType}
            preselectedNote={prefilledNote}
          />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
