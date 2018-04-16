const { validate } = require('jsonschema');

function formatValidations(validations) {
  const formatted = {};

  Object.keys(validations).forEach((requestProperty) => {
    const validation = validations[requestProperty];
    const propertyValidations = [];
    const currentPropertyValidation = {};

    validation.errors.forEach((propertyValidation) => {
      const isNewProperty = currentPropertyValidation.property !== propertyValidation.property;

      if (isNewProperty) {
        propertyValidations.push({
          value: propertyValidation.instance,
          property: propertyValidation.property,
          messages: [propertyValidation.message],
        });
      } else {
        currentPropertyValidation.messages.push(propertyValidation.message);
      }
    });

    formatted[requestProperty] = propertyValidations;
  });

  return formatted;
}

function getData(ctx, prop) {
  if (prop === 'query') return ctx.query;
  if (prop === 'body') return ctx.request.body;
  if (prop === 'params') return ctx.params;
  return ctx.throw(500);
}

module.exports = function (schemas) {
  return async function (ctx, next) {
    const validations = {};
    Object.keys(schemas).forEach((requestProperty) => {
      const schema = schemas[requestProperty];
      schema.type = schema.type || 'object';
      const data = getData(ctx, requestProperty);

      const validation = validate(data, schema);
      if (!validation.valid) validations[requestProperty] = validation;
    });
    if (Object.keys(validations).length) {
      ctx.badRequest(formatValidations(validations));
    } else {
      await next();
    }
  };
};
