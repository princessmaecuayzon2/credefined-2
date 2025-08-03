'use client';

import React, { useState, useEffect } from 'react';

// Icons
const ChevronDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface HeroSectionProps {
  navigateToSection?: (index: number) => void;
  mousePosition?: { x: number; y: number };
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigateToSection, mousePosition = { x: 400, y: 300 } }) => {
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Set window size only on client
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Generate stable particles with deterministic values
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 5.3 + 7) % 100}%`,
      top: `${(i * 7.1 + 13) % 100}%`,
      delay: `${(i * 0.3 + 0.2) % 5}s`,
      duration: `${3 + (i * 0.2) % 4}s`
    }));
    setParticles(generatedParticles);

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
      {/* Enhanced Video Backdrop with Multiple Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/60 to-cyan-900/30" />
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-500/25 to-orange-500/25 rounded-full blur-lg animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Dynamic grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Floating particles - Only render on client with stable values */}
      {isClient && (
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Enhanced Creative Redefined */}
          <div
            className="text-left relative"
            style={{ 
              transform: `translate(${magneticEffect.x * 0.3}px, ${magneticEffect.y * 0.3}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="relative">
              {/* Glow effect behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-full scale-150" />
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight relative z-10">
                <div className="overflow-hidden relative mb-1 md:mb-2">
                  <span 
                    className="font-black italic tracking-wide block relative"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      background: "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)",
                      backgroundSize: "400% 400%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "gradientShift 3s ease infinite"
                    }}
                  >
                    Creative
                    {/* Text stroke effect */}
                    <span className="absolute inset-0 text-transparent" style={{
                      WebkitTextStroke: '2px rgba(255,255,255,0.1)'
                    }}>Creative</span>
                  </span>
                </div>
                
                <div className="overflow-hidden relative">
                  <span 
                    className="font-thin tracking-widest text-white block relative"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.2em",
                      textShadow: "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    Redefined
                    {/* Glitch effect overlay */}
                    <span className="absolute inset-0 text-cyan-400 opacity-30 animate-pulse" style={{ animationDuration: '2s' }}>
                      Redefined
                    </span>
                  </span>
                </div>
              </h1>

              {/* Enhanced decorative elements */}
              <div className="mt-6 relative">
                <div className="h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full w-32 animate-pulse" />
                <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-48 mt-2" />
                <div className="absolute -top-2 left-16 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
              </div>
            </div>
          </div>

          {/* Right - Updated Caption with Enhanced Design */}
          <div className="text-left lg:text-right relative">
            <div className="max-w-xl lg:ml-auto space-y-8">
              {/* Glass morphism backdrop */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl" />
              
              <div className="relative z-10 p-8">
                {/* Main statement */}
                <div className="relative mb-8">
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400" />
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-purple-400" />
                  
                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      background: "linear-gradient(135deg, #ffffff, #e0e7ff, #c7d2fe, #ddd6fe)",
                      backgroundSize: "300% 300%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "subtleGradient 4s ease infinite"
                    }}
                  >
                    We craft digital experiences
                  </h2>
                  
                  <p
                    className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-6"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    that <span className="text-pink-400 font-semibold animate-pulse">captivate</span>, 
                    <span className="text-cyan-400 font-semibold animate-pulse" style={{ animationDelay: '0.5s' }}> inspire</span>, and 
                    <span className="text-yellow-400 font-semibold animate-pulse" style={{ animationDelay: '1s' }}> drive results</span>.
                  </p>
                </div>

                {/* Supporting text with enhanced styling */}
                <div className="space-y-4">
                  <p
                    className="text-base md:text-lg text-gray-400 font-light leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    From <span className="text-emerald-400 font-medium">brand identity</span> to 
                    <span className="text-purple-400 font-medium"> digital campaigns</span>, we bring 
                    ideas to life with cutting-edge creativity.
                  </p>
                  
                  {/* Animated accent line */}
                  <div className="flex items-center space-x-4 mt-6">
                    <div className="h-px bg-gradient-to-r from-pink-500 to-purple-500 flex-1 animate-pulse" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="h-px bg-gradient-to-r from-purple-500 to-cyan-500 flex-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  <p
                    className="text-sm md:text-base text-gray-500 font-extralight italic mt-4"
                    style={{ fontFamily: "'Crimson Text', serif" }}
                  >
                    Where innovation meets artistry in the digital realm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 group"
        onClick={() => navigateToSection?.(1)}
      >
        <div className="text-center relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/10 blur-xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-300" />
          
          <p className="text-gray-400 text-sm mb-4 font-light tracking-wide relative z-10 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
            Scroll to explore
          </p>
          
          <div className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
            <ChevronDownIcon />
          </div>
          
          {/* Animated ring */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 border border-white/30 rounded-full animate-ping" />
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes subtleGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          75% { transform: translateY(-10px) rotate(270deg); }
        }
        
        @keyframes goldShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;