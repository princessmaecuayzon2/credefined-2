'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Creative Icons
const MenuIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2.5} 
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2.5} 
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Floating particles component
const FloatingParticle = ({ delay = 0, size = 'small' }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 ${
      size === 'small' ? 'w-1 h-1' : size === 'medium' ? 'w-2 h-2' : 'w-3 h-3'
    }`}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8]
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  />
);

interface HeaderProps {
  currentSection: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigateToSection: (index: number) => void;
  sectionNames: string[];
}

const Header: React.FC<HeaderProps> = ({
  currentSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  navigateToSection,
  sectionNames
}) => {
  const handleNavigation = (index: number) => {
    navigateToSection(index);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50 overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative">
          {/* Floating background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingParticle delay={0} size="small" />
            <FloatingParticle delay={1} size="medium" />
            <FloatingParticle delay={2} size="small" />
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center relative">
              {/* Logo with artistic elements */}
              <motion.div
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation(0)}
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
              
                
              </motion.div>
              
              {/* Simple hamburger menu button */}
              <button
                className="p-4 text-white hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Artistic backdrop */}
            <motion.div 
              className="absolute inset-0 backdrop-blur-lg"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(30,30,30,0.9), rgba(0,0,0,0.8))"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {/* Floating geometric shapes */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-400/30 rounded-full"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/10 to-cyan-400/10 rounded-lg backdrop-blur-sm"
                animate={{ rotate: -360, y: [-10, 10, -10] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Enhanced Sidebar */}
            <motion.div
              className="absolute top-0 right-0 h-full w-96 overflow-hidden"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Sidebar background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-800/95 backdrop-blur-2xl" />
              
              {/* Animated border */}
              <motion.div
                className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-400 via-pink-400 to-cyan-400"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              
              <div className="relative flex flex-col h-full">
                {/* Artistic Header */}
                <div className="relative p-8 border-b border-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <motion.h2 
                        className="text-2xl font-bold text-white mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Navigation
                      </motion.h2>
                      <motion.div
                        className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                    
                    <motion.button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CloseIcon />
                    </motion.button>
                  </div>
                  
                  {/* Floating particles in header */}
                  <div className="absolute top-4 right-20 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-16 w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce" />
                </div>
                
                {/* Enhanced Navigation items */}
                <div className="flex-1 py-8 px-6">
                  <div className="space-y-3">
                    {sectionNames.map((name, index) => (
                      <motion.button
                        key={name}
                        className={`group relative w-full text-left p-4 rounded-2xl text-lg font-medium transition-all duration-300 overflow-hidden ${
                          currentSection === index 
                            ? 'text-white' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ 
                          delay: index * 0.1 + 0.2,
                          duration: 0.4
                        }}
                        whileHover={{ 
                          x: 8,
                          transition: { duration: 0.2 }
                        }}
                        onClick={() => handleNavigation(index)}
                      >
                        {/* Animated background */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl ${
                            currentSection === index
                              ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20'
                              : 'bg-white/0 group-hover:bg-white/5'
                          }`}
                          whileHover={{
                            background: currentSection === index 
                              ? "linear-gradient(90deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(6, 182, 212, 0.3))"
                              : "rgba(255, 255, 255, 0.1)"
                          }}
                        />
                        
                        {/* Side indicator */}
                        <motion.div
                          className={`absolute left-0 top-0 w-1 h-full rounded-r-full ${
                            currentSection === index
                              ? 'bg-gradient-to-b from-purple-400 to-cyan-400'
                              : 'bg-transparent group-hover:bg-white/30'
                          }`}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: currentSection === index ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="block font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {name}
                          </span>
                          
                          {/* Number indicator */}
                          <motion.span
                            className={`text-sm px-2 py-1 rounded-full ${
                              currentSection === index
                                ? 'bg-gradient-to-r from-purple-400/30 to-cyan-400/30 text-white'
                                : 'text-gray-500 group-hover:text-gray-300'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </motion.span>
                        </div>
                        
                        {/* Animated underline */}
                        {currentSection === index && (
                          <motion.div
                            className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "calc(100% - 2rem)" }}
                            transition={{ duration: 0.4 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Artistic Footer */}
                <div className="relative p-8 border-t border-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="mb-4">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mx-auto mb-3" />
                    </div>
                    
                    <p className="text-sm text-gray-500 font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                      © 2025 Creative Redefined
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Crafting Digital Excellence
                    </p>
                  </motion.div>
                  
                  {/* Footer decoration */}
                  <div className="absolute top-4 left-8 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 right-8 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

export default Header;