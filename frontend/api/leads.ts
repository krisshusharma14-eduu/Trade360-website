/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel Serverless Function — handles POST /api/leads
 *
 * The static Vercel deployment has no running backend (server.ts / Strapi are
 * not deployed there), so this file becomes the real /api/leads endpoint in
 * production. It validates the submission and emails it straight to your
 * inbox via Zoho SMTP.
 *
 * Required Vercel environment variables (set in Project Settings > Environment Variables):
 *   ZOHO_SMTP_USER  -> trade360@zohomail.in
 *   ZOHO_SMTP_PASS  -> a Zoho "app-specific password" (not your normal login password)
 */

import nodemailer from 'nodemailer';

interface VercelRequest {
  method?: string;
  body: any;
}
interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, phone, email, enquiryType, message, consent } = req.body || {};

    if (!name || !phone || !email || !enquiryType || !message) {
      res.status(400).json({
        error: 'All fields (name, phone, email, enquiryType, message) are required.',
      });
      return;
    }

    if (consent !== true && consent !== 'true') {
      res.status(400).json({
        error: 'You must consent to our data privacy terms to submit an enquiry.',
      });
      return;
    }

    const smtpUser = process.env.ZOHO_SMTP_USER;
    const smtpPass = process.env.ZOHO_SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error('Missing ZOHO_SMTP_USER / ZOHO_SMTP_PASS environment variables.');
      res.status(500).json({
        error: 'Email delivery is not configured yet. Please contact the site owner.',
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in', // use smtp.zoho.com if your account region is global
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: smtpUser,
      replyTo: email,
      subject: `New Trade 360 Enquiry — ${name} (${enquiryType})`,
      text: `
New lead received from the Trade 360 website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Enquiry Type: ${enquiryType}
Message:
${message}
      `.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Your lead has been successfully registered. Our team will connect with you shortly.',
    });
  } catch (err: any) {
    console.error('Failed to process lead submission:', err);
    res.status(500).json({
      error: 'Failed to send your enquiry. Please try WhatsApp or email us directly.',
      details: err?.message,
    });
  }
}
