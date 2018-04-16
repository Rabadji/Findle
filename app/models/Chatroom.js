const { Model } = require('objection');

const VisibilityPlugin = require('objection-visibility');

class Chatroom extends VisibilityPlugin(Model) {

  static get tableName() {
    return 'tb_chatroom';
  }

  static get hidden() {
    return ['updated_at'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: ['string', 'integer'], pattern: '^[1-9][0-9]*$', minimum: 1 },
        first_user_id: { type: ['string', 'integer'], pattern: '^[1-9][0-9]*$', minimum: 1 },
        second_user_id: { type: ['string', 'integer'], pattern: '^[1-9][0-9]*$', minimum: 1 },

        is_active: { type: 'boolean' },
      },
      additionalProperties: false,
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const ChatroomMessage = require('./ChatroomMessage');

    return {
      firstUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${Chatroom.tableName}.first_user_id`,
          to: `${User.tableName}.id`,
        },
      },
      secondUser: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${Chatroom.tableName}.second_user_id`,
          to: `${User.tableName}.id`,
        },
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: ChatroomMessage,
        join: {
          from: `${Chatroom.tableName}.id`,
          to: `${ChatroomMessage.tableName}.chatroom_id`,
        },
      },
    };
  }

}

module.exports = Chatroom;
