import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface BulletItem {
  title: string;
  desc: string;
}

interface FeatureSectionProps {
  eyebrow: string;
  heading: string;
  supportingCopy: string;
  bullets: BulletItem[];
  linkText: string;
  linkHref: string;
  mockup: React.ReactNode;
  alignRight: boolean;
}

export default function FeatureSection({
  eyebrow,
  heading,
  supportingCopy,
  bullets,
  linkText,
  linkHref,
  mockup,
  alignRight,
}: FeatureSectionProps) {
  // Framer Motion animation containers with custom easing [0.22, 1, 0.36, 1]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-24 md:py-32 overflow-hidden border-b border-white/5 last:border-b-0 max-w-7xl mx-auto px-6 relative">
      {/* Background drift glow elements */}
      <div className={`absolute top-1/3 ${alignRight ? '-left-20' : '-right-20'} w-80 h-80 bg-brand-teal/3 rounded-full blur-[120px] pointer-events-none animate-drift`} />
      <div className={`absolute bottom-1/3 ${alignRight ? '-right-20' : '-left-20'} w-80 h-80 bg-brand-violet/3 rounded-full blur-[120px] pointer-events-none animate-drift-reverse`} />

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10`}>
        
        {/* Content Column */}
        <div className={`lg:col-span-6 space-y-6 ${alignRight ? 'lg:order-1' : 'lg:order-2'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <span className="text-xs font-bold text-brand-teal uppercase tracking-widest font-mono block">
              {eyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-white tracking-tight leading-tight italic">
              {heading.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="not-italic font-bold text-transparent bg-gradient-to-r from-brand-teal to-brand-violet bg-clip-text animate-gradient-flow text-glow-green-sm">
                {heading.split(' ').slice(-1)}
              </span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              {supportingCopy}
            </p>
          </motion.div>

          {/* Scannable Bullets list with Framer Motion Stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4.5 pt-4 border-t border-white/5"
          >
            {bullets.map((bullet, idx) => {
              const isEven = idx % 2 === 0;
              const checkBg = isEven 
                ? 'bg-brand-teal/10 text-brand-teal group-hover/bullet:bg-brand-teal group-hover/bullet:text-[#08281F]' 
                : 'bg-brand-violet/10 text-brand-violet group-hover/bullet:bg-brand-violet group-hover/bullet:text-[#08281F]';

              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-3.5 group/bullet"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-[background-color,color] duration-300 ${checkBg}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">
                      {bullet.title}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5 leading-snug">
                      {bullet.desc}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Learn More link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-2"
          >
            <Link
              to={linkHref}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal hover:text-slate-900 dark:hover:text-white transition-[color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group/link font-mono"
            >
              {linkText}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Visual Mockup Column */}
        <div className={`lg:col-span-6 flex justify-center ${alignRight ? 'lg:order-2' : 'lg:order-1'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center"
          >
            {mockup}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
