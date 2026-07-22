/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Vercel Serverless Function — handles POST /api/login-visit
 *
 * Called whenever someone opens the /login (Client Login) page.
 * Sends a notification using Resend's HTTP email API.
 *
 * Required Vercel environment variable:
 *   RESEND_API_KEY -> the API key from resend.com (starts with re_...)
 */

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
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable.');
      res.status(500).json({ error: 'Email delivery is not configured yet.' });
      return;
    }

    const ip = req.headers['x-forwarded-for'] || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown device';
    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Trade360 Website <onboarding@resend.dev>',
        to: 'trade360@zohomail.in',
        subject: 'Someone opened the Trade 360 Client Login page',
        text: `
A visitor opened the Client Login page on your website.

Time: ${time} (IST)
IP: ${ip}
Device/Browser: ${userAgent}
        `.trim(),
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      console.error('Resend API error:', errText);
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Failed to send login-visit notification:', err);
    res.status(200).json({ success: false });
  }
}
