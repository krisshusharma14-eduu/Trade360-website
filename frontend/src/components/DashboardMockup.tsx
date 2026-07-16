import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, RefreshCw, Lock, ShieldCheck, 
  Database, Radio, Terminal, Server, CheckCircle2, AlertCircle, Sparkles, Cpu
} from 'lucide-react';

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<'overview' | 'mirrors' | 'audits'>('overview');
  const [liveQueryCount, setLiveQueryCount] = useState(128450);
  const [lastMirrorTime, setLastMirrorTime] = useState('Just now');
  const [queryPulse, setQueryPulse] = useState(false);

  // Simulate real-time read-only query incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveQueryCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setQueryPulse(true);
      setTimeout(() => setQueryPulse(false), 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0 mt-8 mb-16 relative group">
      {/* Background drifting glow effects to create a beautiful moving background aurora */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-brand-teal/8 via-brand-violet/6 to-transparent rounded-[2.2rem] blur-3xl opacity-60 group-hover:opacity-85 transition-opacity duration-1000 pointer-events-none animate-drift" />
      <div className="absolute -inset-4 bg-gradient-to-bl from-brand-violet/5 via-brand-teal/3 to-transparent rounded-[2.2rem] blur-3xl opacity-40 pointer-events-none animate-drift-reverse" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-light/10 to-brand-navy/60 rounded-3xl pointer-events-none" />

      {/* Main glass card container */}
      <div className="relative bg-brand-navy-light/80 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* Mock Window Header / Top Bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-brand-navy-deep/90">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <div className="h-4 w-[1px] bg-white/5 mx-2" />
            <span className="text-[10px] md:text-xs font-mono text-slate-500 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-brand-teal" />
              trade360.internal-mirror.net
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/15 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>100% Read-Only Tunnel</span>
            </div>
          </div>
        </div>

        {/* Dashboard Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          
          {/* Mock Left Sidebar Panel */}
          <div className="md:col-span-3 border-r border-white/5 bg-brand-navy-deep/30 p-4 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3">
                Interface Control
              </div>
              <nav className="space-y-1.5">
                {[
                  { id: 'overview', label: 'Client Overview', icon: <BarChart3 className="w-4 h-4" />, accent: 'brand-teal' },
                  { id: 'mirrors', label: 'MetaTrader Bridges', icon: <Radio className="w-4 h-4" />, accent: 'brand-violet' },
                  { id: 'audits', label: 'Audit Trail Logs', icon: <Terminal className="w-4 h-4" />, accent: 'brand-gold' }
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  let activeClass = '';
                  let iconColorClass = '';
                  
                  if (isActive) {
                    if (item.accent === 'brand-teal') {
                      activeClass = 'bg-brand-teal text-[#08281F] shadow-lg shadow-brand-teal/15 font-bold';
                      iconColorClass = 'text-[#08281F]';
                    } else if (item.accent === 'brand-violet') {
                      activeClass = 'bg-brand-violet text-[#1A1230] shadow-lg shadow-brand-violet/15 font-bold';
                      iconColorClass = 'text-[#1A1230]';
                    } else {
                      activeClass = 'bg-brand-gold text-[#08281F] shadow-lg shadow-brand-gold/15 font-bold';
                      iconColorClass = 'text-[#08281F]';
                    }
                  } else {
                    activeClass = 'text-slate-400 hover:text-white hover:bg-white/5';
                    if (item.accent === 'brand-teal') iconColorClass = 'text-brand-teal';
                    else if (item.accent === 'brand-violet') iconColorClass = 'text-brand-violet';
                    else iconColorClass = 'text-brand-gold';
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-[background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-left cursor-pointer ${activeClass}`}
                    >
                      <span className={iconColorClass}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Simulated Live telemetry widget */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Secure Feed</span>
                <span className="text-[8px] font-mono text-brand-violet flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
                  Live Sync
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white font-mono tabular-nums flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                  <span className={queryPulse ? 'text-brand-teal transition-colors duration-100' : 'text-white'}>
                    {liveQueryCount.toLocaleString()}
                  </span>
                </div>
                <div className="text-[9px] text-slate-500 font-mono">Read-only logs managed today</div>
              </div>
            </div>
          </div>

          {/* Main Panel Area */}
          <div className="md:col-span-9 p-6 bg-[#090A0C]/30 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 flex-1"
                >
                  {/* Overview Top bar info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-brand-teal flex items-center gap-2">
                        <Sparkles className="w-4 h-4 fill-current animate-pulse text-brand-teal" />
                        Investor Mirror View
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">Simulated representative view exposed to connected clients.</p>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl shrink-0">
                      Mirror Latency: <span className="text-brand-success font-bold">14ms</span>
                    </div>
                  </div>

                  {/* High level metrics cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-brand-navy-light/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-brand-teal/20 transition-[border-color,background-color] duration-300">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Net Portfolio Equity</span>
                      <div className="text-xl font-bold text-white mt-2">$2,418,905.10</div>
                      <span className="text-[9px] font-bold text-brand-teal flex items-center gap-0.5 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/80 animate-pulse mr-1" />
                        Live Feed Connected
                      </span>
                    </div>
                    <div className="bg-brand-navy-light/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-brand-violet/20 transition-[border-color,background-color] duration-300">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Floating Gain/Loss</span>
                      <div className="text-xl font-bold text-brand-success mt-2 font-mono">+$84,520.40</div>
                      <span className="text-[9px] font-mono text-slate-500 mt-2 block">Leverage ratio: 1:100</span>
                    </div>
                    <div className="bg-brand-navy-light/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-brand-gold/20 transition-[border-color,background-color] duration-300">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Primary Free Margin</span>
                      <div className="text-xl font-bold text-white mt-2">$1,940,810.00</div>
                      <span className="text-[9px] font-bold text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded w-fit mt-2 font-mono">
                        Margin Lvl: 850.4%
                      </span>
                    </div>
                  </div>

                  {/* Chart Representation */}
                  <div className="bg-brand-navy-deep/40 border border-white/5 rounded-2xl p-4.5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-violet animate-pulse" />
                        <span className="text-xs font-bold text-white">Consolidated Client Equity Curve</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">Interval: 1 Month (24h Sync)</span>
                    </div>
                    
                    {/* Visual bar chart with high aesthetics */}
                    <div className="h-28 flex items-end justify-between gap-1.5 pt-4">
                      {[35, 45, 40, 58, 52, 65, 60, 78, 70, 85, 92, 100].map((height, idx) => {
                        const isPrimary = idx === 11;
                        let barBg = 'bg-white/5 hover:bg-brand-teal/25';
                        if (isPrimary) {
                          barBg = 'bg-gradient-to-t from-brand-teal/60 via-brand-violet/80 to-brand-violet shadow-[0_0_12px_rgba(129,140,248,0.25)]';
                        }
                        
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group/bar">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 0.7, delay: idx * 0.04 }}
                              className={`w-full rounded-t-sm transition-[height,background-color] duration-300 ${barBg}`}
                            />
                            <span className="text-[8px] text-slate-500 font-mono">M{idx+1}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'mirrors' && (
                <motion.div
                  key="mirrors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 flex-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-brand-violet flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-brand-violet shrink-0" />
                        MetaTrader 5 Native Mirror Bridges
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">Secure, socket-based connection pipelines running 100% read-only feeds.</p>
                    </div>
                  </div>

                  {/* Mirror listings */}
                  <div className="space-y-3.5">
                    {[
                      { server: 'Trade360-MT5-Primary-01', status: 'Active', latency: '12ms', accounts: 342, security: '256-Bit SSL' },
                      { server: 'Trade360-MT5-Fallback-02', status: 'Active', latency: '19ms', accounts: 118, security: '256-Bit SSL' },
                      { server: 'Trade360-MT5-Compliance-03', status: 'Audit Ready', latency: '14ms', accounts: 25, security: 'TLS 1.3 Restricted' },
                    ].map((srv, index) => (
                      <div key={index} className="bg-brand-navy-light/60 border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-brand-violet/20 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl shrink-0 ${
                            srv.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-violet/10 text-brand-violet'
                          }`}>
                            <Radio className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white font-mono">{srv.server}</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">Connected Accounts: <span className="text-slate-300 font-bold">{srv.accounts}</span></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-[10px] font-mono text-slate-400">Latency: <span className="text-emerald-400 font-bold">{srv.latency}</span></div>
                            <span className="text-[9px] font-mono text-slate-500 block mt-0.5">{srv.security}</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            srv.status === 'Active' 
                              ? 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/15 shadow-[0_0_8px_rgba(16,185,129,0.1)]' 
                              : 'bg-brand-violet/5 text-brand-violet border border-brand-violet/15 shadow-[0_0_8px_rgba(129,140,248,0.15)]'
                          }`}>
                            {srv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-brand-amber/5 border border-brand-amber/15 p-3.5 rounded-2xl flex items-start gap-2.5 text-[10px] text-brand-amber/80 leading-relaxed">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Compliance Enforced:</strong> These connections are fully locked in read-only mode via hardware network routers. Under no circumstances can these bridges execute transactions or query deposit credentials.
                    </span>
                  </div>
                </motion.div>
              )}

              {activeTab === 'audits' && (
                <motion.div
                  key="audits"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 flex-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                        Immutable Audit Trail Logs
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">Detailed transparency tracking of administrative mappings and client access.</p>
                    </div>
                  </div>

                  {/* Mock audit logs */}
                  <div className="font-mono text-[10px] bg-[#050607]/90 rounded-2xl border border-white/5 p-4.5 h-64 overflow-y-auto space-y-2.5 scrollbar-thin">
                    <p className="text-slate-500">{"[2026-07-09 22:41:04] CONNECTED: Mirroring session initiated on server MT5-Primary-01"}</p>
                    <p className="text-emerald-400">{"[2026-07-09 22:41:05] SECURED: Handshake validated successfully. 256-Bit SHA SSL tunnel established."}</p>
                    <p className="text-slate-300">{"[2026-07-09 22:41:12] AUDIT: Administrator logged in from IP 192.110.45.2"}</p>
                    <p className="text-brand-violet">{"[2026-07-09 22:42:01] SYNCHRONIZED: Successfully compiled consolidated equity index."}</p>
                    <p className="text-slate-300">{"[2026-07-09 22:42:45] ACCESS: Client Account #MT5-88290 requested query (Mirror read-only). Accepted."}</p>
                    <p className="text-slate-500">{"[2026-07-09 22:43:02] STABILITY Check: PING 12ms. Packet loss 0.00%. Status: OPERATIONAL."}</p>
                    <p className="text-emerald-400 animate-pulse">{"[2026-07-09 22:43:16] ACTIVE: Continuous streaming mirror synchronized. All systems secure."}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated Live Connection Footer */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                <span className="text-[10px] font-mono text-slate-400">System Gateway Security Status: <strong className="text-white">HARDENED</strong></span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Last synchronized: <span className="text-slate-300">{lastMirrorTime}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
