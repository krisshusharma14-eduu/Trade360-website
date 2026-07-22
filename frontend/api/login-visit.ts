/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel Serverless Function — handles POST /api/login-visit
 *
 * Called once whenever someone opens the /login (Client Login) page.
 * Sends a quick email notification so you know someone is checking it out.
 *
 * Uses the SAME Zoho environment variables as the leads function:
 *   ZOHO_SMTP_USER  -> trade360@zohomail.in
 *   ZOHO_SMTP_PASS  -> your Zoho app-specific password
 */

import nodemailer from 'nodemailer';

interface VercelRequest {
  method?: string;
  headers: { [key: string]: string | string[] | undefined };
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
    const smtpUser = process.env.ZOHO_SMTP_USER;
    const smtpPass = process.env.ZOHO_SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error('Missing ZOHO_SMTP_USER / ZOHO_SMTP_PASS environment variables.');
      res.status(500).json({ error: 'Email delivery is not configured yet.' });
      return;
    }

    const ip = req.headers['x-forwarded-for'] || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown device';
    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in', // use smtp.zoho.com if your account region is global
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: smtpUser,
      subject: 'Someone opened the Trade 360 Client Login page',
      text: `
A visitor opened the Client Login page on your website.

Time: ${time} (IST)
IP: ${ip}
Device/Browser: ${userAgent}
      `.trim(),
    });

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Failed to send login-visit notification:', err);
    // Never block the visitor's page just because the email failed
    res.status(200).json({ success: false });
  }
}
