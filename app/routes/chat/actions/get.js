/**
 * @api {get} /chat/:id Chatroom details
 * @apiName ChatroomGet
 * @apiGroup Chatroom
 * @apiParam {Number} limit Limit number of messages
 * @apiParam {Number} offset Offset messages list
 * @apiSuccessExample {json} Success-Response:
 {
     "id": 3,
     "first_user_id": 3,
     "second_user_id": 4,
     "is_active": true,
     "created_at": "2018-02-03T09:24:31.745Z",
     "messages": [
         {
             "id": 1,
             "sender_id": 4,
             "message": "four",
             "created_at": "2018-02-04T04:54:22.882Z"
         },
         {
             "id": 2,
             "sender_id": 4,
             "message": "one",
             "created_at": "2018-02-04T04:55:04.681Z"
         },
         {
             "id": 3,
             "sender_id": 3,
             "message": "two",
             "created_at": "2018-02-04T04:55:07.263Z"
         }
     ]
 }
 */

const Chatroom = require('../../../models/Chatroom');

module.exports = [
  async (ctx) => {
    const id = parseInt(ctx.params.id);
    const { limit = 20, offset = 0 } = ctx.query;

    ctx.body = await Chatroom.query()
      .findById(id)
      .eager('messages')
      .modifyEager('messages', (builder) => {
        builder.limit(limit);
        builder.offset(offset);
        builder.orderBy('id');
      })
      .throwIfNotFound();
  },
];
