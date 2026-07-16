import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, TrendingUp, TrendingDown, CheckSquare, 
  Clock, Shield, ArrowUpRight, BarChart2, Check, ExternalLink 
} from 'lucide-react';

// MOCKUP 1: Account Visibility Card (shows balance, equity, P/L with green/red coding)
export function AccountVisibilityMockup() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative w-full max-w-md bg-brand-navy-light/90 border border-white/5 rounded-[2rem] p-6 shadow-2xl overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-teal/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-mono text-white font-bold uppercase tracking-wider">
            MT5 Read-Only Mirror #88291
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-brand-success bg-brand-success/5 px-2 py-0.5 rounded-full border border-brand-success/15">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
          SYNCED
        </span>
      </div>

      {/* Primary Balance Widget */}
      <div className="space-y-1 mb-6">
        <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block">
          Net Account Equity
        </span>
        <div className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight flex items-baseline gap-2">
          $184,520.40
          <span className="text-xs font-bold text-brand-success font-mono flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +8.2%
          </span>
        </div>
      </div>

      {/* Mini Grid Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-left">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
            Floating Profit/Loss
          </span>
          <div className="text-sm font-bold text-brand-success font-mono mt-1">
            +$12,450.20
          </div>
        </div>
        <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-left">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
            Margin Security Level
          </span>
          <div className="text-sm font-bold text-white font-mono mt-1">
            1,250.4%
          </div>
        </div>
      </div>

      {/* Floating Spark Chart visual inside the card */}
      <div className="p-3.5 bg-brand-navy-deep/60 rounded-2xl border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] font-mono text-slate-500">Live Tick Session Feed</span>
          <span className="text-[8px] font-mono text-slate-500">24h History</span>
        </div>
        <div className="h-10 flex items-end gap-1 pt-1 justify-between">
          {[20, 30, 25, 40, 35, 55, 48, 65, 58, 80, 72, 90].map((h, i) => (
            <div key={i} className="flex-1 h-full flex items-end">
              <motion.div 
                className={`w-full rounded-t-[1px] ${
                  i === 11 ? 'bg-brand-teal' : 'bg-slate-700/40'
                }`}
                animate={hovered ? { height: `${h}%` } : { height: `${Math.max(15, h - 5)}%` }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// MOCKUP 2: Status/Threshold State Card (shows progress with Active/Pending/Review badges)
export function StatusThresholdMockup() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    { title: 'Secure Domain Mapping', desc: 'Mapped to portal.firmname.com', status: 'Active', badgeColor: 'bg-brand-success/5 text-brand-success border-brand-success/15' },
    { title: 'MT5 Broker Read-Only Bridge', desc: 'Validating server token handshake', status: 'Pending', badgeColor: 'bg-amber-500/5 text-amber-400/90 border-amber-500/15' },
    { title: 'Administrative Compliance Audit', desc: 'Isolate database directories', status: 'Review', badgeColor: 'bg-blue-500/5 text-blue-400/90 border-blue-500/15' }
  ];

  return (
    <div className="relative w-full max-w-md bg-brand-navy-light/90 border border-white/5 rounded-[2rem] p-6 shadow-2xl overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-teal/5 rounded-full blur-2xl pointer-events-none" />

      {/* Title block */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
        <span className="text-[11px] font-mono text-white font-bold uppercase tracking-wider">
          White-Label Portal Deployment
        </span>
        <span className="text-[9px] font-mono text-slate-500">Pipeline State</span>
      </div>

      {/* Progress tracker steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div 
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
              activeStep === idx 
                ? 'bg-white/5 border-brand-teal/20 shadow-md' 
                : 'bg-transparent border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                  idx < activeStep 
                    ? 'bg-brand-success/10 text-brand-success' 
                    : idx === activeStep 
                    ? 'bg-brand-teal text-slate-950 font-bold' 
                    : 'bg-white/5 text-slate-500'
                }`}>
                  {idx < activeStep ? <Check className="w-3 h-3" /> : idx + 1}
                </div>
                <div>
                  <h4 className={`text-xs font-bold leading-none ${activeStep === idx ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-1 max-w-[210px]">
                    {step.desc}
                  </p>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-wider border shrink-0 ${step.badgeColor}`}>
                {step.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Live progress percentage bar */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-1">
            <span>Overall Launch Progress</span>
            <span className="font-bold text-brand-teal">66%</span>
          </div>
          <div className="w-full h-1.5 bg-brand-navy-deep rounded-full overflow-hidden">
            <div className="h-full bg-brand-teal rounded-full w-2/3" />
          </div>
        </div>
      </div>

    </div>
  );
}

// MOCKUP 3: Small Comparison Cards (shows 2-3 mock account summaries side-by-side)
export function ComparisonMockup() {
  const [selectedCard, setSelectedCard] = useState<number>(0);

  const mockPortfolios = [
    {
      id: 0,
      name: 'Conservative Yield Pool',
      type: 'Low Drawdown profile',
      equity: '$124,500.20',
      returnRate: '+11.2%',
      maxDrawdown: '3.8%'
    },
    {
      id: 1,
      name: 'Balanced Core Growth',
      type: 'Moderately active strategy',
      equity: '$418,905.10',
      returnRate: '+24.8%',
      maxDrawdown: '8.4%'
    },
    {
      id: 2,
      name: 'Liquid Alpha Fund',
      type: 'Dynamic high-frequency feed',
      equity: '$840,220.00',
      returnRate: '+42.1%',
      maxDrawdown: '14.2%'
    }
  ];

  return (
    <div className="relative w-full max-w-md bg-brand-navy-light/90 border border-white/5 rounded-[2rem] p-6 shadow-2xl overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-teal/5 rounded-full blur-2xl pointer-events-none" />

      {/* Title bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
        <span className="text-[11px] font-mono text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
          <BarChart2 className="w-4 h-4 text-brand-teal" />
          Multi-Account Mappings
        </span>
        <span className="text-[9px] font-mono text-slate-500">Live Comparison</span>
      </div>

      <p className="text-[10px] text-slate-400 leading-relaxed mb-4 text-left">
        Map and compare multiple connected investor streams dynamically from a single administrative hub. Click below to inspect active sheets.
      </p>

      {/* Comparison listings side-by-side / stack */}
      <div className="space-y-3">
        {mockPortfolios.map((portfolio, idx) => (
          <div
            key={portfolio.id}
            onClick={() => setSelectedCard(portfolio.id)}
            className={`p-3 rounded-2xl border transition-all text-left relative overflow-hidden cursor-pointer ${
              selectedCard === portfolio.id
                ? 'bg-white/5 border-brand-teal/20 shadow-lg'
                : 'bg-brand-navy-deep/30 border-white/5 hover:border-white/10'
            }`}
          >
            {selectedCard === portfolio.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-teal" />
            )}
            
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-white leading-none">
                  {portfolio.name}
                </h4>
                <p className="text-[9px] text-slate-500 mt-1 leading-none">
                  {portfolio.type}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-white font-mono block">
                  {portfolio.equity}
                </span>
                <span className="text-[9px] font-mono font-bold text-brand-success">
                  {portfolio.returnRate}
                </span>
              </div>
            </div>

            {selectedCard === portfolio.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-400"
              >
                <span>Max Drawdown: <strong className="text-rose-400 font-bold">{portfolio.maxDrawdown}</strong></span>
                <span className="text-brand-teal flex items-center gap-0.5 font-bold uppercase tracking-wider">
                  View full sheet
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
