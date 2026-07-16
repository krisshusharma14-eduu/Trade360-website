import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'Is Trade 360 a regulated brokerage firm?',
    a: 'No. Trade 360 is an independent administrative software supplier. We do not provide brokerage services, hold investor capital, sell signals, or execute live transactions. We design secure, read-only overlays and custom communication tools.'
  },
  {
    q: 'Can client portal interfaces initiate order execution or withdrawals?',
    a: 'Absolutely not. All MetaTrader mappings and client portals run on 100% isolated read-only data streams. Capital remains completely untouched and isolated within your regulated broker books.'
  },
  {
    q: 'How long does a custom white-label portal deployment take?',
    a: 'Standard white-label deployments—which include mapping your custom subdomain, applying your company color palettes, uploading brand logos, and configuring SSL cookies—are completed within 7 to 10 business days.'
  },
  {
    q: 'What server versions or platforms do you support?',
    a: 'We natively support secure socket mappings for MetaTrader 5 (MT5) server databases. Our engineering team can also coordinate with proprietary REST endpoints or standard reporting bridges.'
  },
  {
    q: 'How is client data protected and isolated?',
    a: 'We enforce absolute multi-tenant database isolation. Each client directory, log trail, and mirroring configuration resides in partitioned storage layers, guarded by bank-grade 256-Bit SSL transport encryptions and MFA protocols.'
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
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
    <section className="py-24 max-w-7xl mx-auto px-6 border-b border-white/5 relative">
      {/* Background glow element */}
      <div className="absolute bottom-12 right-10 w-96 h-96 bg-brand-violet/4 rounded-full blur-[120px] pointer-events-none animate-drift" />

      {/* Two-Column Header Layout as requested */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start relative z-10">
        <div className="lg:col-span-5 text-left">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest font-mono block mb-2">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-3xl font-display font-light text-white tracking-tight leading-tight italic">
            Frequently Asked <span className="not-italic font-bold text-transparent bg-gradient-to-r from-brand-teal via-brand-teal-light to-brand-violet bg-clip-text animate-gradient-flow text-glow-green-sm">Questions.</span>
          </h2>
        </div>
        <div className="lg:col-span-7 text-left">
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
            Learn more about our secure MT5 read-only data mapping pipelines, client white-label deployments, corporate compliance standards, and administrative controls.
          </p>
        </div>
      </div>

      {/* Accordion List - Single Column, Max-Width Centered */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-3xl mx-auto space-y-3.5 relative z-10"
      >
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const iconColor = idx % 2 === 0 ? 'text-brand-teal' : 'text-brand-violet';
          
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-brand-navy-light/60 border border-white/5 rounded-3xl overflow-hidden transition-[border-color,background-color] duration-300 hover:border-white/10 hover:bg-brand-navy-light/85"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-white text-sm focus:outline-none cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className={`w-4 h-4 shrink-0 ${iconColor}`} />
                  {faq.q}
                </span>
                <span className="p-1 rounded-full bg-white/5 text-slate-400 shrink-0">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-brand-teal" /> : <Plus className="w-3.5 h-3.5" />}
                  </motion.div>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-400 leading-relaxed pl-13 border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
