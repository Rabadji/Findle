/**
 * @api {put} /users/:id User update
 * @apiName UserUpdate
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
    "id": 2,
    "name": null,
    "email": "test@test.com",
    "google_id": null,
    "facebook_id": null,
    "gender": "male",
    "age": 41,
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
    const id = parseInt(ctx.params.id);

    if (id !== ctx.$user.id) return ctx.throw(403);

    const user = await User.query()
      .findById(id)
      .throwIfNotFound();

    await user.$query().patch(body);

    ctx.body = user;
  },
];

