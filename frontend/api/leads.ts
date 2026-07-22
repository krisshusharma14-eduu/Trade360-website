/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel Serverless Function — handles POST /api/leads
 *
 * Sends the lead submission to your inbox using Resend's HTTP email API
 * (fast and reliable on Vercel, unlike raw SMTP).
 *
 * Required Vercel environment variable:
 *   RESEND_API_KEY -> the API key from resend.com (starts with re_...)
 */

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

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable.');
      res.status(500).json({
        error: 'Email delivery is not configured yet. Please contact the site owner.',
      });
      return;
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Trade360 Website <onboarding@resend.dev>',
        to: 'trade360@zohomail.in',
        reply_to: email,
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
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      console.error('Resend API error:', errText);
      throw new Error('Email provider rejected the request.');
    }

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
