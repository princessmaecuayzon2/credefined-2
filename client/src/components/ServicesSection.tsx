'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMouseParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with the latest technologies",
      number: "01",
      color: "from-blue-400 via-cyan-500 to-teal-600",
      accent: "#06b6d4",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      category: "Development"
    },
    {
      title: "UI/UX Design",
      description: "Intuitive interfaces and thoughtful user experiences that connect and engage your audience",
      number: "02",
      color: "from-purple-400 via-violet-500 to-indigo-600",
      accent: "#8b5cf6",
      gradient: "bg-gradient-to-br from-purple-500/20 to-violet-500/20",
      category: "Design"
    },
    {
      title: "SEO",
      description: "Boost your visibility and rank higher in search results",
      number: "03",
      color: "from-emerald-400 via-green-500 to-lime-600",
      accent: "#10b981",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
      category: "Marketing"
    },
    {
      title: "Full Stack Development",
      description: "Complete solutions from frontend to backend infrastructure",
      number: "04",
      color: "from-orange-400 via-amber-500 to-yellow-600",
      accent: "#f59e0b",
      gradient: "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
      category: "Development"
    }
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-slate-900">
      {/* Video Background with Artistic Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/service.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-slate-900/40 to-black/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-24 h-24 border border-white/10 backdrop-blur-sm z-10"
        style={{
          x: mouseParallax.x * 2,
          y: mouseParallax.y * 2
        }}
        animate={{ 
          rotate: [0, 360],
          borderColor: ['rgba(255,255,255,0.1)', 'rgba(59,130,246,0.3)', 'rgba(255,255,255,0.1)']
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/5 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-500/20 backdrop-blur-sm z-10 rounded-full"
        style={{
          x: mouseParallax.x * -1.5,
          y: mouseParallax.y * 1.5
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Clean Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-7xl md:text-8xl lg:text-9xl font-light leading-none mb-6"
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Services
            </motion.h2>

            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                Crafting digital experiences with precision, creativity, and purpose
              </p>
            </motion.div>
          </motion.div>

          {/* Services Grid - Updated for mobile responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group cursor-pointer relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                onMouseEnter={() => setActiveService(index)}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Main service card */}
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-4 lg:p-8 group-hover:border-white/20 transition-all duration-500 h-72 lg:h-80">
                  
                  {/* Subtle gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Animated border accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: service.accent }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header with number */}
                    <div className="flex items-start justify-between mb-4 lg:mb-6">
                      <motion.div
                        className="text-3xl lg:text-5xl font-thin text-gray-600 group-hover:text-gray-400"
                        animate={{
                          color: activeService === index ? service.accent : '#6B7280'
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {service.number}
                      </motion.div>
                      
                      {/* Simple arrow */}
                      <motion.div
                        className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        whileHover={{ scale: 1.2, x: 5 }}
                      >
                        <svg 
                          className="w-4 h-4 lg:w-5 lg:h-5 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Service content */}
                    <div className="flex-1 flex flex-col">
                      <motion.span 
                        className="text-xs text-gray-500 uppercase tracking-widest mb-2 lg:mb-3 block"
                        animate={{
                          color: activeService === index ? service.accent : '#6B7280'
                        }}
                      >
                        {service.category}
                      </motion.span>
                      
                      <motion.h3 
                        className="text-base lg:text-xl xl:text-2xl font-medium text-white mb-3 lg:mb-4 leading-tight"
                        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                      >
                        {service.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-xs lg:text-sm xl:text-base text-gray-400 leading-relaxed flex-1"
                        animate={{
                          color: activeService === index ? '#d1d5db' : '#9ca3af'
                        }}
                      >
                        {service.description}
                      </motion.p>
                      
                      {/* Simple bottom accent */}
                      <motion.div 
                        className="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-white/5"
                      >
                        <motion.div
                          className="h-1 w-0 rounded-full"
                          style={{ backgroundColor: service.accent }}
                          animate={{
                            width: activeService === index ? '100%' : '0%'
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Subtle floating particles */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                          left: `${30 + i * 40}%`,
                          top: `${40 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Subtle shadow */}
                <motion.div
                  className="absolute inset-0 bg-black/20 rounded-2xl -z-10 blur-xl"
                  animate={{
                    opacity: activeService === index ? 0.4 : 0.1,
                    y: activeService === index ? 12 : 8
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Clean CTA */}
          <motion.div
            className="text-center mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 text-white px-8 lg:px-12 py-3 lg:py-4 rounded-full font-light text-base lg:text-lg hover:bg-white/10 transition-all duration-500"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center space-x-3">
                <span>Let&apos;s Work Together</span>
                <motion.svg 
                  className="w-4 h-4 lg:w-5 lg:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      `}</style>
    </section>
  );
};

export default ServicesSection;