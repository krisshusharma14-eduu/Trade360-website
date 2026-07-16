/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Lock, Layers, Eye, Landmark, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Security() {
  const securityPillars = [
    {
      icon: <Lock className="w-5 h-5 text-brand-teal" />,
      title: '256-Bit SSL/TLS Encryption',
      desc: 'All incoming and outgoing web traffic is encrypted using banking-grade Transport Layer Security, shielding data transit from external snooping.'
    },
    {
      icon: <Eye className="w-5 h-5 text-brand-teal" />,
      title: 'Decoupled Read-Only Access',
      desc: 'Our portals never store active trading passwords or withdrawal PINs. We ingest performance metrics via isolated read-only replication ports.'
    },
    {
      icon: <Layers className="w-5 h-5 text-brand-teal" />,
      title: 'Isolated Database Architectures',
      desc: 'We enforce strict multi-tenant schema isolation, ensuring that client portfolios are strictly locked behind their specific user login profiles.'
    },
    {
      icon: <FileText className="w-5 h-5 text-brand-teal" />,
      title: 'Immutable Administrative Auditing',
      desc: 'All login actions, lead exports, status modifications, and report generations trigger automatic, immutable compliance audit logging.'
    }
  ];

  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-6">
      
      {/* Header section */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Security Protocols</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          Enterprise Security & <span className="not-italic font-bold">Data Isolation.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-base">
          Our administrative overlays are engineered around a central philosophy: absolute protection of your brand, your compliance profile, and your client data.
        </p>
      </section>

      {/* Security Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {securityPillars.map((pil, idx) => (
          <div key={idx} className="bg-[#131b2e]/60 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl space-y-4 hover:border-brand-teal/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/5 text-brand-teal flex items-center justify-center border border-white/10">
              {pil.icon}
            </div>
            <h3 className="text-base font-display font-bold text-white">{pil.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{pil.desc}</p>
          </div>
        ))}
      </section>

      {/* Read-only detail section */}
      <section className="bg-[#131b2e]/30 rounded-3xl p-8 md:p-12 border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-brand-teal">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Zero Fund Access Architecture</span>
          </div>
          <h2 className="text-2xl font-display font-light text-white leading-tight italic">
            Capital Integrity <span className="not-italic font-bold">Via Read-Only Safety.</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            In standard client portals, database credentials often bundle order executions, risking exposure to malicious visual hijacking. Trade 360 solves this completely by building a strict firewall:
          </p>
          <ul className="space-y-3.5 text-xs text-slate-300 font-medium">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
              Primary live brokerage order book operates in complete network isolation.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
              Trade 360 portal reads from secondary, replica read-only databases.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
              Clients have zero methods or scripts capable of entering trades or adjusting leverage.
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5 bg-[#131b2e]/60 text-slate-300 p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
          <h4 className="text-white font-display font-bold text-sm">Need a Technical Whitepaper?</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We provide compliance directors and security officers with detailed platform maps, encryption guidelines, and server architecture disclosures on request.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-brand-teal hover:bg-brand-teal/90 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-teal/20"
            >
              Request Security Documents
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance / Disclaimer section */}
      <section className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 space-y-3 text-amber-500/80 text-xs leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider text-amber-500">
          <Landmark className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Security & Compliance Disclaimer</span>
        </div>
        <p>
          While Trade 360 deploys multi-layered, state-of-the-art security practices to protect data transit and isolated performance metrics, clients should recognize that electronic network systems are subject to standard digital risks. Trade 360 is strictly an administrative visualization and communication wrapper. We do not engage in active broker clearing, handle client portfolios, or offer execution accounts.
        </p>
      </section>

    </div>
  );
}
