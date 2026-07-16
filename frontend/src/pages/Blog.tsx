/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, Search, X, BookOpen, Loader2, RefreshCw } from 'lucide-react';
import { BlogPost } from '../types';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Server returned error status');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err: any) {
        setError('Could not retrieve dynamic posts, falling back to cached stories.');
        setBlogs(getFallbackBlogs());
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getFallbackBlogs = (): BlogPost[] => {
    return [
      {
        id: 'blog-1',
        title: 'Building Client Trust Through Real-Time Account Transparency',
        slug: 'building-client-trust-transparency',
        summary: 'Discover how modern asset managers leverage secure, read-only account visibility to build deeper client relationships and stand out from traditional brokers.',
        content: 'In the fast-paced world of financial asset management, transparency is no longer a luxury—it is a critical differentiator. Investors are increasingly demanding real-time visibility into their portfolios, shifting away from stale monthly PDF statements.\n\n### The Shift to Interactive Reporting\nHistorically, client reporting involved compiling trade registers at the end of the month, formatting them into static documents, and distributing them via email. This approach introduces significant lag and leaves clients feeling disconnected from their investments.\n\nWith interactive administrative portals like Trade 360, firms can provide clients with beautiful, clear visual interfaces showing balanced metrics, margin health, and equity changes. By limiting these integrations to read-only API feeds (such as MetaTrader 5 reporting endpoints), firms ensure complete asset security while delivering the intuitive experience modern investors expect.\n\n### Lead Generation Through Openness\nLeading with a philosophy of transparency is also a highly effective lead-generation tool. Prospective clients are far more likely to commit capital when a firm can demonstrate clear, auditable compliance standards and show exactly how information is presented in their secure reporting environment.',
        category: 'Asset Management',
        author: 'David Vance, Director of Operations',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
        readTime: '4 min read',
        publishedAt: '2026-06-15',
        seoKeywords: ['client transparency', 'asset management', 'investor portal']
      },
      {
        id: 'blog-2',
        title: 'MetaTrader 5 Client Portals: Balancing Security and Visibility',
        slug: 'metatrader-5-client-portals-security',
        summary: 'A technical exploration of how asset managers integrate MT5 reporting feeds to present account metrics safely without exposing critical execution systems.',
        content: 'Integrating trading platforms like MetaTrader 5 (MT5) with outward-facing client systems requires a rigorous security architecture. The priority is clear: clients should see their data, but the underlying execution layer must remain completely insulated from external web networks.\n\n### The Danger of Write-Access Integrations\nAny system that allows web-based order entry, balance modifications, or withdrawal triggers introduces a massive attack surface. Hackers targeting financial portals focus heavily on compromising active sessions to execute unauthorized trades or manipulate risk profiles.\n\n### The Read-Only Reporting Architectural Layer\nTo completely negate this risk, Trade 360 adopts a strict read-only design pattern:\n\n1. **Data Ingestion via Reporting APIs**: We query historical trading records and static metrics from secondary replica databases or read-only manager APIs.\n2. **Network Isolation**: There is no direct connection between the web-facing client portal and the primary live execution server.\n3. **De-coupled Auth**: Client credentials for the visibility portal are completely separate from the MT5 account credentials.\n\nBy establishing this strict boundary, asset managers can offer beautiful dashboards featuring balance, margin, equity, and win rates, with the absolute assurance that client capital remains completely untouched by external factors.',
        category: 'Security & Tech',
        author: 'Marcus Thorne, Chief Information Security Officer',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        readTime: '6 min read',
        publishedAt: '2026-06-28',
        seoKeywords: ['MT5 integration', 'MetaTrader 5', 'trading portal security']
      },
      {
        id: 'blog-3',
        title: 'Simplifying Investor Communications: How to Reduce Operational Churn',
        slug: 'simplifying-investor-communications-operational-churn',
        summary: 'How professional asset managers and brokers save hundreds of hours of manual client relations support by utilizing structured, on-demand reporting portals.',
        content: 'Financial operations teams often spend up to 30% of their active working hours fielding basic client inquiries: "What is my current floating margin?", "Can I see my closed trades from last Tuesday?", or "Is my equity curve up this month?"\n\n### The High Cost of Manual Inquiries\nFielding these requests via email, WhatsApp, or phone calls is highly inefficient. It distracts senior portfolio managers, introduces human error in manual report generation, and leads to communication bottlenecks during high-volatility market sessions.\n\n### On-Demand Self-Service\nProviding clients with a secure, minimalistic, self-service dashboard resolves these inefficiencies:\n\n* **Reduced Ticket Volumes**: Clients check metrics in seconds from any responsive mobile browser.\n* **Standardized Presentation**: Information is framed elegantly with high-contrast UI, preventing misunderstandings from cluttered spreadsheets.\n* **Continuous Engagement**: Interactive summaries keep investors informed without requiring proactive manual outreach from your client relationships team.\n\nEmbracing specialized account visibility platforms is the simplest route to professionalizing your brand, reducing overhead, and scaling your client capacity.',
        category: 'Client Relations',
        author: 'Sarah Jenkins, Head of Investor Relations',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        readTime: '3 min read',
        publishedAt: '2026-07-04',
        seoKeywords: ['investor relations', 'broker portal', 'automated financial reporting']
      }
    ];
  };

  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 space-y-16">
      
      {/* Header section */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Operational Insights</span>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight leading-tight italic">
          Trade 360 Corporate <span className="not-italic font-bold">Intelligence.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-base font-sans">
          In-depth features on investor communications, data security, MetaTrader integration architecture, and financial technology compliance.
        </p>
      </section>

      {/* Search Bar */}
      <section className="relative max-w-md">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          id="blog-search-input"
          type="text"
          placeholder="Search articles & guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm rounded-full focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all shadow-sm"
        />
      </section>

      {/* Blog Cards Grid */}
      <section className="min-h-60">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
            <span className="text-slate-400 text-xs font-mono">Querying blog repository...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-[#131b2e]/30 rounded-3xl border border-white/5">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-semibold">No articles matched your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-[#131b2e]/60 border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:border-brand-teal/20 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="h-48 overflow-hidden bg-slate-900 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-[#0A111F]/80 backdrop-blur-md text-brand-teal font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/5 shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-display font-bold text-white leading-snug group-hover:text-brand-teal transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate max-w-[120px]">{post.author.split(',')[0]}</span>
                  </div>
                  <span className="text-xs font-bold text-brand-teal group-hover:text-white transition-colors flex items-center gap-0.5">
                    Read article
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Reader Modal Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0d1525] rounded-[2.5rem] w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-white/10 shadow-2xl relative"
            >
              {/* Header Close triggers */}
              <div className="sticky top-0 bg-[#0d1525]/90 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between px-6 z-10">
                <span className="text-[10px] font-mono text-brand-teal uppercase tracking-widest">
                  Reading Mode
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Modal Contents */}
              <div className="p-6 md:p-10 space-y-8 font-sans">
                
                {/* Meta details */}
                <div className="space-y-4 text-center md:text-left">
                  <span className="inline-block bg-white/5 border border-white/10 text-brand-teal text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                    {selectedPost.title}
                  </h2>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 font-medium border-y border-white/5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="text-white">{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{selectedPost.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="h-64 rounded-2xl overflow-hidden bg-slate-900 border border-white/5">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Rendered Text */}
                <div className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed text-slate-300 space-y-4">
                  {selectedPost.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('###')) {
                      return (
                        <h3 key={pIdx} className="text-base font-display font-bold text-white pt-4 pb-1">
                          {paragraph.replace('###', '').trim()}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('*') || paragraph.startsWith('-')) {
                      return (
                        <ul key={pIdx} className="list-disc list-inside space-y-1 pl-4 text-slate-400">
                          {paragraph.split('\n').map((li, lIdx) => (
                            <li key={lIdx}>{li.replace(/^[*\-]\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (/^\d+\./.test(paragraph)) {
                      return (
                        <ol key={pIdx} className="list-decimal list-inside space-y-1.5 pl-4 text-slate-400">
                          {paragraph.split('\n').map((li, lIdx) => (
                            <li key={lIdx}>{li.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={pIdx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* SEO Keywords */}
                {selectedPost.seoKeywords && (
                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">Keywords:</span>
                    {selectedPost.seoKeywords.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sync/Fallback status indicator */}
      {error && !isLoading && (
        <div className="flex items-center gap-2 justify-center text-[10px] font-mono text-slate-500">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
}
