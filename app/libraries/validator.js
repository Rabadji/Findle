const validator = require('koa-validate');

validator.Validator.prototype.rowExists = function (model, attr = 'id', options) {
  if (this.hasError()) return this;
  options = {
    message: 'row doesn\'t exist',
    where: {},
    ...options,
  };

  options.where[attr] = this.value;

  // if attribute is `id` and isn't INTEGER
  if (attr === 'id' && !~~this.value) return this.addError(options.message);

  return model
    .where(options.where)
    .fetch()
    .then((res) => {
      if (!res) this.addError(options.message);
    });
};

module.exports = validator;
