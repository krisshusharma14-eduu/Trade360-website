/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, HelpCircle, Loader2, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const categories = [
    { value: 'all', label: 'All Inquiries' },
    { value: 'general', label: 'General Info' },
    { value: 'visibility', label: 'Account Visibility' },
    { value: 'onboarding', label: 'Onboarding Timeline' },
    { value: 'security', label: 'Security & Safety' },
    { value: 'compliance', label: 'Compliance & Legal' },
  ];

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setIsLoading(true);
        const baseUrl = (import.meta as any).env?.VITE_STRAPI_API_URL || '';
        const url = baseUrl ? `${baseUrl}/api/faqs` : '/api/faqs';
        const response = await fetch(url, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        if (!response.ok) {
          throw new Error('Server returned error status');
        }
        const json = await response.json();
        // NOTE: assumes Strapi returns { data: [...] } with question/answer/category/order
        // fields matching FAQItem. Confirm this against the real response from
        // /api/faqs and adjust the mapping below if her field names differ.
        const rawItems = Array.isArray(json) ? json : json.data;
         const mapped: FAQItem[] = rawItems.map((item: any) => ({
    id: String(item.id ?? item.documentId ?? Math.random()),
    question: item.Question ?? item.question ?? '',
    answer: item.Answer ?? item.answer ?? '',
    category: item.category ?? 'general',
    order: item.order ?? 0,
  }));
        setFaqs(mapped);
      } catch (err: any) {
        setError('Could not dynamically retrieve latest FAQs, falling back to cached list.');
        // High quality fallback list matching the database structure
        setFaqs(getFallbackFAQs());
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const getFallbackFAQs = (): FAQItem[] => {
    return [
      { id: '1', question: 'What is Trade 360?', answer: 'Trade 360 is a dedicated administrative visibility and client communication platform designed for asset managers and brokers. It acts as an elegant, read-only dashboard wrapper that showcases trading performance, simplifies client reporting, and organizes client leads—all in a secure, high-contrast, modern interface.', category: 'general', order: 1 },
      { id: '2', question: 'Is Trade 360 a trading platform or brokerage?', answer: 'No. Trade 360 is strictly an administrative visualization, lead-generation, and reporting utility. We do not process trades, offer brokerage accounts, execute transactions, or hold client funds. We are a software solution designed to showcase performance and bridge communication gaps.', category: 'general', order: 2 },
      { id: '3', question: 'Does Trade 360 have access to my live trading account funds?', answer: 'Absolutely not. Trade 360 operates entirely on a read-only architectural layer. We do not support, store, or require execution credentials, withdrawal triggers, or order-placement authority. Funds remain completely safe and untouched within your regulated brokerage environment.', category: 'security', order: 3 },
      { id: '4', question: 'How does the MT5 account visibility portal work?', answer: 'Once configured for your firm, the client portal connects via secure read-only APIs to retrieve metrics like balance, equity, margin levels, and closed trade registers. Clients log into their private dashboard on Trade 360 to review these metrics in a beautifully laid out, responsive visual format.', category: 'visibility', order: 4 },
      { id: '5', question: 'What specific account metrics can be displayed?', answer: 'Our templates are engineered to display essential risk and performance metrics: starting balance, current equity, floating P/L, margin levels, free margin ratios, cumulative win rate, max drawdown estimates, and structured, searchable trade logs.', category: 'visibility', order: 5 },
      { id: '6', question: 'Is client information securely isolated?', answer: 'Yes. Trade 360 uses a strict multi-tenant database schema backed by Role-Based Access Control (RBAC). Clients can only view accounts explicitly mapped to their profile by an authorized administrator, preventing any cross-tenant data exposure.', category: 'security', order: 6 },
      { id: '7', question: 'What steps are involved in onboarding our firm?', answer: 'Onboarding is divided into five phases: 1) Initial lead submission and scoping, 2) Tailored compliance and custom branding consultation, 3) Secure read-only database or API credential mapping, 4) Portal design verification, and 5) Continuous ongoing software support.', category: 'onboarding', order: 7 },
      { id: '8', question: 'How do you handle data privacy and compliance?', answer: 'We treat compliance with extreme importance. Our portals display clear risk disclosures, require explicit consent before lead submittals, and enforce end-to-end SSL encryption on all incoming traffic. We do not provide financial advice or investment recommendations.', category: 'compliance', order: 8 },
      { id: '9', question: 'Can we white-label the dashboard with our own brand?', answer: 'Yes! Our Enterprise and custom tiers support full white-label capabilities, including loading your custom logo, defining your color palette, mapping your custom domain name, and modifying template text.', category: 'onboarding', order: 9 }
    ];
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Advanced keyword-based matching score
  const getMatchScore = (faq: FAQItem, words: string[]) => {
    let score = 0;
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();
    const catLower = faq.category.toLowerCase();
    
    words.forEach((word) => {
      // Direct substring matches
      if (qLower.includes(word)) {
        score += 15;
        if (qLower.startsWith(word)) score += 5;
        // Word boundary match bonus
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(faq.question)) score += 10;
      }
      if (aLower.includes(word)) {
        score += 5;
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(faq.answer)) score += 5;
      }
      if (catLower.includes(word)) {
        score += 3;
      }
    });
    return score;
  };

  const queryWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const filteredFaqs = faqs
    .filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      if (queryWords.length === 0) return matchesCategory;

      // Match if ANY of the keywords match question, answer, or category
      const matchesSearch = queryWords.some(
        (word) =>
          faq.question.toLowerCase().includes(word) ||
          faq.answer.toLowerCase().includes(word) ||
          faq.category.toLowerCase().includes(word)
      );
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (queryWords.length === 0) return 0;
      return getMatchScore(b, queryWords) - getMatchScore(a, queryWords);
    });

  // Calculate top recommendations across ALL categories for visual query-driven recommendations
  const recommendations = queryWords.length > 0
    ? faqs
        .map((faq) => ({ faq, score: getMatchScore(faq, queryWords) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
    : [];

  const handleSelectRecommendation = (faq: FAQItem) => {
    setSearchQuery(faq.question);
    setActiveCategory('all'); // Clear category filter to guarantee visibility
    setExpandedId(faq.id);
    setIsInputFocused(false);
    
    // Smooth scroll to the specific FAQ item
    setTimeout(() => {
      const element = document.getElementById(`faq-item-${faq.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary glow / high-contrast outline effect
        element.classList.add('ring-2', 'ring-brand-teal', 'ring-offset-2', 'ring-offset-[#0A111F]', 'scale-[1.01]');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-brand-teal', 'ring-offset-2', 'ring-offset-[#0A111F]', 'scale-[1.01]');
        }, 1500);
      }
    }, 150);
  };

  return (
    <div className="pt-32 pb-20 space-y-16 max-w-4xl mx-auto px-6">
      
      {/* Header section */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Client Knowledge Hub</span>
        <h1 className="text-4xl font-display font-light text-white tracking-tight italic">
          Frequently Asked <span className="not-italic font-bold">Questions.</span>
        </h1>
        <p className="text-slate-400 leading-relaxed text-sm">
          Everything you need to know about Trade 360 integration, read-only data safety, administrative mapping, and regulatory compliance.
        </p>
      </section>

      {/* Search and filter controls */}
      <section className="space-y-6">
        {/* Search input */}
        <div className="relative max-w-lg mx-auto z-20">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="faq-search-input"
            type="text"
            placeholder="Search FAQs (e.g. MT5, funds, SSL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all shadow-sm"
          />

          {/* Keyword recommendations overlay dropdown */}
          <AnimatePresence>
            {isInputFocused && recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="faq-search-dropdown absolute top-full left-0 right-0 mt-2 bg-[#0d1525]/95 border border-white/10 rounded-2xl shadow-2xl p-3 backdrop-blur-md space-y-1.5 z-50 overflow-hidden"
              >
                <div className="px-2 py-1 text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider flex items-center gap-1 border-b border-white/5 pb-1.5">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span>Recommended FAQs Matching "{searchQuery}"</span>
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto pt-1">
                  {recommendations.map(({ faq, score }) => (
                    <button
                      key={`rec-${faq.id}`}
                      onMouseDown={(e) => {
                        // Prevent default blur behavior so click handler executes correctly
                        e.preventDefault();
                        handleSelectRecommendation(faq);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-brand-teal/10 transition-all flex items-start gap-3 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-teal transition-colors shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-white text-xs font-semibold group-hover:text-brand-teal transition-colors">
                          {faq.question}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-white/5 px-1.5 py-0.5 rounded">
                            {faq.category}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400">
                            Relevance: {score} pts
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 max-w-4xl mx-auto w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setExpandedId(null);
                }}
                className={`relative px-2 py-2.5 rounded-full text-[10px] sm:text-[11px] md:text-xs font-semibold select-none transition-all duration-300 border text-center flex items-center justify-center min-h-[38px] cursor-pointer ${
                  isActive
                    ? 'border-brand-teal/30 text-white-forced font-bold shadow-lg shadow-brand-teal/20'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200 dark:text-slate-400 dark:border-white/5 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#228B22] to-[#1B6E1B] dark:from-[#228B22] dark:to-[#124A12] z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 leading-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Accordion List */}
      <section className="space-y-4 min-h-60">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
            <span className="text-slate-400 text-xs font-mono">Querying database FAQs...</span>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-[#131b2e]/30 rounded-2xl border border-white/5">
            <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-semibold">No questions matched your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs text-brand-teal font-semibold hover:underline"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`bg-[#131b2e]/60 rounded-2xl border transition-all duration-300 ${
                    isExpanded ? 'border-brand-teal shadow-xl shadow-brand-teal/5' : 'border-white/5 hover:bg-[#131b2e]/80'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-display font-bold text-white text-sm focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-brand-teal' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Sticky error notice fallback */}
      {error && !isLoading && (
        <div className="flex items-center gap-2 justify-center text-[10px] font-mono text-slate-500">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
}
