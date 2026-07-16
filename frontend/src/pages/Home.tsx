import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Lock } from 'lucide-react';

// Modular Components
import StatsStrip from '../components/StatsStrip';
import DashboardMockup from '../components/DashboardMockup';
import FeatureSection from '../components/FeatureSection';
import TestimonialGrid from '../components/TestimonialGrid';
import FAQAccordion from '../components/FAQAccordion';
import FinalCTA from '../components/FinalCTA';

// High-fidelity Mockups
import { 
  AccountVisibilityMockup, 
  StatusThresholdMockup, 
  ComparisonMockup 
} from '../components/FeatureMockups';

export default function Home() {
  return (
    <div className="pt-24 pb-16 space-y-24 text-slate-300">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-6 pt-12 pb-8">
        {/* Soft background ambient lights that drift slowly */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-teal/4 rounded-full blur-3xl pointer-events-none animate-drift" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brand-violet/4 rounded-full blur-3xl pointer-events-none animate-drift-reverse" />

        <div className="text-center space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Accent Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-brand-teal font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current text-brand-teal animate-pulse" />
            <span>Interactive Account Visibility Suite</span>
          </motion.div>
          
          {/* Huge confident headline with animated color gradient flow */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-transparent bg-gradient-to-r from-brand-teal via-brand-teal-light to-brand-violet bg-clip-text animate-gradient-flow tracking-tight leading-[1.1] italic text-glow-green"
          >
            Transparency <span className="not-italic font-bold">Redefined.</span>
          </motion.h1>
          
          {/* One-line subtext as requested */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl font-sans"
          >
            Connect MetaTrader accounts safely and deliver stunning white-labeled portals to investors.
          </motion.p>

          {/* Two CTA buttons side by side ("Get Started" solid, "Explore Features" ghost/outline as requested) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3.5 pt-4 w-full sm:w-auto"
          >
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-brand-teal hover:bg-brand-teal-light text-white-forced font-bold uppercase tracking-wider text-xs transition-spring shadow-lg shadow-brand-teal/15 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              Get Started
              <ArrowRight className="w-4 h-4 text-white-forced" />
            </Link>
            <Link
              to="/services"
              className="px-8 py-3.5 rounded-full border border-black/10 dark:border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-spring flex items-center justify-center hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              Explore Features
            </Link>
          </motion.div>

          {/* Core Guarantees Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 pt-6 border-t border-white/5 w-full max-w-sm mt-2"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
              <span>MT5 Native integration</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <Lock className="w-4 h-4 text-brand-teal shrink-0" />
              <span>100% Read-Only</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Thin Stats Strip directly below Hero */}
      <StatsStrip />

      {/* 3. Central Visual Anchor: Animated Dashboard Mockup */}
      <DashboardMockup />

      {/* 4. Section Pattern (reusing modular FeatureSection component, alternating left/right) */}
      <div className="space-y-4">
        
        {/* Feature 1: Account Visibility */}
        <FeatureSection
          eyebrow="ACCOUNT VISIBILITY"
          heading="Unified Trading Metrics Mirroring"
          supportingCopy="Provide clients with an elegant, responsive window into balance, equity, and floating metrics directly from MetaTrader servers. Deliver comprehensive transparency while shielding your transaction routing."
          bullets={[
            {
              title: "100% Read-Only Safety",
              desc: "Under no circumstances can portals access write credentials or execute orders. Capital remains isolated."
            },
            {
              title: "Native MetaTrader 5 Sync",
              desc: "Secure, continuous socket integration maps database performance metrics into beautiful UI."
            },
            {
              title: "Interactive Live Curve",
              desc: "Generate responsive growth charts and lists of closed historic trades calculated automatically."
            }
          ]}
          linkText="Explore Mapping Services"
          linkHref="/services"
          mockup={<AccountVisibilityMockup />}
          alignRight={true}
        />

        {/* Feature 2: White Label */}
        <FeatureSection
          eyebrow="WHITE-LABEL PORTALS"
          heading="Your Brand, Your Client Subdomain"
          supportingCopy="Establish immediate corporate credibility. Run your customized, private investor dashboard directly through your own brand's subdomain while configuring accent colors, logos, and favicons."
          bullets={[
            {
              title: "Custom Domain Routing",
              desc: "Host secure client login directories at portal.yourfirm.com with automated SSL configurations."
            },
            {
              title: "Accents & Brand Sync",
              desc: "Upload brand assets, set CSS color schemes, and synchronize custom automated emails."
            },
            {
              title: "Granular Privacy Controls",
              desc: "Control layout, tabs, and metric access on a per-user, group, or system administrator level."
            }
          ]}
          linkText="Review Onboarding Pipeline"
          linkHref="/how-it-works"
          mockup={<StatusThresholdMockup />}
          alignRight={false}
        />

        {/* Feature 3: Security & Admin */}
        <FeatureSection
          eyebrow="SECURITY & GOVERNANCE"
          heading="Granular Administrator Control"
          supportingCopy="Govern your corporate trading operations safely. Restrict customer records, oversee administrative status queues, and compile regulatory audit logs of all user session telemetry."
          bullets={[
            {
              title: "Role-Based Permissions",
              desc: "Partition directories isolating compliance officers, sales representatives, and client views."
            },
            {
              title: "Immutable Action Logging",
              desc: "Detailed ledger records every dashboard login, administrative setting change, and data export."
            },
            {
              title: "Harden transport layers",
              desc: "Guarded by secure HTTP-only cookies, automated session termination, and MFA parameters."
            }
          ]}
          linkText="Check Security Protocols"
          linkHref="/security"
          mockup={<ComparisonMockup />}
          alignRight={true}
        />

      </div>

      {/* 5. Social Proof Grid */}
      <TestimonialGrid />

      {/* 6. FAQ Accordion section (Smooth slide-downs & 2-column header) */}
      <FAQAccordion />

      {/* 7. Final Simple CTA (Full band, high contrast) */}
      <FinalCTA />

      {/* 8. Disclaimer strip */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-amber-500/5 border border-amber-500/10 text-amber-500/70 rounded-2xl p-5 flex gap-3 text-[11px] leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-amber-500/80 shrink-0 mt-0.5" />
          <p>
            <strong>Regulatory Disclaimer:</strong> Trade 360 provides account visibility interfaces, dynamic administrative templates, and lead-generation communication tools. Trade 360 is an independent software supplier and does not provide investment recommendations, brokerage clearing, asset execution, signals, or hold funds. Trading carries significant risk of financial loss.
          </p>
        </div>
      </section>

    </div>
  );
}
