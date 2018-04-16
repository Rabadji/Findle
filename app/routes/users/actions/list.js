/**
 * @api {get} /users List all users
 * @apiName UserList
 * @apiGroup User
 * @apiSuccessExample {json} Success-Response:
 [
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
 }, {
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
 ]
 */

const User = require('../../../models/User');

module.exports = [
  async (ctx) => {
    ctx.body = await User.query();
  },
];
