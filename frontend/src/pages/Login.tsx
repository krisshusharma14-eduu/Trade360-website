/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  Table, 
  Search, 
  LogOut, 
  UserCheck, 
  Coins, 
  Activity, 
  Landmark, 
  Eye, 
  EyeOff, 
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface LoginProps {
  onAddToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

const DEMO_EMAIL = 'investor@trade360.com';
const DEMO_PASSWORD = 'password123';

export default function Login({ onAddToast }: LoginProps) {
  useEffect(() => {
    fetch('/api/login-visit', { method: 'POST' }).catch(() => {});
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Live fluctuating metric states
  const [liveEquity, setLiveEquity] = useState(46358420.50);
  const [syncTime, setSyncTime] = useState('12s ago');
  const [isSyncing, setIsSyncing] = useState(false);
  const [tradeSearch, setTradeSearch] = useState('');

  // Check if session was already active (for persistent state)
  useEffect(() => {
    const savedSession = sessionStorage.getItem('trade360_investor_session');
    if (savedSession === 'active') {
      setIsLoggedIn(true);
    }
  }, []);

  // Fluctuating real-time MT5 equity simulation
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setLiveEquity((prev) => {
        const change = (Math.random() * 5000 - 1500); // fluctuate in Indian Rupee scale
        return Math.round((prev + change) * 100) / 100;
      });
      setSyncTime('Just now');
      setTimeout(() => {
        setSyncTime(`${Math.floor(Math.random() * 4) + 1}s ago`);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleAutofill = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErrorMsg('');
    onAddToast('Autofilled Credentials', 'Demo login credentials loaded successfully.', 'info');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both your secure email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate compliance authentication delay
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setIsLoggedIn(true);
        sessionStorage.setItem('trade360_investor_session', 'active');
        onAddToast('Portal Access Approved', 'Secure reporting session established.', 'success');
      } else {
        setErrorMsg('Authentication failed: Invalid credentials. Use the provided demo credentials below.');
        onAddToast('Access Denied', 'Please verify your demo username and password.', 'error');
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    sessionStorage.removeItem('trade360_investor_session');
    onAddToast('Session Terminated', 'Safely signed out of the secure portal.', 'info');
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    onAddToast('Sync Requested', 'Requesting latest read-only payload from MT5 replica pools...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      setLiveEquity(46358420.50 + (Math.random() * 15000 - 5000));
      setSyncTime('Just now');
      onAddToast('Sync Complete', 'MT5 ticket registers mapped and verified.', 'success');
    }, 1500);
  };

  const sampleTrades = [
    { ticket: '5093845', symbol: 'NIFTY', type: 'BUY', volume: '150', openPrice: '24120.50', closePrice: '24240.20', profit: 17950.00, time: '2026-07-12 18:24' },
    { ticket: '5093781', symbol: 'RELIANCE', type: 'BUY', volume: '1000', openPrice: '3110.40', closePrice: '3145.80', profit: 35400.00, time: '2026-07-12 15:40' },
    { ticket: '5093512', symbol: 'TCS', type: 'SELL', volume: '500', openPrice: '3950.00', closePrice: '3922.50', profit: 13750.00, time: '2026-07-12 11:15' },
    { ticket: '5093204', symbol: 'USDINR', type: 'BUY', volume: '5000', openPrice: '83.45', closePrice: '83.62', profit: 8500.00, time: '2026-07-11 22:05' },
    { ticket: '5093110', symbol: 'SENSEX', type: 'SELL', volume: '50', openPrice: '79250.00', closePrice: '79510.00', profit: -13000.00, time: '2026-07-11 16:32' },
    { ticket: '5092994', symbol: 'INFY', type: 'BUY', volume: '800', openPrice: '1540.00', closePrice: '1562.00', profit: 17600.00, time: '2026-07-10 14:10' },
    { ticket: '5092873', symbol: 'GOLD_MCX', type: 'BUY', volume: '10', openPrice: '72450.00', closePrice: '72580.00', profit: 1300.00, time: '2026-07-10 09:48' },
  ];

  const filteredTrades = sampleTrades.filter((t) => 
    t.ticket.includes(tradeSearch) || 
    t.symbol.toLowerCase().includes(tradeSearch.toLowerCase()) || 
    t.type.toLowerCase().includes(tradeSearch.toLowerCase())
  );

  const startingBalance = 45000000.00;
  const netProfit = liveEquity - startingBalance;

  return (
    <div className="pt-28 pb-20 min-h-screen px-4 md:px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-teal/3 rounded-full blur-[100px] pointer-events-none animate-drift" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-brand-violet/3 rounded-full blur-[100px] pointer-events-none animate-drift-reverse" />

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login-form-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg bg-brand-navy-light/60 border border-white/5 rounded-[2.5rem] shadow-2xl p-6 md:p-10 space-y-6 text-center relative overflow-hidden backdrop-blur-md"
          >
            {/* Card decoration blurs */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-teal/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-brand-violet/5 rounded-full blur-2xl pointer-events-none" />

            <div className="w-14 h-14 bg-white/5 border border-white/10 text-brand-teal rounded-2xl flex items-center justify-center mx-auto shadow-sm relative z-10">
              <Lock className="w-6 h-6 text-brand-teal text-glow-green-sm" />
            </div>

            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-brand-teal text-[9px] font-bold uppercase tracking-wider font-mono">
                <Sparkles className="w-3 h-3 fill-current text-brand-teal" />
                <span>Interactive Mirroring Demo</span>
              </div>
              <h1 className="text-2xl font-display font-light text-white tracking-tight italic">
                Client Portal <span className="not-italic font-bold text-transparent bg-gradient-to-r from-brand-teal via-brand-teal-light to-brand-violet bg-clip-text animate-gradient-flow text-glow-green-sm">Secure Sign In.</span>
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Authenticate your institutional session to view real-time mirrored MT5 ledger parameters, transaction logs, and margin details.
              </p>
            </div>

            {/* Demo Credentials Box */}
            <div className="bg-[#0c1424] border border-brand-teal/20 rounded-2xl p-4 text-left relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-brand-teal uppercase tracking-wider flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-brand-teal" />
                  Authorized Demo Credentials
                </span>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="text-[10px] font-mono font-bold text-brand-teal hover:text-brand-teal-light bg-brand-teal/10 px-2 py-0.5 rounded border border-brand-teal/20 transition-all cursor-pointer"
                >
                  Autofill Credentials
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                <div className="bg-[#070d18] px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="text-[9px] text-slate-500 block uppercase">Username / Email</span>
                  <span className="text-white select-all">{DEMO_EMAIL}</span>
                </div>
                <div className="bg-[#070d18] px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="text-[9px] text-slate-500 block uppercase">Secure Password</span>
                  <span className="text-white select-all">{DEMO_PASSWORD}</span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl flex items-start gap-2.5 text-left text-xs text-rose-400 relative z-10">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <p className="leading-relaxed font-medium">{errorMsg}</p>
              </div>
            )}

            {/* Interactive Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left relative z-10">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Secure Username / Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@trade360.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#090f1d]/80 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Secure Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-[#090f1d]/80 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-brand-teal hover:bg-brand-teal-light text-[#08281F] font-bold text-xs uppercase tracking-wider mt-2 transition-spring shadow-lg shadow-brand-teal/15 flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none hover:-translate-y-0.5 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#08281F]" />
                    Verifying SECURE MFA Protocol...
                  </>
                ) : (
                  <>
                    Authenticate Portal Session
                    <ChevronRight className="w-4 h-4 text-[#08281F]" />
                  </>
                )}
              </button>
            </form>

            {/* Footer security badge */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500 font-mono font-medium relative z-10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span>Biometric & MFA Enabled</span>
              </div>
              <div className="text-slate-500 hover:text-brand-teal transition-colors">
                <Link to="/admin" className="underline">Access Corporate Leads Register →</Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="logged-in-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-6xl bg-[#131b2e]/70 border border-white/5 rounded-[2.5rem] shadow-2xl p-6 md:p-8 space-y-6 relative overflow-hidden backdrop-blur-md"
          >
            {/* Dashboard decorative patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/2 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-violet/2 rounded-full blur-[120px] pointer-events-none" />

            {/* Dashboard Inner Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-white/5 gap-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-teal font-display font-bold text-base shadow-inner text-glow-green-sm">
                  MT5
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">Mercer Alpha Fund #1</h3>
                    <span className="px-2 py-0.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-[9px] font-bold text-brand-teal font-mono uppercase tracking-widest text-glow-green-sm">
                      Synced
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Security Replica Mirror • ID: MT5-902845 (Read-Only)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-medium text-slate-300 font-mono">
                  Server Status: <span className="font-semibold text-emerald-400">Trade360-Replica-2</span>
                </div>
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] hover:bg-white/10 hover:border-brand-teal/30 transition-all font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-brand-teal ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Synced {syncTime}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/10 hover:border-rose-500/20 text-rose-400 text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Quick Greeting */}
            <div className="bg-brand-teal/5 border border-brand-teal/15 rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-teal/15 flex items-center justify-center text-brand-teal shrink-0">
                  <CheckCircle className="w-5 h-5 text-glow-green-sm" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider block">Institutional Portal Mode</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-normal">
                    Welcome back. This panel maps read-only performance statistics reflecting live mirrored broker server registries.
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                Last Log In: <span className="text-white">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Portfolio Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {[
                { 
                  label: 'Initial Capital', 
                  val: `₹${startingBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
                  sub: 'Starting Deposit',
                  icon: Landmark,
                  color: 'text-white'
                },
                { 
                  label: 'Current Net Equity', 
                  val: `₹${liveEquity.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
                  sub: 'Floating Ledger Total',
                  icon: Coins,
                  color: 'text-brand-teal text-glow-green-sm',
                  pulse: true
                },
                { 
                  label: 'Free Margin Cap', 
                  val: '1,245.82%', 
                  sub: 'Risk Safety Cushion',
                  icon: Activity,
                  color: 'text-white'
                },
                { 
                  label: 'Net Profit performance', 
                  val: `${netProfit >= 0 ? '+' : ''}₹${netProfit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
                  sub: 'Total Profit / Loss',
                  icon: TrendingUp,
                  color: netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                },
              ].map((metric, idx) => {
                const IconComp = metric.icon;
                return (
                  <div key={idx} className="bg-[#0b1222]/80 border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-white/10 transition-colors">
                    {/* Tiny visual pulse for active equity ticker */}
                    {metric.pulse && (
                      <span className="absolute top-4 right-4 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <IconComp className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{metric.label}</span>
                    </div>
                    <div className={`text-2xl font-display font-bold mt-2.5 tracking-tight ${metric.color}`}>
                      {metric.val}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium mt-1 block">{metric.sub}</span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Interactive Closed Trades Registry */}
            <div className="bg-[#0b1222]/80 border border-white/5 rounded-2xl p-5 md:p-6 space-y-4 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Table className="w-4.5 h-4.5 text-brand-teal" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">Closed Transaction Registers</h4>
                    <span className="text-[10px] font-mono text-slate-400">Mirroring standard MT5 ticket allocation blocks</span>
                  </div>
                </div>

                {/* Filter / Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Symbol or Ticket..."
                    value={tradeSearch}
                    onChange={(e) => setTradeSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#121b2d]/90 border border-white/5 text-xs text-white placeholder-slate-500 rounded-xl focus:outline-none focus:border-brand-teal transition-all"
                  />
                </div>
              </div>

              {/* Responsive Table Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400 font-mono text-[9px] uppercase tracking-widest">
                      <th className="pb-3">Ticket</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Contract Asset</th>
                      <th className="pb-3">Direction</th>
                      <th className="pb-3">Volume (Lots)</th>
                      <th className="pb-3">Execution Price</th>
                      <th className="pb-3">Terminal Close</th>
                      <th className="pb-3 text-right">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px] text-slate-300">
                    {filteredTrades.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500 font-sans text-xs">
                          No ticket records matched your current query filter.
                        </td>
                      </tr>
                    ) : (
                      filteredTrades.map((t, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 text-slate-400">#{t.ticket}</td>
                          <td className="py-3 text-slate-500 text-[10px]">{t.time}</td>
                          <td className="py-3 font-bold text-white">{t.symbol}</td>
                          <td className="py-3">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider ${
                              t.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>{t.type}</span>
                          </td>
                          <td className="py-3">{t.volume}</td>
                          <td className="py-3">{t.openPrice}</td>
                          <td className="py-3">{t.closePrice}</td>
                          <td className={`py-3 text-right font-semibold ${
                            t.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}>
                            {t.profit >= 0 ? '+' : ''}₹{t.profit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick help notice and navigation */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 relative z-10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Encrypted secure channel • TLS 1.3 Active</span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/mt5-account-visibility" className="hover:text-brand-teal transition-colors underline">
                  Account Visibility Settings
                </Link>
                <a href="mailto:trade360@zohomail.in" className="hover:text-brand-teal transition-colors underline">
                  Contact Institutional Desk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
