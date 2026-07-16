/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, BarChart3, HelpCircle, ShieldAlert, ArrowRight, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices';

export default function Services() {
  const { services, loading, error } = useServices();

  const getIcon = (index: number) => {
    const icons = [
      <Eye className="w-6 h-6 text-brand-teal" />,
      <BarChart3 className="w-6 h-6 text-brand-teal" />,
      <HelpCircle className="w-6 h-6 text-brand-teal" />,
    ];
    return icons[index % icons.length] || <Server className="w-6 h-6 text-brand-teal" />;
  };

  const getLink = (index: number) => {
    const links = ['/mt5-account-visibility', '/how-it-works', '/contact'];
    return links[index % links.length] || '/contact';
  };

  const getBenefits = (index: number) => {
    const defaultBenefits = [
      [
        'Decoupled from order execution systems',
        'Secure token-based data fetching',
        'Intuitive metric cards (free margin, floating P/L)'
      ],
      [
        'Automated daily/weekly PDF exports',
        'Searchable, filterable closed trade logs',
        'Cumulative growth curves and win ratios'
      ],
      [
        'Direct "Click-to-Chat" client workflows',
        'Pre-populated consultation query templates',
        'Immediate lead validation and SMTP routing'
      ]
    ];
    return defaultBenefits[index % defaultBenefits.length] || [
      'Highly secure cloud infrastructure',
      'Real-time automated data updates',
      'Fully responsive layout design'
    ];
  };

  // Local fallback data to use if fetching fails or is empty, ensuring a flawless user experience
  const fallbackServices = [
    {
      id: 'fallback-1',
      title: 'MT5 Account Visibility',
      description: 'Connect read-only API feeds to mirror balance, equity, and margin levels inside an elegant, branded dashboard wrapper.',
    },
    {
      id: 'fallback-2',
      title: 'Dynamic Asset Reporting',
      description: 'Deliver scheduled or on-demand trade reports and performance charts that translate complex raw trades into clean visual metrics.',
    },
    {
      id: 'fallback-3',
      title: 'Integrated Client Communications',
      description: 'Bridge communication gaps with customized, interactive WhatsApp, email, and calling channels embedded directly within dashboards.',
    }
  ];

  const displayedServices = error || services.length === 0 ? fallbackServices : services;

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-brand-teal/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-brand-teal animate-spin" />
        </div>
        <p className="text-slate-400 text-sm font-medium animate-pulse">
          Retrieving live service modules...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-6">
      
      {/* Header section */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Core Solutions</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          Polished Administrative & <span className="not-italic font-bold">Communication Portals.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-base">
          Our specialized modules are designed to upgrade how asset managers and brokers showcase performance and manage incoming prospective leads.
        </p>
      </section>

      {/* Services Section with Fallback / Error Alert */}
      <section className="space-y-8">
        {error && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex gap-4 text-amber-500/90 text-xs leading-relaxed max-w-3xl">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white text-sm mb-1">Temporary Connection Issue</p>
              <p className="text-slate-400">
                The primary services backend at <code className="bg-white/5 px-1 py-0.5 rounded text-amber-400">{(import.meta as any).env?.VITE_STRAPI_API_URL || 'default API endpoint'}</code> is currently unreachable. Displaying fallback service modules for uninterrupted experience.
              </p>
            </div>
          </div>
        )}

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayedServices.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-[#131b2e]/60 border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col justify-between hover:border-brand-teal/20 transition-all relative overflow-hidden group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-slate-950 transition-colors">
                  {getIcon(idx)}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white leading-tight">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-5 space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Key Capabilities</span>
                  <ul className="space-y-2">
                    {getBenefits(idx).map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8">
                <Link
                  to={getLink(idx)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal hover:text-white group"
                >
                  Learn more about this module
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & isolation section */}
      <section className="bg-[#131b2e]/30 border border-white/5 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-brand-teal">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-brand-teal" />
            <span>Absolute Structural Isolation</span>
          </div>
          <h2 className="text-2xl font-display font-light text-white leading-tight italic">
            Capital Insulation <span className="not-italic font-bold">From External Hazards.</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            All Trade 360 data pipelines operate strictly on a secondary replication model. We query read-only performance ledgers from databases that do not store transaction permissions. No active connection ever exists from our outward-facing client accounts to live trading terminal inputs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-brand-teal hover:bg-brand-teal/90 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-teal/20 transition-all"
            >
              Consult On Security Setup
            </Link>
            <Link
              to="/security"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/10 bg-white/5 text-white font-bold uppercase tracking-wider text-xs transition-all"
            >
              Verify Security Standards
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer Strip */}
      <section>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-amber-500/80 text-[11px] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>
            <strong>Services Notice:</strong> Trade 360 provides administrative visibility solutions and automated corporate lead communication interfaces. We do not provide active trading brokerage permissions, investment advisory setups, or automated wealth strategies, and we do not hold user balances. All sample data is strictly for illustrative display.
          </p>
        </div>
      </section>

    </div>
  );
}
