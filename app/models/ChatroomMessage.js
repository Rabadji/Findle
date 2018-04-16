const { Model } = require('objection');

const VisibilityPlugin = require('objection-visibility');

class ChatroomMessage extends VisibilityPlugin(Model) {

  static get tableName() {
    return 'tb_chatroom_message';
  }

  static get hidden() {
    return ['updated_at', 'chatroom_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: ['string', 'integer'], pattern: '^[1-9][0-9]*$', minimum: 1 },
        chatroom_id: { type: ['string', 'integer'], pattern: '^[1-9][0-9]*$', minimum: 1 },
        sender_id: { type: ['string', 'integer'], pattern: '^[1-9][0-9]*$', minimum: 1 },
        message: { type: 'string' },
      },
      additionalProperties: false,
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const Chatroom = require('./Chatroom');

    return {
      chatroom: {
        relation: Model.BelongsToOneRelation,
        modelClass: Chatroom,
        join: {
          from: `${ChatroomMessage.tableName}.chatroom_id`,
          to: `${Chatroom.tableName}.id`,
        },
      },
      sender: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${ChatroomMessage.tableName}.sender_id`,
          to: `${User.tableName}.id`,
        },
      },
    };
  }

}

module.exports = ChatroomMessage;
