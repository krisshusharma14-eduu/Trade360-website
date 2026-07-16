module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/leads/export/csv',
      handler: 'lead.exportCsv',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/leads',
      handler: 'lead.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/leads/:id',
      handler: 'lead.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/leads',
      handler: 'lead.create',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/leads/:id',
      handler: 'lead.update',
      config: {
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/leads/:id',
      handler: 'lead.delete',
      config: {
        auth: false,
      },
    },
  ],
};
