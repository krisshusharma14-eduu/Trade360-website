/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, HelpCircle, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const tiers = [
    {
      name: 'Essential Setup',
      desc: 'Ideal for early-stage boutique asset managers seeking clean visibility.',
      price: 'Custom Quote',
      priceSub: 'Starting from low predictable setups',
      features: [
        'Up to 5 secure client account maps',
        'Standard Trade 360 branded layouts',
        'Read-only MT5 balance & equity metrics',
        'Email notification lead routing',
        'Self-service administrative control panel',
        'Email & ticketing support (24hr response)'
      ],
      cta: 'Contact for Essential Quote',
      popular: false
    },
    {
      name: 'Professional Tier',
      desc: 'Optimized for rapidly expanding brokers and dedicated trading desks.',
      price: 'Custom Quote',
      priceSub: 'Bespoke volume pricing plans',
      features: [
        'Up to 50 client account maps',
        'Semi-custom color & logo integrations',
        'Advanced performance charts & logs',
        'Direct WhatsApp contact triggers',
        'SMTP-driven admin notification alerts',
        'Priority Slack & phone support (12hr response)',
        'Standard audit logs & exportable registers'
      ],
      cta: 'Contact for Professional Quote',
      popular: true
    },
    {
      name: 'Enterprise White-Label',
      desc: 'For institutional brokerages demanding comprehensive multi-tenant networks.',
      price: 'Custom Quote',
      priceSub: 'Dedicated deployment plans',
      features: [
        'Unlimited client account directories',
        'Full white-label (Your custom domain)',
        'Bespoke database or custom replica feeds',
        'Role-Based Staff Access (Compliance/Sales)',
        'Immutable compliance audit logging',
        '24/7/365 dedicated technical developer SLA',
        'Comprehensive CSV & Excel lead exports'
      ],
      cta: 'Contact for Enterprise Quote',
      popular: false
    }
  ];

  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-6">
      
      {/* Header section */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Deployment Options</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          Tailored White-Label <span className="not-italic font-bold">Packages.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-base font-sans">
          Trade 360 is delivered as a bespoke subscription service tailored to the volume of your client accounts, active replica feeds, and brand customizability.
        </p>
      </section>

      {/* Pricing cards grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all ${
              tier.popular
                ? 'border-brand-teal bg-[#131b2e]/80 shadow-2xl shadow-brand-teal/5 lg:scale-105 z-10'
                : 'border-white/5 bg-[#131b2e]/60 shadow-xl'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-4 right-4 bg-brand-teal text-slate-950 text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Most Selected
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">{tier.desc}</p>
              </div>

              <div className="py-4 border-y border-white/5">
                <span className="text-3xl font-display font-light text-white block">
                  {tier.price}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                  {tier.priceSub}
                </span>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <ShieldCheck className="w-4.5 h-4.5 text-brand-teal shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5">
              <Link
                to="/contact"
                className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 hover:-translate-y-0.5 ${
                  tier.popular
                    ? 'bg-brand-teal text-slate-950 hover:bg-brand-teal/90 shadow-lg shadow-brand-teal/20'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {tier.cta}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Support FAQ notice */}
      <section className="bg-[#131b2e]/30 rounded-3xl p-8 md:p-12 border border-white/5 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-display font-light text-white italic">
          Need a Completely <span className="not-italic font-bold">Custom Deployment?</span>
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          If your asset management desk operates complex multi-broker liquidity systems or requires dedicated server nodes, contact our enterprise team directly for a tailored quote.
        </p>
        <div className="flex justify-center">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp Account Consultation
          </a>
        </div>
      </section>

    </div>
  );
}
