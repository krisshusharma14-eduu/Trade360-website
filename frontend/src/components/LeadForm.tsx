/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface LeadFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function LeadForm({ onSuccess, onError }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const enquiryOptions = [
    { value: 'broker', label: 'Broker Platform Integration' },
    { value: 'asset_manager', label: 'Asset Manager Portal Setup' },
    { value: 'white_label', label: 'Bespoke White-Label Solution' },
    { value: 'demo_access', label: 'Request Sandbox Demo Access' },
    { value: 'general_sales', label: 'General Corporate Consultation' },
  ];

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Please enter your phone number.';
    } else if (!/^[+]?[0-9\s\-()]{7,20}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number (min 7 digits).';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.enquiryType) {
      tempErrors.enquiryType = 'Please select your enquiry type.';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Please write a brief summary of your requirements.';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Please provide a bit more detail (minimum 10 characters).';
    }

    if (!formData.consent) {
      tempErrors.consent = 'You must consent to our data privacy terms to proceed.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onError('Validation failed. Please correct the highlighted errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_STRAPI_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        onSuccess(data.message || 'Enquiry submitted successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          enquiryType: '',
          message: '',
          consent: false,
        });
      } else {
        throw new Error(data.error || 'Server rejected lead submission');
      }
    } catch (err: any) {
      onError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-brand-navy-light/95 p-8 md:p-12 rounded-3xl border border-brand-success/20 text-center shadow-2xl shadow-brand-teal/5 max-w-lg mx-auto relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-success/5 rounded-full blur-2xl pointer-events-none" />
        <div className="w-16 h-16 bg-brand-success/10 text-brand-success rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-display font-light text-white tracking-tight mb-3 italic">
          Submission <span className="not-italic font-bold text-transparent bg-gradient-to-r from-brand-teal to-brand-violet bg-clip-text animate-gradient-flow">Successful.</span>
        </h3>
        <p className="text-slate-400 leading-relaxed text-sm mb-6">
          Thank you for contacting Trade 360. A copy of your request has been logged in our secure system, and an automated notification has been routed to our corporate accounts team. A representative will contact you within one business day.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 rounded-xl bg-brand-teal text-[#08281F] text-sm font-semibold hover:bg-brand-teal-light transition-spring shadow-lg hover:-translate-y-0.5 cursor-pointer font-bold"
        >
          Submit Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-navy-light/60 p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl max-w-2xl mx-auto space-y-6 relative overflow-hidden">
      {/* Background ambient accents inside form */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-violet/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-teal/4 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Name */}
        <div>
          <label htmlFor="name-input" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="name-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Alexander Mercer"
            className={`w-full px-4 py-3 rounded-xl bg-brand-navy-deep/60 text-white placeholder-slate-600 text-sm transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none ${
              errors.name
                ? 'border border-rose-500/50 focus:ring-2 focus:ring-rose-500/20'
                : 'border border-white/10 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10'
            }`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email-input" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Corporate Email <span className="text-rose-400">*</span>
          </label>
          <input
            id="email-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g. alexander@mercerfunds.com"
            className={`w-full px-4 py-3 rounded-xl bg-brand-navy-deep/60 text-white placeholder-slate-600 text-sm transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none ${
              errors.email
                ? 'border border-rose-500/50 focus:ring-2 focus:ring-rose-500/20'
                : 'border border-white/10 focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/10'
            }`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Phone */}
        <div>
          <label htmlFor="phone-input" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Phone Number <span className="text-rose-400">*</span>
          </label>
          <input
            id="phone-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g. +1 (555) 019-2834"
            className={`w-full px-4 py-3 rounded-xl bg-brand-navy-deep/60 text-white placeholder-slate-600 text-sm transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none ${
              errors.phone
                ? 'border border-rose-500/50 focus:ring-2 focus:ring-rose-500/20'
                : 'border border-white/10 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10'
            }`}
          />
          {errors.phone && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
        </div>

        {/* Enquiry Type */}
        <div>
          <label htmlFor="enquiry-type" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Enquiry Type <span className="text-rose-400">*</span>
          </label>
          <select
            id="enquiry-type"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl bg-brand-navy-deep/80 text-white text-sm transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none ${
              errors.enquiryType
                ? 'border border-rose-500/50 focus:ring-2 focus:ring-rose-500/20'
                : 'border border-white/10 focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/10'
            }`}
          >
            <option value="" className="bg-brand-navy-light">-- Select custom setup --</option>
            {enquiryOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-brand-navy-light">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.enquiryType && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.enquiryType}</p>}
        </div>
      </div>

      {/* Message */}
      <div className="relative z-10">
        <label htmlFor="message-input" className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
          Platform Requirements Summary <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="message-input"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Please describe your brokerage configuration or asset manager portal needs (e.g. MT5 mapping, total client accounts, white-label needs)..."
          className={`w-full px-4 py-3 rounded-xl bg-brand-navy-deep/60 text-white placeholder-slate-600 text-sm transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none resize-none ${
            errors.message
              ? 'border border-rose-500/50 focus:ring-2 focus:ring-rose-500/20'
              : 'border border-white/10 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10'
          }`}
        />
        {errors.message && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.message}</p>}
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3 select-none relative z-10">
        <input
          type="checkbox"
          name="consent"
          id="consent-checkbox"
          checked={formData.consent}
          onChange={handleCheckboxChange}
          className="w-4 h-4 rounded mt-1 border-white/10 text-brand-teal focus:ring-brand-teal/30 focus:ring-2 accent-brand-teal bg-white/5 cursor-pointer"
        />
        <div className="flex-1">
          <label htmlFor="consent-checkbox" className="text-xs text-slate-400 leading-normal cursor-pointer">
            By checking this box, I express consent for Trade 360 to store my submitted details and reach out regarding portal solutions. I acknowledge that Trade 360 acts solely as an administrative interface supplier, not a financial advisor. <span className="text-rose-400">*</span>
          </label>
          {errors.consent && <p className="mt-1 text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.consent}</p>}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        id="lead-submit-button"
        className="w-full py-4 rounded-xl bg-brand-teal hover:bg-brand-teal-light text-[#08281F] font-bold transition-spring shadow-lg shadow-brand-teal/15 flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none hover:-translate-y-0.5 cursor-pointer relative z-10"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Encrypting and routing request...
          </>
        ) : (
          <>
            <Send className="w-4.5 h-4.5" />
            Submit Secure Consultation Request
          </>
        )}
      </button>
    </form>
  );
}
