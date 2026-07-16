/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, CheckCircle2, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Initial Consultation & Proposal',
      sub: 'Enquiry & Scope Identification',
      desc: 'Submit your firm details via our contact page. Our accounts team will coordinate a secure callback to scope your target audience, account numbers, and white-label branding needs.'
    },
    {
      num: '02',
      title: 'Bespoke Compliance & Risk Review',
      sub: 'Regulatory Alignment Check',
      desc: 'We map out visual templates matching your local financial regulations. This ensures all performance disclaimers, risk notifications, and consent checks are fully embedded and compliant.'
    },
    {
      num: '03',
      title: 'Secure Read-Only Account Mapping',
      sub: 'Decoupled API Configuration',
      desc: 'Connect your MT5 server reporting databases or read-only API keys. We establish highly isolated database mirrors to populate performance parameters with zero order-execution or withdrawal capabilities.'
    },
    {
      num: '04',
      title: 'Branded Dashboard Deployment',
      sub: 'Portal Go-Live & Domain Map',
      desc: 'We publish your private client portal. Your custom logo, brand colors, contact channels, and domain mapping go live under full 256-Bit SSL/TLS security structures.'
    },
    {
      num: '05',
      title: 'Continuous Technical Support',
      sub: 'Active Upkeep & Maintenance',
      desc: 'Enjoy ongoing portal monitoring, regular database sync checkups, automatic security audits, and dedicated developers on call via email or direct WhatsApp integrations.'
    }
  ];

  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-6">
      
      {/* Header section */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Deployment Timeline</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          How It Works: <span className="not-italic font-bold">Our Setup Journey.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-base">
          From initial consultation to a fully branded portal deployment, our specialized deployment pipelines are structured to respect safety, speed, and regulatory compliance.
        </p>
      </section>

      {/* Timeline Section */}
      <section className="relative">
        {/* Vertical center bar for roadmap timeline - dotted line between the green dots */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0 border-l-2 border-dotted border-brand-teal/40 dark:border-brand-teal/60 -translate-x-1/2 block" />

        <div className="space-y-16">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Visual marker dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-brand-teal border-4 border-brand-navy shadow-lg shadow-brand-teal/10 -translate-x-1/2 z-10" />

                {/* Timeline Card */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0">
                  <div className="bg-[#131b2e]/60 p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl space-y-4 hover:border-brand-teal/20 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-brand-teal uppercase tracking-wider block">
                        {step.sub}
                      </span>
                      <span className="font-mono text-3xl font-extrabold text-white/10">{step.num}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Spacer block for clean alignment */}
                <div className="w-[45%] hidden md:block" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action section */}
      <section className="bg-[#131b2e]/30 rounded-3xl p-8 md:p-12 border border-white/5 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-display font-light text-white italic leading-snug">
          Ready to Onboard Your <span className="not-italic font-bold">Brokerage?</span>
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          The typical white-label setup takes between 7 to 10 business days. Our operations team handles all technical data replication mapping, leaving you to focus on client engagement.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-brand-teal text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-1"
          >
            Schedule Onboarding Session
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp Chat
          </a>
        </div>
      </section>

    </div>
  );
}
