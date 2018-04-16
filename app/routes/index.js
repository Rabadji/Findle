const glob = require('glob');
const compose = require('koa-compose');

module.exports = (debug = false) => {
  const res = glob(`${__dirname}/**/routes.js`);
  const stack = [];

  const routes = res.reduce((array, item) => {
    const router = require(item);
    array.push(router.routes(), router.allowedMethods());

    if (debug) {
      router.stack.forEach(layer => stack.push(`${layer.path} (${layer.methods.join`,`})`));
    }
    return array;
  }, []);

  if (debug) {
    console.log('Routes:', JSON.stringify(stack, null, 2));
  }

  return compose(routes);
};
// app.get("/",function(req,res){
// res.send("hello")
// });