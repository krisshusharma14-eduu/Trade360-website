/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Download, Lock, KeyRound, Loader2, ArrowUpRight, Search, FileSpreadsheet, CheckSquare } from 'lucide-react';
import { Lead } from '../types';

interface AdminProps {
  onAddToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export default function Admin({ onAddToast }: AdminProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Load passcode from local storage on mount for better DX
  useEffect(() => {
    const savedPass = localStorage.getItem('trade360_admin_passcode');
    if (savedPass) {
      setPasscode(savedPass);
      authenticate(savedPass);
    }
  }, []);

  const authenticate = async (passToTry = passcode) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/leads?passcode=${encodeURIComponent(passToTry)}`);
      const data = await response.json();

      if (response.ok) {
        setLeads(data);
        setIsAuthenticated(true);
        localStorage.setItem('trade360_admin_passcode', passToTry);
        onAddToast('Authenticated Successfully', 'Secure admin session established.', 'success');
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (err: any) {
      onAddToast('Authorization Failed', err.message || 'Incorrect admin passcode.', 'error');
      setIsAuthenticated(false);
      localStorage.removeItem('trade360_admin_passcode');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/leads/${id}/status?passcode=${encodeURIComponent(passcode)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data : l)));
        onAddToast('Status Updated', `Lead pipeline set to ${newStatus}.`, 'success');
      } else {
        throw new Error(data.error || 'Failed to update lead status');
      }
    } catch (err: any) {
      onAddToast('Pipeline Update Failed', err.message, 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    // Standard URL redirect triggers the CSV attachment download
    window.location.href = `/api/leads/export?passcode=${encodeURIComponent(passcode)}`;
    onAddToast('Exporting Leads', 'CSV spreadsheet generation triggered.', 'info');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    setLeads([]);
    localStorage.removeItem('trade360_admin_passcode');
    onAddToast('Session Terminated', 'Logged out of corporate admin desk.', 'info');
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[75vh] px-6">
        <div className="w-full max-w-md bg-[#131b2e]/60 border border-white/5 rounded-[2.5rem] shadow-2xl p-8 md:p-10 space-y-6 text-center">
          <div className="w-14 h-14 bg-white/5 border border-white/10 text-brand-teal rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <KeyRound className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-display font-light text-white tracking-tight italic">
              Corporate <span className="not-italic font-bold">Leads Desk.</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Enter your corporate administrative credentials or passcode to access, update, and export lead registers.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <label htmlFor="passcode-input" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Admin Passcode (Default: <code className="text-brand-teal lowercase font-mono">trade360admin</code>)
              </label>
              <input
                id="passcode-input"
                type="password"
                placeholder="••••••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && authenticate()}
                className="w-full px-4 py-3 rounded-xl bg-[#0A111F]/60 border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all shadow-sm"
              />
            </div>
            
            <button
              onClick={() => authenticate()}
              disabled={isLoading || !passcode}
              className="w-full py-3.5 rounded-xl bg-brand-teal text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/15 flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none hover:-translate-y-0.5 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  Verifying credential...
                </>
              ) : (
                'Access Leads Register'
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono font-semibold">
            <ShieldAlert className="w-4 h-4 text-slate-500" />
            <span>Immutable Security Audits Active</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 space-y-8">
      
      {/* Top action header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block font-mono">Corporate Directory</span>
          <h1 className="text-3xl font-display font-light text-white tracking-tight mt-1 italic">
            Registered Leads <span className="not-italic font-bold">Hub.</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Monitor, filter, and export prospective partner enquiries securely.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal/80 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-brand-teal/15 hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-slate-950" />
            Export Leads as CSV
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors"
          >
            Terminate Session
          </button>
        </div>
      </div>

      {/* Grid: Search and filter controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="admin-search-input"
            type="text"
            placeholder="Search leads by name, email, phone, or message text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#131b2e]/60 border border-white/5 text-white placeholder-slate-500 text-xs rounded-xl focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all shadow-sm"
          />
        </div>

        <div className="md:col-span-4">
          <select
            id="admin-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 bg-[#131b2e]/60 border border-white/5 text-white text-xs rounded-xl focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all shadow-sm"
          >
            <option value="all" className="bg-[#131b2e]">-- Filter Pipeline Status: All --</option>
            <option value="new" className="bg-[#131b2e]">New Enquiries</option>
            <option value="contacted" className="bg-[#131b2e]">Contacted Partners</option>
            <option value="resolved" className="bg-[#131b2e]">Resolved Enquiries</option>
          </select>
        </div>
      </div>

      {/* Table container */}
      <div className="bg-[#131b2e]/60 border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-20">
            <FileSpreadsheet className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-xs font-semibold">No leads match your current search or filter filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A111F]/60 border-b border-white/5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  <th className="p-5 pl-6">Client Details</th>
                  <th className="p-5">Enquiry Type</th>
                  <th className="p-5">Submitted Message Summary</th>
                  <th className="p-5">Consent</th>
                  <th className="p-5 text-center">Pipeline Status</th>
                  <th className="p-5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    {/* Client details */}
                    <td className="p-5 pl-6 space-y-1">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="font-mono text-slate-400 text-[11px]">{lead.email}</div>
                      <div className="font-mono text-slate-400 text-[11px]">{lead.phone}</div>
                      <div className="text-[9px] text-slate-500 font-mono font-medium">Submitted: {new Date(lead.createdAt).toLocaleString()}</div>
                    </td>

                    {/* Enquiry Type */}
                    <td className="p-5 font-bold font-mono text-slate-400 uppercase tracking-wider text-[10px]">
                      {lead.enquiryType.replace('_', ' ')}
                    </td>

                    {/* Message summary */}
                    <td className="p-5 max-w-sm">
                      <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-400">
                        "{lead.message}"
                      </p>
                    </td>

                    {/* Consent status */}
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                        <CheckSquare className="w-3 h-3 fill-emerald-500/10" />
                        Approved
                      </span>
                    </td>

                    {/* Pipeline Status badge */}
                    <td className="p-5 text-center">
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border font-mono ${
                        lead.status === 'new'
                          ? 'bg-amber-500/5 text-amber-400 border-amber-500/20'
                          : lead.status === 'contacted'
                          ? 'bg-sky-500/5 text-sky-400 border-sky-500/20'
                          : 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-5 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.status !== 'contacted' && (
                          <button
                            onClick={() => handleUpdateStatus(lead.id, 'contacted')}
                            disabled={updatingId === lead.id}
                            className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white font-mono text-[10px] transition-colors"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {lead.status !== 'resolved' && (
                          <button
                            onClick={() => handleUpdateStatus(lead.id, 'resolved')}
                            disabled={updatingId === lead.id}
                            className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white font-mono text-[10px] transition-colors"
                          >
                            Mark Resolved
                          </button>
                        )}
                        {lead.status !== 'new' && (
                          <button
                            onClick={() => handleUpdateStatus(lead.id, 'new')}
                            disabled={updatingId === lead.id}
                            className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white font-mono text-[10px] transition-colors"
                          >
                            Mark New
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
