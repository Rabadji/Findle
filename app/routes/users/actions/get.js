/**
 * @api {get} /users/:id User details
 * @apiName UserGet
 * @apiGroup User
 * @apiSuccessExample {json} Success-Response:
 {
      "id": 1,
      "name": null,
      "email": "test@test.com",
      "google_id": null,
      "facebook_id": null,
      "gender": "male",
      "age": 41,
      "description": null,
      "pictures": [],
      "interests": ['Reading'],
      "is_active": true
  }
 */

const User = require('../../../models/User');

module.exports = [
  async (ctx) => {
    ctx.body = await User.query()
      .findById(ctx.params.id)
      .throwIfNotFound();
  },
];
