/**
 * @api {get} /chat List all chatrooms of current user
 * @apiName ChatroomList
 * @apiGroup Chatroom
 * @apiSuccessExample {json} Success-Response:
 [
 {
    "first_user_id": 3,
    "second_user_id": 4,
    "id": 2,
    "is_active": true,
    "created_at": "2018-02-03T11:09:45.238Z"
 },
 {
    "first_user_id": 3,
    "second_user_id": 5,
    "id": 3,
    "is_active": true,
    "created_at": "2018-02-03T11:11:45.238Z"
 }
 ]
 */

const Chatroom = require('../../../models/Chatroom');

module.exports = [
  async (ctx) => {
    const { body } = ctx.request;

    // check if chat-room already exists
    if (await Chatroom.query().findOne(body)) return ctx.throw(403);

    ctx.body = await Chatroom.query()
      .insert(body)
      .returning('*');
  },
];
