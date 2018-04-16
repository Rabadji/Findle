const router = new require('koa-router')({ prefix: '/api/message' });
const auth = require('../../middlewares/auth');

router.post('/', auth(), ...require('./actions/create'));

module.exports = router;
