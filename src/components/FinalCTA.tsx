import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function FinalCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('trade360_investor_session') === 'active');
  }, [location]);

  if (isLoggedIn) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Heavy contrasting gradient band with navy transitions instead of hard boundaries */}
      <div className="w-full bg-gradient-to-r from-brand-navy-deep via-brand-navy-light/40 to-brand-navy-deep border-y border-white/5 py-24 px-6 text-center relative">
        
        {/* Soft background light that moves slowly */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand-violet/5 rounded-full blur-[140px] pointer-events-none animate-drift" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-teal/4 rounded-full blur-[100px] pointer-events-none animate-drift-reverse" />

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto space-y-6 relative z-10"
        >
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest font-mono block">
            DEPLOY INSTANTLY
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
            Ready to upgrade your <span className="not-italic font-bold text-transparent bg-gradient-to-r from-brand-teal via-brand-teal-light to-brand-violet bg-clip-text animate-gradient-flow text-glow-green-sm">Investor Relations?</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            Bring institutional clarity, transparency, and safety to your capital pools. Request a private administrative demo tailored to your operational specifications.
          </p>
          <div className="pt-4 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-teal text-white-forced hover:bg-brand-teal-light text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-teal/15 hover:shadow-brand-teal/25 hover:-translate-y-0.5 transition-spring cursor-pointer group"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white-forced" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
