import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Twitter, Linkedin, Github, Facebook, Send, 
  Shield, CheckCircle2, Server 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer id="main-footer" className="bg-brand-navy-deep text-slate-400 pt-20 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid: 4 columns as requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand blurb + social icons + Newsletter signup */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2 group focus:outline-none w-fit">
              <div className="w-8 h-8 bg-gradient-to-tr from-brand-teal to-brand-violet rounded-lg flex items-center justify-center shadow-lg shadow-brand-teal/15">
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-display font-bold text-white tracking-tight leading-none group-hover:text-brand-teal transition-colors duration-300">
                  Trade<span className="text-brand-teal">360</span>
                </span>
                <span className="text-[8px] font-mono tracking-widest text-brand-teal uppercase leading-none mt-0.5">
                  Visibility Portal
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An advanced, 100% read-only administrative overlay, portfolio reporting system, and lead-generation portal designed specifically for asset management firms and professional trading desks.
            </p>

            {/* Newsletter signup inside the brand column */}
            <div className="space-y-2 mt-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white">
                Subscribe to Operations Feed
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your corporate email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/10 font-mono transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 bg-brand-teal text-white-forced rounded-xl hover:bg-brand-teal-light transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05] active:scale-[0.98] shrink-0 flex items-center justify-center cursor-pointer"
                  aria-label="Submit subscribe"
                >
                  <Send className="w-3.5 h-3.5 text-white-forced" />
                </button>
              </form>
              {submitted && (
                <p className="text-[10px] text-brand-teal font-bold animate-pulse">
                  ✓ Successfully subscribed
                </p>
              )}
            </div>
 
            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mt-2">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com' },
                { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com' },
                { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com' },
                { icon: <Github className="w-4 h-4" />, href: 'https://github.com' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 text-slate-400 hover:text-brand-teal hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-[color,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-black/5 dark:border-white/5"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Features links */}
          <div>
            <h4 className="text-white font-display font-bold text-xs tracking-widest uppercase mb-5">
              Features
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Read-Only Account Mirroring
                </Link>
              </li>
              <li>
                <Link to="/mt5-account-visibility" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  MetaTrader 5 Native Bridges
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Multi-Tenant Environments
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  White-Label Portal Deployment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company links */}
          <div>
            <h4 className="text-white font-display font-bold text-xs tracking-widest uppercase mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  About Our Profile
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Enterprise Tier Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Contact Corporate Sales
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Operational Insights Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal links */}
          <div>
            <h4 className="text-white font-display font-bold text-xs tracking-widest uppercase mb-5">
              Legal & Compliance
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs">
              <li>
                <Link to="/security" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Security Protocols
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Privacy & Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Terms & Platform Conditions
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full" />
                  Regulatory Risk Disclosures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclosures Block (Crucial for fintech integrity) */}
        <div className="border-t border-white/5 pt-8 pb-4 text-[10px] text-slate-500 leading-relaxed space-y-4">
          <p>
            <strong className="text-slate-400">Risk Disclaimer:</strong> Trading financial instruments, including foreign exchange (Forex) and contracts for difference (CFDs) on margin, carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your objectives, financial situation, needs, and level of experience. You should be aware of all the risks associated with trading on margin.
          </p>
          <p>
            <strong className="text-slate-400">Regulatory & Platform Notice:</strong> Trade 360 is an independent administrative software supplier. Trade 360 provides read-only account visibility interfaces, data mapping layers, and automated client communication templates. Trade 360 does not provide investment advice, brokerage services, portfolio management, or financial advisory recommendations. The account visibility interfaces are for illustrative, administrative presentation, and lead-generation purposes. All simulated, backtested, or sample metrics do not guarantee future returns.
          </p>
        </div>

        {/* Thin copyright line at the very bottom */}
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 font-mono">
          <p>© {currentYear} Trade 360. All administrative and design rights reserved.</p>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-brand-teal" />
            <span>256-Bit SSL Secured Network</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
