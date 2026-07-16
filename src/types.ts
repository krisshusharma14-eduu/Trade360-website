/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  publishedAt: string;
  seoKeywords: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'onboarding' | 'visibility' | 'security' | 'compliance';
  order: number;
}
