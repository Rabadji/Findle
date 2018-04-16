/**
 * @api {post} /message Create message
 * @apiName ChatroomMessageCreate
 * @apiGroup ChatroomMessage
 * @apiParam {Number} chatroom_id
 * @apiParam {String} message
 * @apiSuccessExample {json} Success-Response:
 {
     "message": "six",
     "sender_id": 3,
     "id": 113,
     "created_at": "2018-02-04T04:12:15.958Z"
 }
 */

const Chatroom = require('../../../models/Chatroom');
const ChatroomMessage = require('../../../models/ChatroomMessage');

module.exports = [
  async (ctx) => {
    const { body } = ctx.request;

    const chatRoom = await Chatroom.query()
      .findById(body.chatroom_id)
      .throwIfNotFound();

    if (![chatRoom.first_user_id, chatRoom.second_user_id].includes(ctx.$user.id)) return ctx.throw(403);

    ctx.body = await ChatroomMessage.query()
      .insert({ ...body, sender_id: ctx.$user.id })
      .returning('*');
  },
];
