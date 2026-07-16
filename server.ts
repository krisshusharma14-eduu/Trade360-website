/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import * as path from 'path';
import { createServer as createViteServer } from 'vite';
import { addLead, getLeads, getBlogs, getFAQs, addBlog, addFAQ, updateLeadStatus } from './src/backend/db';

async function startServer() {
  const app = express();
  const PORT = 1337;

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API: Get Blogs
  app.get('/api/blogs', (req, res) => {
    try {
      const blogs = getBlogs();
      res.json(blogs);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch blogs', details: err.message });
    }
  });

  // API: Add Blog (For future admin management)
  app.post('/api/blogs', (req, res) => {
    try {
      const blog = req.body;
      if (!blog.title || !blog.summary || !blog.content) {
        res.status(400).json({ error: 'Title, summary, and content are required' });
        return;
      }
      const newBlog = addBlog(blog);
      res.status(201).json(newBlog);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to add blog', details: err.message });
    }
  });

  // API: Get FAQs
  app.get('/api/faqs', (req, res) => {
    try {
      const faqs = getFAQs();
      res.json(faqs);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch FAQs', details: err.message });
    }
  });

  // API: Add FAQ (For future admin management)
  app.post('/api/faqs', (req, res) => {
    try {
      const faq = req.body;
      if (!faq.question || !faq.answer) {
        res.status(400).json({ error: 'Question and answer are required' });
        return;
      }
      const newFaq = addFAQ(faq);
      res.status(201).json(newFaq);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to add FAQ', details: err.message });
    }
  });

  // API: Receive Lead Submission
  app.post('/api/leads', (req, res) => {
    try {
      const { name, phone, email, enquiryType, message, consent } = req.body;

      // Validation
      if (!name || !phone || !email || !enquiryType || !message) {
        res.status(400).json({ error: 'All fields (name, phone, email, enquiryType, message) are required' });
        return;
      }

      if (consent !== true && consent !== 'true') {
        res.status(400).json({ error: 'You must consent to our data privacy terms to submit an enquiry.' });
        return;
      }

      const newLead = addLead({
        name,
        phone,
        email,
        enquiryType,
        message,
        consent: Boolean(consent),
      });

      // Simulate SMTP Email Notification
      console.log('==================================================');
      console.log('✉️  [SMTP SIMULATOR] NEW LEAD SUBMISSION RECEIVED');
      console.log(`To: admin@trade360.com`);
      console.log(`Subject: New Lead - ${name} (${enquiryType})`);
      console.log(`Date: ${new Date().toUTCString()}`);
      console.log('--------------------------------------------------');
      console.log(`Lead Details:`);
      console.log(`  Name: ${name}`);
      console.log(`  Phone: ${phone}`);
      console.log(`  Email: ${email}`);
      console.log(`  Enquiry Type: ${enquiryType}`);
      console.log(`  Consent Checkbox: Approved (UTC-Timestamp)`);
      console.log(`  Message:\n  "${message}"`);
      console.log('==================================================');

      res.status(201).json({
        success: true,
        message: 'Your lead has been successfully registered. Our compliance team will review and connect with you shortly.',
        lead: newLead
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to record lead', details: err.message });
    }
  });

  // API: Get Leads (Simple passcode protected for Admin view)
  app.get('/api/leads', (req, res) => {
    try {
      const passcode = req.query.passcode || req.headers['x-admin-passcode'];
      // Simple default passcode is "trade360admin"
      if (passcode !== 'trade360admin') {
        res.status(401).json({ error: 'Unauthorized. Please provide a valid passcode.' });
        return;
      }

      const leads = getLeads();
      res.json(leads);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch leads', details: err.message });
    }
  });

  // API: Update Lead Status
  app.post('/api/leads/:id/status', (req, res) => {
    try {
      const passcode = req.query.passcode || req.headers['x-admin-passcode'];
      if (passcode !== 'trade360admin') {
        res.status(401).json({ error: 'Unauthorized. Please provide a valid passcode.' });
        return;
      }

      const { id } = req.params;
      const { status } = req.body;
      if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
        res.status(400).json({ error: 'Valid status is required' });
        return;
      }

      const updated = updateLeadStatus(id, status);
      if (!updated) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }

      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update lead status', details: err.message });
    }
  });

  // API: Export Leads as CSV
  app.get('/api/leads/export', (req, res) => {
    try {
      const passcode = req.query.passcode || req.headers['x-admin-passcode'];
      if (passcode !== 'trade360admin') {
        res.status(401).send('Unauthorized. Please provide a valid passcode in the query parameter (e.g. ?passcode=trade360admin).');
        return;
      }

      const leads = getLeads();

      // Formulate CSV rows
      const headers = ['ID', 'Name', 'Phone', 'Email', 'Enquiry Type', 'Message', 'Status', 'Consent Given', 'Created At'];
      const csvRows = [headers.join(',')];

      for (const lead of leads) {
        const row = [
          `"${lead.id}"`,
          `"${lead.name.replace(/"/g, '""')}"`,
          `"${lead.phone}"`,
          `"${lead.email}"`,
          `"${lead.enquiryType}"`,
          `"${lead.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
          `"${lead.status}"`,
          `"${lead.consent}"`,
          `"${lead.createdAt}"`
        ];
        csvRows.push(row.join(','));
      }

      const csvContent = csvRows.join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=trade360_leads.csv');
      res.status(200).send(csvContent);
    } catch (err: any) {
      res.status(500).send(`Failed to export CSV: ${err.message}`);
    }
  });

  // Setup Vite Dev Server / Static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for SPA router fallbacks
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start full-stack server:', err);
});
