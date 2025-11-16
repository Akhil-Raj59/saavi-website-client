
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// PRODUCTS SECTION - AI Chatbot Solutions
// ============================================
const products = [
  {
    name: 'AI Mini Chatbot',
    description: 'RAG-powered chatbot for quick knowledge retrieval and customer support',
    icon: '💬',
    tags: ['RAG Technology', 'Fast Deployment'],
    color: 'blue',
    popular: false
  },
  {
    name: 'AI Agentic Chatbot',
    description: 'Advanced chatbot with ReAct agents, memory management, and guardrails',
    icon: '🤖',
    tags: ['ReAct Agents', 'Memory Mgmt'],
    color: 'cyan',
    popular: true
  },
  {
    name: 'AI Act Chatbot',
    description: 'Enterprise-grade with MCP features and EU AI Act compliance',
    icon: '🛡️',
    tags: ['MCP Integration', 'EU AI Act'],
    color: 'teal',
    popular: false
  }
];

export function ProductsSection() {
  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,200,255,0.05),transparent_70%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-blue-400 text-sm font-medium">AI Chatbot Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Discover Our </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              AI Portfolio
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive AI chatbot solutions designed for every business need
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-black text-xs font-bold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`
                relative h-full
                bg-gradient-to-br from-gray-900/80 to-black/80
                backdrop-blur-sm
                border ${product.popular ? 'border-cyan-500/50' : 'border-gray-800'}
                rounded-2xl p-8
                transition-all duration-300
                hover:border-${product.color}-500/50
                hover:shadow-2xl hover:shadow-${product.color}-500/20
                hover:-translate-y-2
                ${product.popular ? 'scale-105' : ''}
              `}>
                {/* Icon */}
                <div className={`
                  text-6xl mb-6 
                  ${product.popular ? 'animate-pulse' : ''}
                `}>
                  {product.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 bg-${product.color}-500/10 text-${product.color}-400 text-sm rounded-full border border-${product.color}-500/30`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Learn More */}
                <button className={`
                  w-full py-3 
                  ${product.popular 
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-black hover:shadow-lg hover:shadow-cyan-500/50' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                  }
                  font-semibold rounded-lg
                  transition-all duration-300
                `}>
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105">
            Explore All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
}