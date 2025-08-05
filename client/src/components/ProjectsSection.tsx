'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProjectsSectionProps {}

interface PatternElement {
  id: number;
  x: number;
  y: number;
  size?: number;
  delay: number;
  duration: number;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const projects = useMemo(() => [
    {
      title: 'Document Control System',
      subtitle: 'The Document Control System is a web-based application designed to securely manage and store documents with role-based access. It supports uploading of PDFs and images, with OCR (Optical Character Recognition) integration to make documents searchable by content.',
      category: 'Fullstack Development',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      accent: '#06b6d4',
      pattern: 'dots',
      liveDemo: 'https://document-control-system.vercel.app',
      projectLink: '#'
    },
    {
      title: 'E-Store Platform',
      subtitle: 'E-commerce interface showcasing modern UI/UX design and seamless responsive layouts',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      color: 'from-emerald-400 via-green-500 to-teal-600',
      accent: '#10b981',
      pattern: 'waves',
      liveDemo: 'https://shopvibe-theta.vercel.app',
      projectLink: '#'
    },
    {
      title: 'Metaverse Café App',
      subtitle: 'Immersive metaverse experience where users can meet in virtual cafés and chat through AI avatars – status: In Development',
      category: 'Metaverse / 3D Experience',
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=600&fit=crop',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      accent: '#06b6d4',
      pattern: 'waves',
      liveDemo: '#',
      projectLink: '#'
    },
    {
      title: 'AgentOS',
      subtitle: 'An agentic-AI-powered Android launcher with contextual assistants – status: In Development',
      category: 'AI App Fullstack',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      color: 'from-rose-400 via-pink-500 to-red-500',
      accent: '#f43f5e',
      pattern: 'hexagons',
      liveDemo: '#',
      projectLink: '#'
    }
  ], []);

  // Optimized pattern generation with better performance
  const generatePatternElements = useCallback((pattern: string, seed: number): PatternElement[] => {
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    const configs = {
      dots: { count: 8, baseDuration: 4, durationRange: 2 },
      circles: { count: 6, baseDuration: 6, durationRange: 3 },
      hexagons: { count: 4, baseDuration: 8, durationRange: 4 },
      waves: { count: 0, baseDuration: 0, durationRange: 0 }
    };

    const config = configs[pattern as keyof typeof configs] || configs.dots;
    
    return Array.from({ length: config.count }, (_, i) => ({
      id: i,
      x: seededRandom(seed + i) * (pattern === 'circles' ? 80 : 90),
      y: seededRandom(seed + i + 100) * (pattern === 'circles' ? 80 : 90),
      ...(pattern === 'circles' && { size: 20 + seededRandom(seed + i + 200) * 30 }),
      delay: seededRandom(seed + i + 300) * 2,
      duration: config.baseDuration + seededRandom(seed + i + 400) * config.durationRange
    }));
  }, []);

  // Memoize pattern elements for performance
  const patternElementsMap = useMemo(() => {
    const map: Record<string, PatternElement[]> = {};
    projects.forEach((project, index) => {
      if (project.pattern !== 'waves') {
        map[project.pattern] = generatePatternElements(project.pattern, index * 1000);
      }
    });
    return map;
  }, [projects, generatePatternElements]);

  // Auto-rotation with improved logic
  useEffect(() => {
    const startAutoRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (!userInteracted && !isHovering) {
          setActiveProject((prev) => (prev + 1) % projects.length);
        }
      }, 15000); // Reduced to 15 seconds for better UX
    };

    startAutoRotation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [projects.length, userInteracted, isHovering]);

  // Reset user interaction timer
  useEffect(() => {
    if (userInteracted) {
      const resetTimer = setTimeout(() => {
        setUserInteracted(false);
      }, 20000); // Reduced to 20 seconds
      return () => clearTimeout(resetTimer);
    }
  }, [userInteracted]);

  // Optimized link handling
  const handleLinkClick = useCallback((url: string, openInNewTab: boolean = false) => {
    if (!url || url === '#') return;
    
    if (openInNewTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  }, []);

  // Improved hover handling with debounce
  const handleProjectHover = useCallback((index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    setIsHovering(true);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveProject(index);
    }, 300); // 300ms delay before changing project
  }, []);

  const handleProjectHoverEnd = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovering(false);
  }, []);

  // Direct click handler (no delay)
  const handleProjectClick = useCallback((index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveProject(index);
    setUserInteracted(true);
    setIsHovering(false);
  }, []);

  // Optimized pattern rendering
  const renderPattern = useCallback((pattern: string, color: string) => {
    if (!isClient) return null;

    const elements = patternElementsMap[pattern] || [];

    const patternComponents = {
      dots: (
        <div className="absolute inset-0 opacity-8">
          {elements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ 
                backgroundColor: color,
                left: `${element.x}%`,
                top: `${element.y}%`
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 50, 0],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      ),
      
      waves: (
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 60%, ${color} 0%, transparent 40%)`
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ),
      
      circles: (
        <div className="absolute inset-0 opacity-12">
          {elements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute rounded-full border"
              style={{ 
                borderColor: color,
                width: `${element.size}px`,
                height: `${element.size}px`,
                left: `${element.x}%`,
                top: `${element.y}%`
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      ),
      
      hexagons: (
        <div className="absolute inset-0 opacity-10">
          {elements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute w-6 h-6"
              style={{ 
                backgroundColor: color,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                left: `${element.x}%`,
                top: `${element.y}%`
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )
    };

    return patternComponents[pattern as keyof typeof patternComponents] || null;
  }, [isClient, patternElementsMap]);

  // SSR fallback - simplified
  if (!isClient) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-black text-white mb-8">
              WORK
            </h2>
            <p className="text-2xl text-gray-400 tracking-widest">SELECTED PROJECTS</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.category}</p>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-8">
              <div className="relative h-[60vh] rounded-xl overflow-hidden">
                <Image
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h1 className="text-3xl font-black text-white mb-4">
                    {projects[activeProject].title}
                  </h1>
                  <p className="text-gray-200 mb-6">
                    {projects[activeProject].subtitle}
                  </p>
                  <div className="flex space-x-4">
                    <button className="px-6 py-3 bg-white text-black font-bold rounded-full">
                      View Project
                    </button>
                    <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-full">
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 relative overflow-hidden">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-none mb-8"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 30%, #06b6d4 60%, #10b981 100%)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            WORK
          </motion.h2>
          
          <motion.p
            className="text-2xl md:text-3xl font-light text-gray-400 tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            SELECTED PROJECTS
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[70vh]">
          
          {/* Project Navigation - Hidden on mobile */}
          <motion.div
            className="hidden lg:flex lg:col-span-4 flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`relative cursor-pointer group transition-all duration-300 ${
                  activeProject === index ? 'scale-102' : 'scale-100'
                }`}
                onClick={() => handleProjectClick(index)}
                onMouseEnter={() => handleProjectHover(index)}
                onMouseLeave={handleProjectHoverEnd}
                whileHover={{ y: -1 }}
              >
                <div className={`relative p-5 rounded-xl border transition-all duration-300 ${
                  activeProject === index 
                    ? 'bg-white/10 border-white/20 backdrop-blur-sm shadow-lg' 
                    : 'bg-white/5 border-white/10 hover:bg-white/7 hover:border-white/15'
                }`}>
                  
                  {/* Active indicator */}
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${project.color} rounded-r-full`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: activeProject === index ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                      activeProject === index 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 text-white group-hover:bg-white/15'
                    }`}>
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-bold transition-colors duration-300 truncate ${
                        activeProject === index ? 'text-white' : 'text-gray-300 group-hover:text-gray-200'
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {project.category}
                      </p>
                    </div>

                    <motion.div
                      className={`transition-colors duration-300 ${
                        activeProject === index ? 'text-white' : 'text-gray-500 group-hover:text-gray-400'
                      }`}
                      animate={{ x: activeProject === index ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Pattern overlay for active project */}
                {activeProject === index && renderPattern(project.pattern, project.accent)}
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Project Display - Full width on mobile */}
          <motion.div
            className="lg:col-span-8 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-20">
              <motion.div
                key={activeProject}
                className="relative h-[65vh] rounded-2xl overflow-hidden group"
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image and overlays */}
                <div className="absolute inset-0">
                  <Image
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${projects[activeProject].color} opacity-60 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {renderPattern(projects[activeProject].pattern, projects[activeProject].accent)}
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <span className="inline-block px-3 py-1.5 text-sm font-medium bg-white/15 backdrop-blur-sm rounded-full border border-white/20 text-white mb-4">
                      {projects[activeProject].category}
                    </span>

                    <h1 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
                      {projects[activeProject].title}
                    </h1>

                    <p className="text-base lg:text-lg text-gray-200 mb-6 max-w-2xl leading-relaxed line-clamp-3">
                      {projects[activeProject].subtitle}
                    </p>

                    <div className="flex flex-wrap gap-3">
                     
                      
                      <motion.button
                        className="px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLinkClick(projects[activeProject].liveDemo, true)}
                      >
                        Live Demo
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Arrow Navigation */}
              <motion.div
                className="flex justify-between items-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                  onClick={() => handleProjectClick(activeProject === 0 ? projects.length - 1 : activeProject - 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                
                <div className="flex space-x-2">
                  {projects.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        activeProject === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                      }`}
                      onClick={() => handleProjectClick(index)}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>
                
                <motion.button
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                  onClick={() => handleProjectClick(activeProject === projects.length - 1 ? 0 : activeProject + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;