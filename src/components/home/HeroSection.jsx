import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ============================================
// Animated Gradient Mesh Background
// ============================================
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated gradient orbs
      const orbs = [
        { x: 0.3, y: 0.3, size: 300, color: 'rgba(0, 255, 198, 0.15)' },
        { x: 0.7, y: 0.4, size: 250, color: 'rgba(100, 200, 255, 0.12)' },
        { x: 0.5, y: 0.7, size: 280, color: 'rgba(138, 43, 226, 0.1)' }
      ];

      orbs.forEach((orb, i) => {
        const offsetX = Math.sin(time + i) * 50;
        const offsetY = Math.cos(time + i * 0.7) * 50;
        
        const gradient = ctx.createRadialGradient(
          canvas.width * orb.x + offsetX,
          canvas.height * orb.y + offsetY,
          0,
          canvas.width * orb.x + offsetX,
          canvas.height * orb.y + offsetY,
          orb.size
        );
        
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(60px)' }}
    />
  );
};

// ============================================
// Hero Section Component
// ============================================
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium">AI Solutions for Enterprise</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Unlock GenAI</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Productivity
              </span>{' '}
              <span className="text-white">Safely, Responsibly, and Compliantly</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl"
            >
              SaaviGenAI is a cutting-edge AI consulting and development company specializing in Generative AI solutions for enterprises. We bridge the gap between innovative AI research and practical business applications.
            </motion.p>

            {/* CTA Buttons */}            
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {/* 1. Get Started Button -> /contact */}
            <Link
              to="/contact"
              className="group relative animate-pulse px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 inline-block"
            >
              <span className="relative animate-pulse z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
              
            {/* 2. Learn More Button -> /about */}
            <Link
              to="/about"
              className="px-8 py-4 animate-bounce bg-transparent border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-lg transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400 inline-block"
            >
              Learn More
            </Link>
</motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-800"
            >
              <div>
                <div className="text-3xl font-bold text-white mb-1">22+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-1">100%</div>
                <div className="text-gray-400 text-sm">Compliance</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30">
                  <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  AI-Powered Solutions
                </h3>
                <p className="text-gray-400 mb-6">
                  Safe, compliant, and effective AI implementations tailored to your enterprise needs with full EU AI Act compliance.
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {['EU AI Act Compliant', 'ISO/IEC 42001', 'NIST AI-RMF'].map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl backdrop-blur-xl border border-cyan-500/20"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl backdrop-blur-xl border border-purple-500/20"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}