/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileBottomCTA from './components/MobileBottomCTA';
import Toast, { ToastMessage } from './components/Toast';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import MT5Visibility from './pages/MT5Visibility';
import HowItWorks from './pages/HowItWorks';
import Security from './pages/Security';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';

import { ThemeProvider } from './context/ThemeContext';

// ScrollToTop helper component to reset scroll on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [pathname]);

  return null;
}

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast helper
  const addToast = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  };

  // Dismiss toast helper
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        
        <div className="flex flex-col min-h-screen bg-brand-navy text-slate-300">
          {/* Navigation */}
          <Navbar />

          {/* Global Toast Alerts Container */}
          <Toast toasts={toasts} onDismiss={dismissToast} />

          {/* Floating Action Buttons */}
          <WhatsAppButton />

          {/* Main Routed Area */}
          <main className="flex-1 pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/mt5-account-visibility" element={<MT5Visibility />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/security" element={<Security />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact onAddToast={addToast} />} />
              <Route path="/login" element={<Login onAddToast={addToast} />} />
              <Route path="/admin" element={<Admin onAddToast={addToast} />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Mobile Sticky CTA strip */}
          <MobileBottomCTA />

          {/* Corporate Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
