/**
 * @api {delete} /chat/:id Delete chat
 * @apiName ChatroomDelete
 * @apiGroup Chatroom
 * @apiSuccessExample {json} Success-Response:
 {}
 */

const Chatroom = require('../../../models/Chatroom');

module.exports = [
  async (ctx) => {
    const id = parseInt(ctx.params.id);

    const chatRoom = await Chatroom.query()
      .findById(id)
      .throwIfNotFound();

    if (![chatRoom.first_user_id, chatRoom.second_user_id].includes(ctx.$user.id)) return ctx.throw(403);

    await chatRoom.$query().delete();

    ctx.body = {};
  },
];
