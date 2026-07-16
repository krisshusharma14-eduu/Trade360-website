const ratelimit = require('koa-ratelimit');

const db = new Map();

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.request.url === '/api/leads' && ctx.request.method === 'POST') {
      const limiter = ratelimit({
        driver: 'memory',
        db: db,
        duration: 60000,
        max: 5,
        id: (ctx) => ctx.ip,
        errorMessage: 'Too many submissions, please try again later.',
      });
      return limiter(ctx, next);
    }
    return next();
  };
};
