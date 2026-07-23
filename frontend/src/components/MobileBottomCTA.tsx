/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

export default function MobileBottomCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('trade360_investor_session') === 'active');
  }, [location]);

  const whatsappNumber = '+919825020271';
  const message = encodeURIComponent('Hello Trade 360, I am interested in learning more about your trading account visibility and client communication platform.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  if (isLoggedIn) return null;

  return (
    <div
      id="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 bg-brand-navy-light/95 backdrop-blur-md border-t border-white/5 p-4 flex gap-3 shadow-2xl shadow-black/25 md:hidden"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 text-slate-300 hover:bg-black/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition-[background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-black/5 dark:border-white/5"
      >
        <MessageSquare className="w-4 h-4 text-brand-teal" />
        WhatsApp
      </a>
      <Link
        to="/contact"
        className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-brand-teal text-white-forced hover:bg-brand-teal-light font-bold text-sm transition-spring shadow-lg shadow-brand-teal/15"
      >
        Request Demo
        <ArrowUpRight className="w-4 h-4 text-white-forced" />
      </Link>
    </div>
  );
}
