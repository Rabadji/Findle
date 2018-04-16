const { Model } = require('objection');
const PasswordPlugin = require('objection-password')({
  allowEmptyPassword: true, // actually not, but User.jsonSchema will take care of that
  passwordField: 'password',
  rounds: 10, // xD
});
const UniquePlugin = require('objection-unique')({
  fields: ['email', 'google_id', 'facebook_id'],
  identifiers: ['id'],
});
const VisibilityPlugin = require('objection-visibility');

class User extends VisibilityPlugin(UniquePlugin(PasswordPlugin(Model))) {

  static get tableName() {
    return 'tb_user';
  }

  static get hidden() {
    return ['password', 'created_at', 'updated_at'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      anyOf: [
        { required: ['email', 'password'] },
        { required: ['google_id'] },
        { required: ['facebook_id'] },
      ],

      properties: {
        id: { type: ['string', 'integer'], pattern: '^[1-9][0-9]*$', minimum: 1 },
        name: { type: 'string', maxLength: 255 },

        email: { type: 'string', minLength: 4, maxLength: 255, format: 'email' },
        password: { type: 'string', minLength: 4, maxLength: 255 },
        google_id: { type: 'string' },
        facebook_id: { type: 'string' },

        age: { type: 'integer', minimum: 13, maximum: 120 },
        gender: { type: 'string', enum: ['female', 'male'] },

        interests: { type: 'array', items: { type: 'string' } },
        pictures: { type: 'array', items: { type: 'string' } },

        description: { type: 'string' },
        is_active: { type: 'boolean' },
      },
      // additionalProperties: false,
    };
  }

  static get relationMappings() {
    const UserToken = require('./UserToken');

    return {
      token: {
        relation: Model.HasManyRelation,
        modelClass: UserToken,
        join: {
          from: `${User.tableName}.user_id`,
          to: `${UserToken.tableName}.user_id`,
        },
      },
    };
  }

}

module.exports = User;
