/**
 * @api {post} /users/login User Login
 * @apiName UserLogin
 * @apiGroup User
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiParam {String} google_id
 * @apiParam {String} facebook_id
 * @apiSuccessExample {json} Success-Response:
 {
     "token": "803b431a-8da9-491b-93ef-20f465713526"
 }
 */

const User = require('../../../models/User');
const UserToken = require('../../../models/UserToken');

module.exports = [
  async (ctx) => {
    const { email, password = '', google_id, facebook_id } = ctx.request.body;
    const search = {};
    if (email) {
      search.email = email;
    } else if (google_id) {
      search.google_id = google_id;
    } else if (facebook_id) {
      search.facebook_id = facebook_id;
    } else {
      return ctx.throw(403);
    }

    const user = await User.query()
      .findOne(search)
      .throwIfNotFound();

    if (search.email) {
      if (!await user.verifyPassword(password)) return ctx.throw(403);
    }

    ctx.body = await UserToken.query()
      .insert({ user_id: user.id })
      .returning('*');
  },
];
