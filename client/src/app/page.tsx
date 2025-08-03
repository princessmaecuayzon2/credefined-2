'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import ProjectsSection from '../components/ProjectsSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';

const CubertoStyleWebsite: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sections = ['hero', 'projects', 'services', 'contact'];
  const sectionNames = ['Home', 'Projects', 'Services', 'Contact'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigateToSection = (index: number) => {
    setCurrentSection(index);
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(Math.min(newSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Header
        currentSection={currentSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigateToSection={navigateToSection}
        sectionNames={sectionNames}
      />

      <div id="hero">
        <HeroSection
          navigateToSection={navigateToSection}
          mousePosition={mousePosition}
        />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="services">
        <ServicesSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default CubertoStyleWebsite;