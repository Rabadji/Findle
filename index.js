console.time('Time to start the app');
require("dotenv/config");
//const env = require('./env');
const Koa = new (require('koa'))();
const routes = require('./app/libraries/routes');
const bodyParser = require('koa-body');
const serveStatic = require('koa-static');
const respond = require('koa-respond');
const knex = require('knex')(process.env.DB);
const { Model } = require('objection');

const contextHelpers = require('./app/helpers/koa-context');
const errorHandler = require('./app/middlewares/error-handler');

Model.knex(knex);

contextHelpers(Koa);
Koa.proxy = true;
Koa.use(bodyParser({
  multipart: true,
  urlencoded: true,
  formLimit: 10240 * 1024,
}))
  .use(errorHandler())
  .use(respond())
  .use(routes({ debug: false }))
  .use(serveStatic('./public'))
  .listen(process.env.PORT);

console.timeEnd('Time to start the app');
console.log(`Listening on :${process.env.PORT}`);

module.exports = Koa;
