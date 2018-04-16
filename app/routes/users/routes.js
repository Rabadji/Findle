const router = new require('koa-router')({ prefix: '/api/users' });
const auth = require('../../middlewares/auth');

router.post('/', ...require('./actions/create'));
router.post('/login', ...require('./actions/login'));

router.get('/', auth(), ...require('./actions/list'));
router.get('/:id', auth(), ...require('./actions/get'));
router.put('/:id', auth(), ...require('./actions/update'));

module.exports = router;
