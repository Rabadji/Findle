const glob = require('glob');
const compose = require('koa-compose');

module.exports = (options = {}) => {
  const routers = glob.sync(`${__dirname}/../routes/**/*routes.js`);
  const stack = [];
  const routes = routers.reduce((array, item) => {
    const router = require(item);
    array.push(router.routes(), router.allowedMethods());

    if (options.debug) {
      stack.push(router.stack.map(layer => `${layer.path} (${layer.methods.join`,`})`));
    }

    return array;
  }, []);

  if (options.debug) {
    console.log('Routes:', JSON.stringify(stack, null, 2));
  }
  return compose(routes);
};

