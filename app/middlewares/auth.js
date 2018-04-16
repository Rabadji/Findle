const UserToken = require('../models/UserToken');

module.exports = () => async (ctx, next) => {
  const token = ctx.request.header.authorization || '';

  const userToken = await UserToken.query()
    .findOne({ token })
    .throwIfNotFound()
    .catch(() => ctx.throw(403));

  ctx.$user = await userToken.$relatedQuery('user');

  await next();
};
