const _ = require('lodash');
// const log = require('bristol');
//
// log.addTarget('console');

function fix(err) {
  const result = {
    status: err.statusCode || 400,
  };
  if (err.message && !err.message.startsWith('{\n')) result.message = err.message;

  if (_.isObject(err.data)) {
    result.data = { errors: {} };
    Object.keys(err.data).forEach((key) => {
      // if (/^\d+$/.test(key)) return;
      const content = err.data[key];
      if (Array.isArray(content) && content.length && content[0].message) {
        result.data.errors[key] = content[0].message;
      }
    });
  }
  return result;
}

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = fix(err);
    ctx.body.status = ctx.status;
    ctx.app.emit('error', err, ctx);
  }
};
