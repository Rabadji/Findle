const router = new require('koa-router')({ prefix: '/api/chat' });
const auth = require('../../middlewares/auth');

router.post('/', auth(), ...require('./actions/create'));
router.get('/:id', auth(), ...require('./actions/get'));
router.delete('/:id', auth(), ...require('./actions/delete'));

module.exports = router;
