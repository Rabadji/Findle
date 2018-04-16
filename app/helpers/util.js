const _ = require('lodash');

module.exports.handleModelError = (ctx, err = {}) => {
  const status = err.statusCode || 400;
  const errors = _.reduce(err.data || [], (result, value, key) => {
    const obj = { field: key };
    if (Array.isArray(value) && value.length) obj.message = value[0].message;
    result.push(obj);
    return result;
  }, []);

  ctx.status = status;
  return ctx.throw(400, {
    data: {
      errors,
    },
  });
};

