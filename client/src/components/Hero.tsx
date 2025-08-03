'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Icons
const ChevronDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface HeroSectionProps {
  navigateToSection: (index: number) => void;
  mousePosition: { x: number; y: number };
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigateToSection, mousePosition }) => {
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const magneticEffect = isClient ? {
    x: (mousePosition.x - windowSize.width / 2) * 0.01,
    y: (mousePosition.y - windowSize.height / 2) * 0.01,
  } : { x: 0, y: 0 };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black">
      {/* Video Backdrop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/service.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Artistic floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full z-10"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.3, 0.8, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full z-10"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0.6, 0.2],
          rotate: [360, 0, 360]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/6 w-1 h-16 bg-gradient-to-b from-emerald-400 to-transparent rounded-full z-10"
        animate={{
          scaleY: [0.5, 1.5, 0.5],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center">
        <div className="w-full">
          {/* Left side - Creative Redefined with Artistic Typography */}
          <motion.div
            className="text-left relative w-full"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            style={{ x: magneticEffect.x * 0.5, y: magneticEffect.y * 0.5 }}
          >
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] leading-none relative w-full"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              <motion.div 
                className="overflow-hidden relative mb-2 md:mb-4"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <span 
                  className="font-black italic tracking-wider block"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    background: "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)",
                    backgroundSize: "300% 300%",
                    animation: "gradientShift 4s ease infinite",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 30px rgba(255, 107, 107, 0.3)"
                  }}
                >
                  Creative
                </span>
                {/* Decorative underline */}
                <motion.div
                  className="absolute -bottom-1 md:-bottom-2 left-0 h-0.5 md:h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </motion.div>
              
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                <span 
                  className="font-thin tracking-widest text-white block"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.15em",
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  Redefined
                </span>
              </motion.div>
            </motion.h1>

            {/* Artistic accent elements */}
            <motion.div
              className="absolute -top-4 md:-top-8 -right-4 md:-right-8 w-12 h-12 md:w-24 md:h-24 border-2 border-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-6 md:-bottom-12 -left-2 md:-left-4 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-lg backdrop-blur-sm"
              animate={{ 
                rotate: [-5, 5, -5],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => navigateToSection(1)}
        whileHover={{ scale: 1.2 }}
      >
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4 font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
            Scroll to explore
          </p>
          <div className="text-white">
            <ChevronDownIcon />
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;