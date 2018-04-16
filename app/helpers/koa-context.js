const _ = require('lodash');

async function ctxValidate(next, sendErrors = true) {
  const ctx = this;
  if (!ctx.errors) return next();
  if (!sendErrors) return ctx.throw(400);
  const errors = [];
  ctx.errors
    .forEach((error) => {
      const key = _.keys(error)[0];
      errors.push({
        field: key,
        message: error[key],
      });
    });
  ctx.status = 400;
  return ctx.throw(400, {
    data: {
      errors,
    },
  });
}

function $body(key) {
  return this.checkBody(key).value;
}

function pickBody(...keys) {
  const self = this;
  return keys.reduce((sum, attr) => {
    if (self.$body(attr) !== undefined) {
      sum[attr] = self.$body(attr);
    }
    return sum;
  }, {});
}

module.exports = (app) => {
  app.context.validate = ctxValidate;
  app.context.$body = $body;
  app.context.$b = pickBody;
};
