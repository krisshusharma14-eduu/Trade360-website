import React from 'react';
import { motion } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';

const statsData = [
  { value: '500+', label: 'Corporate Clients' },
  { value: '10+', label: 'Years in FinTech' },
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '24/7', label: 'Technical Support' },
  { value: '15M+', label: 'Monthly API Queries' },
];

export default function StatsStrip() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
  };

  return (
    <section className="border-y border-white/5 bg-gradient-to-r from-brand-navy/0 via-brand-navy-light/40 to-brand-navy/0 backdrop-blur-sm py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 items-center justify-between"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center flex flex-col items-center justify-center space-y-1.5 border-r border-white/5 last:border-0 md:border-r"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight flex items-center justify-center">
                <AnimatedCounter value={stat.value} />
              </div>
              <span className="text-[10px] md:text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
