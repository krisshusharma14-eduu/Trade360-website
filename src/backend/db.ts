/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import * as path from 'path';
import { Lead, BlogPost, FAQItem } from '../types';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Helper to ensure the DB file and directories exist
function ensureDbExists() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      leads: [] as Lead[],
      faqs: getInitialFAQs(),
      blogs: getInitialBlogs(),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Initial SEO-focused blog posts
function getInitialBlogs(): BlogPost[] {
  return [
    {
      id: 'blog-1',
      title: 'Building Client Trust Through Real-Time Account Transparency',
      slug: 'building-client-trust-transparency',
      summary: 'Discover how modern asset managers leverage secure, read-only account visibility to build deeper client relationships and stand out from traditional brokers.',
      content: 'In the fast-paced world of financial asset management, transparency is no longer a luxury—it is a critical differentiator. Investors are increasingly demanding real-time visibility into their portfolios, shifting away from stale monthly PDF statements.\n\n### The Shift to Interactive Reporting\nHistorically, client reporting involved compiling trade registers at the end of the month, formatting them into static documents, and distributing them via email. This approach introduces significant lag and leaves clients feeling disconnected from their investments.\n\nWith interactive administrative portals like Trade 360, firms can provide clients with beautiful, clear visual interfaces showing balanced metrics, margin health, and equity changes. By limiting these integrations to read-only API feeds (such as MetaTrader 5 reporting endpoints), firms ensure complete asset security while delivering the intuitive experience modern investors expect.\n\n### Lead Generation Through Openness\nLeading with a philosophy of transparency is also a highly effective lead-generation tool. Prospective clients are far more likely to commit capital when a firm can demonstrate clear, auditable compliance standards and show exactly how information is presented in their secure reporting environment.',
      category: 'Asset Management',
      author: 'David Vance, Director of Operations',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
      readTime: '4 min read',
      publishedAt: '2026-06-15',
      seoKeywords: ['client transparency', 'asset management', 'investor portal', 'read-only trading dashboard'],
    },
    {
      id: 'blog-2',
      title: 'MetaTrader 5 Client Portals: Balancing Security and Visibility',
      slug: 'metatrader-5-client-portals-security',
      summary: 'A technical exploration of how asset managers integrate MT5 reporting feeds to present account metrics safely without exposing critical execution systems.',
      content: 'Integrating trading platforms like MetaTrader 5 (MT5) with outward-facing client systems requires a rigorous security architecture. The priority is clear: clients should see their data, but the underlying execution layer must remain completely insulated from external web networks.\n\n### The Danger of Write-Access Integrations\nAny system that allows web-based order entry, balance modifications, or withdrawal triggers introduces a massive attack surface. Hackers targeting financial portals focus heavily on compromising active sessions to execute unauthorized trades or manipulate risk profiles.\n\n### The Read-Only Reporting Architectural Layer\nTo completely negate this risk, Trade 360 adopts a strict read-only design pattern:\n\n1. **Data Ingestion via Reporting APIs**: We query historical trading records and static metrics from secondary replica databases or read-only manager APIs.\n2. **Network Isolation**: There is no direct connection between the web-facing client portal and the primary live execution server.\n3. **De-coupled Auth**: Client credentials for the visibility portal are completely separate from the MT5 account credentials.\n\nBy establishing this strict boundary, asset managers can offer beautiful dashboards featuring balance, margin, equity, and win rates, with the absolute assurance that client capital remains completely untouched by external factors.',
      category: 'Security & Tech',
      author: 'Marcus Thorne, Chief Information Security Officer',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
      readTime: '6 min read',
      publishedAt: '2026-06-28',
      seoKeywords: ['MT5 integration', 'MetaTrader 5', 'trading portal security', 'read-only trade history'],
    },
    {
      id: 'blog-3',
      title: 'Simplifying Investor Communications: How to Reduce Operational Churn',
      slug: 'simplifying-investor-communications-operational-churn',
      summary: 'How professional asset managers and brokers save hundreds of hours of manual client relations support by utilizing structured, on-demand reporting portals.',
      content: 'Financial operations teams often spend up to 30% of their active working hours fielding basic client inquiries: "What is my current floating margin?", "Can I see my closed trades from last Tuesday?", or "Is my equity curve up this month?"\n\n### The High Cost of Manual Inquiries\nFielding these requests via email, WhatsApp, or phone calls is highly inefficient. It distracts senior portfolio managers, introduces human error in manual report generation, and leads to communication bottlenecks during high-volatility market sessions.\n\n### On-Demand Self-Service\nProviding clients with a secure, minimalistic, self-service dashboard resolves these inefficiencies:\n\n* **Reduced Ticket Volumes**: Clients check metrics in seconds from any responsive mobile browser.\n* **Standardized Presentation**: Information is framed elegantly with high-contrast UI, preventing misunderstandings from cluttered spreadsheets.\n* **Continuous Engagement**: Interactive summaries keep investors informed without requiring proactive manual outreach from your client relationships team.\n\nEmbracing specialized account visibility platforms is the simplest route to professionalizing your brand, reducing overhead, and scaling your client capacity.',
      category: 'Client Relations',
      author: 'Sarah Jenkins, Head of Investor Relations',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
      readTime: '3 min read',
      publishedAt: '2026-07-04',
      seoKeywords: ['investor relations', 'broker portal', 'automated financial reporting', 'client retention'],
    }
  ];
}

// Initial FAQs
function getInitialFAQs(): FAQItem[] {
  return [
    {
      id: 'faq-1',
      question: 'What is Trade 360?',
      answer: 'Trade 360 is a dedicated administrative visibility and client communication platform designed for asset managers and brokers. It acts as an elegant, read-only dashboard wrapper that showcases trading performance, simplifies client reporting, and organizes client leads—all in a secure, high-contrast, modern interface.',
      category: 'general',
      order: 1
    },
    {
      id: 'faq-2',
      question: 'Is Trade 360 a trading platform or brokerage?',
      answer: 'No. Trade 360 is strictly an administrative visualization, lead-generation, and reporting utility. We do not process trades, offer brokerage accounts, execute transactions, or hold client funds. We are a software solution designed to showcase performance and bridge communication gaps.',
      category: 'general',
      order: 2
    },
    {
      id: 'faq-3',
      question: 'Does Trade 360 have access to my live trading account funds?',
      answer: 'Absolutely not. Trade 360 operates entirely on a read-only architectural layer. We do not support, store, or require execution credentials, withdrawal triggers, or order-placement authority. Funds remain completely safe and untouched within your regulated brokerage environment.',
      category: 'security',
      order: 3
    },
    {
      id: 'faq-4',
      question: 'How does the MT5 account visibility portal work?',
      answer: 'Once configured for your firm, the client portal connects via secure read-only APIs to retrieve metrics like balance, equity, margin levels, and closed trade registers. Clients log into their private dashboard on Trade 360 to review these metrics in a beautifully laid out, responsive visual format.',
      category: 'visibility',
      order: 4
    },
    {
      id: 'faq-5',
      question: 'What specific account metrics can be displayed?',
      answer: 'Our templates are engineered to display essential risk and performance metrics: starting balance, current equity, floating P/L, margin levels, free margin ratios, cumulative win rate, max drawdown estimates, and structured, searchable trade logs.',
      category: 'visibility',
      order: 5
    },
    {
      id: 'faq-6',
      question: 'Is client information securely isolated?',
      answer: 'Yes. Trade 360 uses a strict multi-tenant database schema backed by Role-Based Access Control (RBAC). Clients can only view accounts explicitly mapped to their profile by an authorized administrator, preventing any cross-tenant data exposure.',
      category: 'security',
      order: 6
    },
    {
      id: 'faq-7',
      question: 'What steps are involved in onboarding our firm?',
      answer: 'Onboarding is divided into five phases: 1) Initial lead submission and scoping, 2) Tailored compliance and custom branding consultation, 3) Secure read-only database or API credential mapping, 4) Portal design verification, and 5) Continuous ongoing software support.',
      category: 'onboarding',
      order: 7
    },
    {
      id: 'faq-8',
      question: 'How do you handle data privacy and compliance?',
      answer: 'We treat compliance with extreme importance. Our portals display clear risk disclosures, require explicit consent before lead submittals, and enforce end-to-end SSL encryption on all incoming traffic. We do not provide financial advice or investment recommendations.',
      category: 'compliance',
      order: 8
    },
    {
      id: 'faq-9',
      question: 'Can we white-label the dashboard with our own brand?',
      answer: 'Yes! Our Enterprise and custom tiers support full white-label capabilities, including loading your custom logo, defining your color palette, mapping your custom domain name, and modifying template text.',
      category: 'onboarding',
      order: 9
    },
    {
      id: 'faq-10',
      question: 'How can clients contact our team from their dashboard?',
      answer: 'Trade 360 features direct, integrated communication hubs. Clients can click-to-chat via customized WhatsApp channels, trigger a direct phone call, or submit an email ticket that instantly fires notification alerts to your administrative team.',
      category: 'general',
      order: 10
    },
    {
      id: 'faq-11',
      question: 'What happens when a new lead registers?',
      answer: 'When a prospective client fills out our enquiry form, their details are validated, saved in our secure database, and an automated SMTP email alert is instantly delivered to your administrative team to ensure a swift response.',
      category: 'onboarding',
      order: 11
    },
    {
      id: 'faq-12',
      question: 'Do you charge a setup fee?',
      answer: 'Setup fees depend entirely on the complexity of your custom integration. Our Standard plan features a nominal, predictable setup fee, while custom enterprise integrations mapping complex prime brokerage pools are quoted dynamically.',
      category: 'compliance',
      order: 12
    },
    {
      id: 'faq-13',
      question: 'How are audit logs maintained?',
      answer: 'Every critical action—including logins, record mappings, and lead exports—is recorded in an immutable, timestamped administrative audit log, helping your compliance officers easily audit team and portal activity.',
      category: 'security',
      order: 13
    },
    {
      id: 'faq-14',
      question: 'Is there a trial dashboard available?',
      answer: 'Absolutely. Asset managers and brokers can contact our sales team to receive credentials for a fully interactive demo portal populated with realistic mock trading flows, helping you evaluate the UX before onboarding.',
      category: 'general',
      order: 14
    }
  ];
}

// Read database
export function readDb() {
  ensureDbExists();
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write database
export function writeDb(data: any) {
  ensureDbExists();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Lead functions
export function getLeads(): Lead[] {
  return readDb().leads || [];
}

export function addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  const db = readDb();
  const newLead: Lead = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  db.leads = db.leads || [];
  db.leads.unshift(newLead);
  writeDb(db);
  return newLead;
}

export function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'resolved'): Lead | null {
  const db = readDb();
  const index = db.leads.findIndex((l: Lead) => l.id === id);
  if (index !== -1) {
    db.leads[index].status = status;
    writeDb(db);
    return db.leads[index];
  }
  return null;
}

// Blog functions
export function getBlogs(): BlogPost[] {
  return readDb().blogs || getInitialBlogs();
}

export function addBlog(blog: BlogPost): BlogPost {
  const db = readDb();
  db.blogs = db.blogs || [];
  db.blogs.unshift(blog);
  writeDb(db);
  return blog;
}

// FAQ functions
export function getFAQs(): FAQItem[] {
  return readDb().faqs || getInitialFAQs();
}

export function addFAQ(faq: FAQItem): FAQItem {
  const db = readDb();
  db.faqs = db.faqs || [];
  db.faqs.push(faq);
  // Sort by order
  db.faqs.sort((a: FAQItem, b: FAQItem) => a.order - b.order);
  writeDb(db);
  return faq;
}
