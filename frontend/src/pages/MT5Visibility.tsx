/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Landmark, TrendingUp, ShieldAlert, Table, RefreshCw, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MT5Visibility() {
  // Mock trade data to display illustrative logs
  const sampleTrades = [
    { ticket: '2093845', symbol: 'XAUUSD', type: 'BUY', volume: '1.00', openPrice: '2314.50', closePrice: '2328.20', profit: '+$1,370.00', status: 'Closed' },
    { ticket: '2093781', symbol: 'EURUSD', type: 'SELL', volume: '2.50', openPrice: '1.08250', closePrice: '1.07920', profit: '+$825.00', status: 'Closed' },
    { ticket: '2093512', symbol: 'GBPUSD', type: 'BUY', volume: '1.50', openPrice: '1.26410', closePrice: '1.26120', profit: '-$435.00', status: 'Closed' },
    { ticket: '2093204', symbol: 'USDJPY', type: 'SELL', volume: '3.00', openPrice: '156.40', closePrice: '155.80', profit: '+$1,140.00', status: 'Closed' },
    { ticket: '2093110', symbol: 'USDCAD', type: 'BUY', volume: '2.00', openPrice: '1.3650', closePrice: '1.3695', profit: '+$900.00', status: 'Closed' },
  ];

  return (
    <div className="pt-32 pb-20 space-y-24 max-w-7xl mx-auto px-6">
      
      {/* 1. Header & Scoping */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Portal Blueprint</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          MT5 Account <span className="not-italic font-bold">Visibility Model.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-base">
          This interactive model outlines how trading parameters are mapped from read-only reporting server layers into clean client dashboards. Below is an active mock presentation of the future secure client portal environment.
        </p>
      </section>

      {/* 2. WARNING Compliance Badge */}
      <section className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-amber-500/80">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">Compliance Notice & Status</span>
          <p className="text-xs text-slate-400 leading-normal mt-0.5">
            <strong>Illustrative Concept:</strong> This portal simulation is populated with mock static data for demonstration purposes. This is not connected to a live MT5 terminal, does not trade active client capital, and does not showcase actual real balance sheets.
          </p>
        </div>
      </section>

      {/* 3. The Portal mockup container */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-light text-white tracking-tight italic">
              Interactive <span className="not-italic font-bold">Dashboard Concept</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Reflecting standard reporting structures expected in modern asset management.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>SECURE READ-ONLY SIMULATION</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="bg-[#131b2e]/60 border border-white/5 rounded-3xl shadow-2xl p-6 md:p-8 space-y-8">
          
          {/* Internal Navbar of Dashboard mockup */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/5 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <span className="font-display font-bold text-xs">M5</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Mercer Alpha Fund #1</h3>
                <span className="text-[10px] font-mono text-slate-400">Account ID: MT5-902845 (Read-Only)</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 font-medium text-slate-300">
                Server: <span className="font-semibold text-white">Trade360-Replica-2</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 font-medium text-slate-300 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-brand-teal animate-spin" />
                <span>Synced 12s ago</span>
              </div>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'Starting Balance', val: '$400,000.00', sub: 'Baseline Initial Deposit' },
              { label: 'Current Equity', val: '$412,850.20', sub: 'Floating Balance + P/L', highlight: true },
              { label: 'Free Margin Ratio', val: '1,245.82%', sub: 'Risk Capacity Level' },
              { label: 'Net Profit / Loss', val: '+$12,850.20', sub: 'Total Closed Performance', positive: true },
            ].map((metric, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-5 text-left">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">{metric.label}</span>
                <div className={`text-2xl font-display font-bold mt-2 ${
                  metric.highlight ? 'text-brand-teal' : metric.positive ? 'text-emerald-400' : 'text-white'
                }`}>
                  {metric.val}
                </div>
                <span className="text-[10px] text-slate-500 font-medium mt-1 block">{metric.sub}</span>
              </div>
            ))}
          </div>

          {/* Sub layout: Performance Overview & Closed Trade Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            
            {/* Visual Graph container (Left) */}
            <div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">Metrics Breakdown</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-3.5 pt-2">
                {[
                  { name: 'Cumulative Win Rate', score: '68.40%', color: 'bg-emerald-500' },
                  { name: 'Average Profit Factor', score: '2.45', color: 'bg-brand-teal' },
                  { name: 'Max Peak Drawdown', score: '3.12%', color: 'bg-rose-500' },
                  { name: 'Risk / Reward Ratio', score: '1:2.5', color: 'bg-slate-400' },
                ].map((stat, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-medium text-slate-300">
                      <span>{stat.name}</span>
                      <span className="font-bold">{stat.score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} rounded-full`} style={{ width: sIdx === 0 ? '68%' : sIdx === 1 ? '55%' : sIdx === 2 ? '15%' : '45%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closed Trades table (Right) */}
            <div className="lg:col-span-8 bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">Closed Trade Logs</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Latest 5 Records</span>
              </div>

              {/* Responsive Table Wrap */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400 font-semibold uppercase text-[9px] tracking-wider">
                      <th className="pb-2">Ticket</th>
                      <th className="pb-2">Symbol</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Volume</th>
                      <th className="pb-2">Open</th>
                      <th className="pb-2">Close</th>
                      <th className="pb-2 text-right">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px] text-slate-300">
                    {sampleTrades.map((t, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5">{t.ticket}</td>
                        <td className="py-2.5 font-bold text-white">{t.symbol}</td>
                        <td className="py-2.5">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                            t.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>{t.type}</span>
                        </td>
                        <td className="py-2.5">{t.volume}</td>
                        <td className="py-2.5">{t.openPrice}</td>
                        <td className="py-2.5">{t.closePrice}</td>
                        <td className={`py-2.5 text-right font-semibold ${
                          t.profit.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                        }`}>{t.profit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Portal Mapping Architecture Detail */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Infrastructure Map</span>
          <h2 className="text-3xl font-display font-light text-white tracking-tight leading-tight italic">
            Secure Account <span className="not-italic font-bold">Data Mapping.</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Connecting your brokerage accounts to the Trade 360 portal is structured to respect compliance. We never access, store, or communicate active password arrays.
          </p>
          <div className="space-y-4">
            {[
              { t: 'API Reporting Setup', d: 'We configure read-only API connectors that digest historical trade feeds and balance registers.' },
              { t: 'Secondary Replication Databases', d: 'Incoming data is mirrored inside isolated replication pools completely disconnected from live MT5 order routes.' },
              { t: 'Encrypted Multi-Tenant Directory Routing', d: 'Private dashboard login files map specifically to verified account IDs, enforcing cross-tenant protection.' }
            ].map((arc, aIdx) => (
              <div key={aIdx} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 text-brand-teal flex items-center justify-center shrink-0 border border-white/10">
                  <span className="font-mono text-xs font-bold">{aIdx + 1}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{arc.t}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{arc.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#131b2e] to-[#0A111F] border border-white/5 p-8 md:p-10 rounded-3xl space-y-6">
          <h3 className="text-lg font-display font-bold text-white tracking-tight">Need to map a customized MT5 ledger?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our technical support staff work closely with compliance officers and platform technicians to tailor custom read-only connectors, ensuring complete adherence to your brokerages policies.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-brand-teal hover:bg-brand-teal/90 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-teal/20 transition-all"
            >
              Consult Our Developers
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Disclaimer strip */}
      <section>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-amber-500/80 text-[11px] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>
            <strong>Regulatory & Demonstration Notice:</strong> This page presents an administrative model concept for the Trade 360 portfolio wrapper. All balances, closed trade records, profit margins, and performance ratios are static mock parameters populated solely to demonstrate the dashboard layout. Trade 360 is not a registered investment advisor, does not trade active assets, and does not promise returns.
          </p>
        </div>
      </section>

    </div>
  );
}
