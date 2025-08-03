'use client';

import React, { useState, useEffect } from 'react';

const ContactSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        alert('Please fill in all fields');
        return;
      }
      
      // Handle form submission here
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Reset form on success
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-black">


      {/* Interactive Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 92, 246, 0.3) 0%, 
            rgba(59, 130, 246, 0.2) 30%, 
            rgba(0, 0, 0, 0.7) 70%)`
        }}
      />

      {/* Animated Mesh Background */}
      <div className="absolute inset-0 z-15">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6">
                <animate attributeName="stop-color" values="#8B5CF6;#3B82F6;#EC4899;#8B5CF6" dur="8s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4">
                <animate attributeName="stop-color" values="#3B82F6;#EC4899;#8B5CF6;#3B82F6" dur="8s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
          
          {/* Dynamic Grid Lines */}
          {Array.from({length: 15}).map((_, i) => (
            <g key={i}>
              <line
                x1={i * 80} y1="0" x2={i * 80} y2="800"
                stroke="url(#meshGrad)"
                strokeWidth="0.5"
                opacity="0.4"
                style={{
                  animation: `float ${4 + i * 0.2}s ease-in-out infinite alternate`,
                  transformOrigin: 'center'
                }}
              />
              <line
                x1="0" y1={i * 53} x2="1200" y2={i * 53}
                stroke="url(#meshGrad)"
                strokeWidth="0.5"
                opacity="0.3"
                style={{
                  animation: `float ${3 + i * 0.15}s ease-in-out infinite alternate-reverse`,
                  transformOrigin: 'center'
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating 3D Geometric Elements */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {Array.from({length: 8}).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 7) % 90}%`,
              top: `${15 + (i * 8) % 70}%`,
              animation: `float3d ${6 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <div 
              className={`w-3 h-3 ${
                i % 3 === 0 ? 'bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full' :
                i % 3 === 1 ? 'border-2 border-blue-400/40 rounded-lg rotate-45' :
                'bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-xl'
              } backdrop-blur-sm`}
              style={{
                transform: `perspective(1000px) rotateX(${i * 30}deg) rotateY(${i * 45}deg)`,
                filter: 'blur(0.5px)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Artistic Light Beams */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-purple-400/60 via-transparent to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-blue-400/40 via-transparent to-transparent transform skew-x-12"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            
            {/* Left Side - Content */}
            <div className="space-y-12">
              {/* Large Background Text Effect */}
              <div className="absolute inset-0 flex items-center justify-start pointer-events-none overflow-hidden lg:pl-20">
                <span 
                  className="text-[6rem] lg:text-[10rem] font-black text-white/5 select-none tracking-wider"
                  style={{
                    animation: 'backgroundPulse 8s ease-in-out infinite',
                    textShadow: '0 0 50px rgba(139, 92, 246, 0.1)'
                  }}
                >
                  CREATE
                </span>
              </div>
              
              <div className="relative z-10">
                {/* Decorative Header Accent */}
                <div className="flex items-center mb-12">
                  <div className="w-20 h-px bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  <div className="mx-6 relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="w-20 h-px bg-gradient-to-r from-pink-400 to-transparent"></div>
                </div>

                {/* Main Heading */}
                <div className="space-y-4 mb-12">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-none tracking-tight">
                    <div className="overflow-hidden">
                      <span 
                        className="block bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent"
                        style={{animation: 'slideInUp 1s ease-out'}}
                      >
                        Thinking of
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <span 
                        className="block text-white/80 font-thin"
                        style={{animation: 'slideInUp 1s ease-out 0.2s both'}}
                      >
                        a project?
                      </span>
                    </div>
                    <div className="overflow-hidden mt-8">
                      <span 
                        className="block text-white"
                        style={{animation: 'slideInUp 1s ease-out 0.4s both'}}
                      >
                        I&apos;ll help you
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <span 
                        className="block font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        style={{animation: 'slideInUp 1s ease-out 0.6s both'}}
                      >
                        build it.
                      </span>
                    </div>
                  </h1>
                </div>

                {/* Description */}
                <div className="max-w-lg">
                  <p className="text-xl text-white/70 leading-relaxed font-light" style={{animation: 'slideInUp 1s ease-out 0.8s both'}}>
                    Let&apos;s transform your vision into reality. Whether it&apos;s a web application, mobile app, or digital experience, 
                    I&apos;m here to bring your ideas to life with cutting-edge technology and creative design.
                  </p>
                </div>

                {/* Artistic Frame Elements */}
                <div className="absolute -top-16 -left-16 w-32 h-32 border border-purple-400/30 rounded-full" style={{animation: 'rotateFrame 20s linear infinite'}}></div>
                <div className="absolute -bottom-16 -right-16 w-24 h-24 border-2 border-pink-400/40" style={{animation: 'rotateFrame 15s linear infinite reverse'}}></div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-6 lg:p-8 max-w-md mx-auto">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-white mb-3">Let&apos;s Connect</h2>
                  <div className="w-16 h-px bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
                </div>

                {/* Contact Form */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 text-sm"
                        placeholder="Your Name"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 text-sm"
                        placeholder="Your Email"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                    </div>

                    {/* Message Input */}
                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 resize-none text-sm"
                        placeholder="Tell me about your project..."
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="group relative w-full inline-flex items-center justify-center px-6 py-3 text-sm font-light text-white bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20 rounded-xl hover:scale-105 transition-all duration-500 overflow-hidden"
                  >
                    {/* Dynamic Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                    
                    {/* Animated Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Send Message</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Contact Details */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center space-x-3 text-white/80 hover:text-purple-300 transition-colors duration-300">
                      <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wide">Email</p>
                        <p className="font-light text-sm">princessmaecuayzon24@gmail.com</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center space-x-3 text-white/80 hover:text-pink-300 transition-colors duration-300">
                      <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wide">Address</p>
                        <p className="font-light text-sm">Cebu City, Philippines</p>
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex items-center space-x-3 text-white/80 hover:text-blue-300 transition-colors duration-300">
                      <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wide">LinkedIn</p>
                        <p className="font-light text-sm">linkedin.com/in/princess-mae-cuayzon-87b945306</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Accent Elements */}
              <div className="absolute -top-4 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>

      
      
    </div>
  );
};

export default ContactSection;