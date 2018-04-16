/**
 * @api {post} /users User signup
 * @apiName UserCreate
 * @apiGroup User
 * @apiParam {String} name
 * @apiParam {String} email
 * @apiParam {String} google_id
 * @apiParam {String} facebook_id
 * @apiParam {String} gender
 * @apiParam {Integer} age
 * @apiParam {String} description
 * @apiParam {String[]} pictures
 * @apiParam {String[]} interests
 * @apiSuccessExample {json} Success-Response:
 {
     "email": "felix@test.com",
     "id": 5,
     "name": null,
     "google_id": null,
     "facebook_id": null,
     "gender": null,
     "age": null,
     "description": null,
     "pictures": [],
     "interests": [],
     "is_active": true
 }
 */

const User = require('../../../models/User');

module.exports = [
  async (ctx) => {
    const { body } = ctx.request;

    ctx.body = await User.query()
      .insert(body)
      .returning('*');
  },
];
