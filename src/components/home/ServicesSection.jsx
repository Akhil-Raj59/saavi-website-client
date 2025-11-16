import React from 'react';
import { motion } from 'framer-motion';

// Services data
const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'AI Strategy Consulting',
    description: 'Transform your business with strategic AI implementation guidance',
    features: [
      'AI Readiness Assessment',
      'AI Strategy Development',
      'Use Case Identification',
      'ROI Analysis & Planning'
    ],
    color: 'cyan'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'GenAI Training Programs',
    description: 'Upskill your team with comprehensive AI training',
    features: [
      'Fresh Graduate Bootcamps',
      'Corporate Upskilling Programs',
      'Executive Manager Workshops',
      'Technical Developer Training'
    ],
    color: 'teal'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'AI Security & Compliance',
    description: 'Ensure your AI systems are secure and compliant',
    features: [
      'EU AI Act Compliance',
      'ISO/IEC 42001 Implementation',
      'NIST AI-RMF Framework',
      'OWASP LLM Top 10'
    ],
    color: 'purple'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Custom AI Development',
    description: 'Build bespoke AI solutions for your unique needs',
    features: [
      'Large Language Model Integration',
      'RAG Systems Development',
      'AI Chatbots & Virtual Assistants',
      'Document Processing AI'
    ],
    color: 'blue'
  }
];

// Color gradients for each service
const colorClasses = {
  cyan: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30 group-hover:border-cyan-400',
  teal: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 group-hover:border-teal-400',
  purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 group-hover:border-purple-400',
  blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 group-hover:border-blue-400'
};

const iconColorClasses = {
  cyan: 'text-cyan-400',
  teal: 'text-teal-400',
  purple: 'text-purple-400',
  blue: 'text-blue-400'
};

// Service Card Component
const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card */}
      <div className={`
        relative h-full
        bg-gradient-to-br from-gray-900/50 to-black/50
        backdrop-blur-sm
        border
        ${colorClasses[service.color]}
        rounded-xl p-6 md:p-8
        transition-all duration-300
        hover:shadow-2xl hover:shadow-${service.color}-500/10
        hover:-translate-y-2
      `}>
        {/* Glow effect on hover */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorClasses[service.color].split(' ')[0]} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        
        <div className="relative">
          {/* Icon */}
          <div className={`
            w-16 h-16 
            bg-gradient-to-br ${colorClasses[service.color].split(' ')[0]}
            rounded-xl
            flex items-center justify-center
            mb-6
            border ${colorClasses[service.color].split(' ')[1]}
            ${iconColorClasses[service.color]}
            group-hover:scale-110 transition-transform duration-300
          `}>
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-3">
            {service.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`
                  w-5 h-5 rounded-full 
                  bg-gradient-to-br ${colorClasses[service.color].split(' ')[0]}
                  flex items-center justify-center
                  flex-shrink-0 mt-0.5
                `}>
                  <svg className={`w-3 h-3 ${iconColorClasses[service.color]}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm md:text-base">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Learn More Link */}
          <motion.button
            whileHover={{ x: 5 }}
            className={`
              mt-6 flex items-center gap-2
              ${iconColorClasses[service.color]}
              font-semibold text-sm
              group/link
            `}
          >
            Learn More
            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Services Section
export default function ServicesSection() {
  return (
    <section className="relative py-20 md:py-32 mt-[-120px] bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6"
          >
            <span className="text-cyan-400 text-sm font-medium">Our Services</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Comprehensive </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              AI Solutions
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Tailored AI solutions designed to transform your business and drive innovation
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105">
            <span className="relative z-10">Explore All Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}