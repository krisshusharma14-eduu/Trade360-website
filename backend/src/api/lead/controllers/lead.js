'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lead.lead', ({ strapi }) => ({
  async exportCsv(ctx) {
    const leads = await strapi.entityService.findMany('api::lead.lead', {
      sort: { createdAt: 'desc' },
    });

    const headers = ['Full Name', 'Mobile', 'Email', 'City', 'Interested Service', 'Message', 'Consent', 'Source Page', 'Created At'];
    const rows = leads.map((lead) => [
      lead.fullname,
      lead.mobile,
      lead.email,
      lead.city,
      lead.interestedService,
      lead.message,
      lead.consent,
      lead.sourcepage,
lead.createdAt,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    ctx.set('Content-Type', 'text/csv');
    ctx.set('Content-Disposition', 'attachment; filename="leads.csv"');
    ctx.body = csv;
  },
}));
