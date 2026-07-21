/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import LeadForm from '../components/LeadForm';

interface ContactProps {
  onAddToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export default function Contact({ onAddToast }: ContactProps) {
  const whatsappNumber = '+919825020271';
  const message = encodeURIComponent('Hello Trade 360, I am interested in scheduling a customized platform consultation.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const contactChannels = [
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-400 fill-current" />,
      title: 'WhatsApp Messaging',
      desc: 'Connect immediately to our client support agents.',
      actionText: 'Open WhatsApp Chat',
      actionUrl: whatsappUrl,
      target: '_blank',
      bg: 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: <Phone className="w-5 h-5 text-sky-400" />,
      title: 'Direct Corporate Call',
      desc: 'Call our accounts desk (Monday - Friday, 9:00 - 18:00 GMT).',
      actionText: '+917727079410',
      actionUrl: 'tel:+917727079410',
      target: '_self',
      bg: 'bg-sky-500/5 hover:bg-sky-500/10 border-sky-500/20'
    },
    {
      icon: <Mail className="w-5 h-5 text-indigo-400" />,
      title: 'Sales Email Ticketing',
      desc: 'Submit detailed compliance or pricing inquiries.',
      actionText: 'trade360@zohomail.in',
      actionUrl: 'mailto:trade360@zohomail.in',
      target: '_self',
      bg: 'bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/20'
    }
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 space-y-16">
      
      {/* Header section */}
      <section className="max-w-2xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Corporate Desk</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          Request A Private <span className="not-italic font-bold">Portal Consultation.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-sm">
          Speak with our platform engineers to schedule a white-label demonstration, map out compliant client agreements, or request private trial credentials.
        </p>
      </section>

      {/* Main Grid: Form Left, Channels Right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Validated Lead Form */}
        <div className="lg:col-span-7">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display font-light text-white italic">
                Secure <span className="not-italic font-bold">Consultation Request.</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Fields marked with an asterisk (*) are strictly required for security validation.</p>
            </div>
            <LeadForm
              onSuccess={(msg) => onAddToast('Request Logged', msg, 'success')}
              onError={(msg) => onAddToast('Form Validation Error', msg, 'error')}
            />
          </div>
        </div>

        {/* Right Side: Communication channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-display font-light text-white italic">
              Alternative <span className="not-italic font-bold">Channels.</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prefer a direct conversation? Access our active support channels below for immediate assistance during standard market hours.
            </p>
          </div>

          <div className="space-y-4">
            {contactChannels.map((chan, idx) => (
              <a
                key={idx}
                href={chan.actionUrl}
                target={chan.target}
                rel="noopener noreferrer"
                className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${chan.bg}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {chan.icon}
                </div>
                <div className="space-y-1 select-none">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{chan.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{chan.desc}</p>
                  <span className="text-xs font-mono text-brand-teal block pt-1 hover:underline">
                    {chan.actionText}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* SLA badge */}
          <div className="bg-[#131b2e]/60 border border-white/5 p-5 rounded-2xl flex items-center gap-3 text-slate-400 text-xs">
            <Clock className="w-5 h-5 text-slate-500 shrink-0" />
            <span>Standard SLA response window is <strong>1 business day</strong>.</span>
          </div>

          {/* Secure disclaimer */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-3 text-emerald-500/80 text-xs leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 block">Encrypted Transmission</span>
              <p className="text-slate-400">
                All form submissions are encrypted via 256-Bit TLS secure layers and stored inside isolated multi-tenant databases, protected against unauthorized sniffing or leakage.
              </p>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
