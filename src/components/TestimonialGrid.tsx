import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    initials: 'JS',
    quote: "Trade 360 has completely streamlined our investor communication. Our support desk receives 70% fewer inquiries.",
    author: "Julius Sterling",
    role: "Managing Partner, Sterling Capital"
  },
  {
    initials: 'ER',
    quote: "The read-only architecture was a hard requirement for our compliance desk. Trade 360 delivered with zero fund risk.",
    author: "Elena Rostov",
    role: "Compliance Officer, Nexus Asset Mgmt"
  },
  {
    initials: 'MC',
    quote: "Our clients love the bespoke white-label portal. It establishes immediate institutional credit and transparency.",
    author: "Marcus Vance",
    role: "Director of Operations, Vance Prime"
  },
  {
    initials: 'AL',
    quote: "Connecting our MT5 pools took minutes. The live mirror synchronizer has been 100% stable since day one.",
    author: "Amara Lin",
    role: "Head of Trading, Equinox Liquid"
  }
];

export default function TestimonialGrid() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.65, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 border-b border-white/5 relative">
      {/* Background glow behind social proof */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none animate-drift-reverse" />
      
      <div className="text-center space-y-3 mb-16 relative z-10">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest font-mono block">
          Social Proof
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-light text-white tracking-tight italic">
          Trusted by clients for over <span className="not-italic font-bold text-transparent bg-gradient-to-r from-brand-teal to-brand-violet bg-clip-text text-glow-green-sm">5 Years.</span>
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Read testimonials from brokerages and capital managers utilizing our read-only mirroring architecture.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {testimonials.map((test, idx) => {
          // Alternate accent styles slightly for dual accent pairing
          const isEven = idx % 2 === 0;
          const accentColor = isEven ? 'text-brand-teal' : 'text-brand-violet';
          const bgInitials = isEven 
            ? 'bg-brand-teal/10 border-brand-teal/10 text-brand-teal' 
            : 'bg-brand-violet/10 border-brand-violet/10 text-brand-violet';

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="relative bg-brand-navy-light/60 border border-white/5 p-6 rounded-[2rem] flex flex-col justify-between transition-[border-color,box-shadow,background-color] duration-300 hover:border-brand-teal/25 hover:bg-brand-navy-light/85 shadow-xl group"
            >
              {/* Quote icon watermarked top right */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-brand-teal/10 transition-colors" />

              <p className="text-slate-300 italic text-xs leading-relaxed mb-6 pr-4 relative z-10">
                "{test.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5 relative z-10">
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold font-mono shrink-0 ${bgInitials}`}>
                  {test.initials}
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-xs text-white leading-tight">
                    {test.author}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5 leading-none">
                    {test.role}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
