/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Sparkles, Target, Landmark, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const coreValues = [
    {
      icon: <Target className="w-5 h-5 text-brand-teal" />,
      title: 'Operational Transparency',
      desc: 'We believe investors are entitled to absolute clarity. Our software is engineered to translate complex back-office ledger data into elegant, digestible, readable visual charts.'
    },
    {
      icon: <Shield className="w-5 h-5 text-brand-teal" />,
      title: 'Compromise-Free Safety',
      desc: 'By limiting platform capabilities strictly to read-only reporting endpoints, we completely decouple visibility from execution, ensuring client funds remain completely isolated.'
    },
    {
      icon: <Landmark className="w-5 h-5 text-brand-teal" />,
      title: 'Institutional Integrity',
      desc: 'Trade 360 operates under absolute compliance standards. We reject marketing hype, profit guarantees, and high-frequency speculative visuals, prioritizing institutional aesthetics.'
    }
  ];

  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-6">
      
      {/* Header section */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Our Profile</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          Pioneering Clear, <span className="not-italic font-bold text-white">Read-Only Integrity.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-base font-sans">
          Trade 360 was founded in 2026 to resolve a major communication bottleneck in the asset management industry: delivering high-fidelity performance reporting to clients without compromising security.
        </p>
      </section>

      {/* Narrative grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-light text-white italic">Our Corporate <span className="not-italic font-bold text-white">Story</span></h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            In the modern financial landscapes, clients demand higher frequencies of account engagement. Traditional asset managers and brokers relied on distributing manual spreadsheets or monthly PDF templates—introducing operational friction and delays.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Firms attempting to build custom portals faced massive security risks, often granting web platforms direct write-access database connections that exposed trading terminals to hacking attempts.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Trade 360 solved this problem by designing a specialized, highly isolated, read-only administrative reporting layer. We focus on showcasing performance cleanly, ensuring that client capital remains completely untouched inside regulated broker structures.
          </p>
        </div>

        <div className="bg-[#131b2e]/60 border border-white/10 rounded-3xl p-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-brand-teal">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Mission & Philosophy</span>
          </div>
          <h3 className="text-lg font-display font-bold text-white leading-snug">
            To professionalize investor relationships through clean visual presentation and absolute technical safety.
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We operate with the strong belief that visual quality is a direct reflection of professional standards. A neat, high-contrast, clutter-free dashboard instills massive confidence, reducing client churn and helping asset managers attract institutional-grade capital.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal hover:text-white transition-colors"
            >
              Partner with Trade 360
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Governance Standards</span>
          <h2 className="text-3xl font-display font-light text-white tracking-tight italic">
            Our Core <span className="not-italic font-bold">Values.</span>
          </h2>
          <p className="text-slate-400 text-xs">
            How we maintain absolute trust and engineering compliance across our global white-label solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((val, idx) => (
            <div key={idx} className="p-6 bg-[#131b2e]/60 border border-white/5 rounded-2xl shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-teal">
                {val.icon}
              </div>
              <h3 className="text-base font-display font-bold text-white">{val.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regulatory disclosure banner */}
      <section className="bg-[#131b2e]/30 border border-white/5 p-6 rounded-2xl flex items-start gap-4 text-xs text-slate-400 leading-relaxed">
        <Landmark className="w-6 h-6 text-brand-teal shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Corporate Legal Disclosure</h4>
          <p>
            Trade 360 acts solely as an independent administrative software supplier. We specialize in compiling read-only visual representations from account metrics. We do not provide financial advice, broker clearing capabilities, investment signals, or process client funds. Any historical performance charts displayed are strictly illustrative.
          </p>
        </div>
      </section>

    </div>
  );
}
