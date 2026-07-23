/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck, Sun, Moon, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      setIsLoggedIn(sessionStorage.getItem('trade360_investor_session') === 'active');
    };
    checkSession();

    window.addEventListener('storage', checkSession);
    window.addEventListener('session-update', checkSession);

    return () => {
      window.removeEventListener('storage', checkSession);
      window.removeEventListener('session-update', checkSession);
    };
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem('trade360_investor_session');
    window.location.href = '/';
  };

  const publicNavLinks = [
    { name: 'Services', path: '/services' },
    { name: 'MT5 Visibility', path: '/mt5-account-visibility' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Security', path: '/security' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const loggedInNavLinks = [
    { name: 'Dashboard', path: '/login' },
    { name: 'Reports', path: '/login#reports' },
    { name: 'Statements', path: '/login#statements' },
    { name: 'Support', path: '/contact' },
    { name: 'Account Settings', path: '/mt5-account-visibility' },
  ];

  const navLinks = isLoggedIn ? loggedInNavLinks : publicNavLinks;

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      return location.pathname === basePath && location.hash === `#${hash}`;
    }
    return location.pathname === path && (!location.hash || path === '/login');
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'bg-brand-navy/90 backdrop-blur-md shadow-xl shadow-black/10 dark:shadow-black/30 border-b border-white/5 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <img
              id="trade360-navbar-logo"
              src="/trade360-logo.svg"
              alt="Trade360"
              className="h-12 w-12 object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-base font-display font-bold text-white tracking-tight leading-none transition-colors duration-300 group-hover:text-brand-teal-light">
                Trade<span className="text-brand-teal transition-colors duration-300 group-hover:text-brand-violet-light">360</span>
              </span>
              <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase leading-none mt-1">
                Visibility Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none whitespace-nowrap ${
                    active
                      ? 'text-brand-teal dark:text-brand-teal-light'
                      : 'text-slate-400 hover:!text-[var(--color-text-primary)] dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavLinkBg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-teal/10 to-brand-violet/5 dark:from-brand-teal/15 dark:to-brand-violet/10 border border-brand-teal/20 z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-brand-teal/20 bg-brand-teal/5 text-brand-teal flex items-center justify-center cursor-pointer focus:outline-none hover:bg-brand-teal/10 hover:scale-105 transition-all duration-300 mr-1"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-teal-light border border-brand-teal/30 rounded-full bg-brand-teal/5 hover:bg-brand-teal/10 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5 text-brand-teal" />
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-400 border border-rose-500/20 rounded-full bg-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/40 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-teal-light border border-brand-teal/30 rounded-full bg-brand-teal/5 hover:bg-brand-teal/10 hover:text-brand-teal-dark dark:hover:text-white transition-[color,background-color,border-color] duration-300 cursor-pointer whitespace-nowrap"
                >
                  Client Login
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-brand-teal text-white-forced hover:bg-brand-teal-light text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-teal/25 hover:-translate-y-0.5 transition-spring cursor-pointer whitespace-nowrap"
                >
                  Request Demo
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu & Theme Toggles */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-brand-teal/20 bg-brand-teal/5 text-brand-teal flex items-center justify-center cursor-pointer focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-300 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-brand-navy border-t border-white/5 flex flex-col p-6 lg:hidden"
          >
            <div className="flex-1 flex flex-col gap-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-brand-teal bg-black/5 dark:bg-white/5'
                      : 'text-slate-400 hover:!text-[var(--color-text-primary)] dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/5 my-4 pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-brand-teal/30 text-xs font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/5 transition-colors duration-300"
                    >
                      <User className="w-4 h-4 text-brand-teal" />
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-rose-500/20 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors duration-300 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center py-3 rounded-xl border border-brand-teal/30 text-xs font-semibold uppercase tracking-wider text-brand-teal-light bg-brand-teal/5 hover:bg-black/5 dark:hover:bg-white/5 hover:text-brand-teal-dark dark:hover:text-white transition-colors duration-300"
                    >
                      Client Login
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-teal text-white-forced text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-teal/20 hover:bg-brand-teal-light transition-[background-color,transform] duration-300 cursor-pointer"
                    >
                      Request Demo
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Micro compliance note in mobile menu */}
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-slate-500 text-xs text-center justify-center">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand-teal" />
              <span>SSL Encrypted read-only access</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
