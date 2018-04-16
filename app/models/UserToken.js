const { Model } = require('objection');
const VisibilityPlugin = require('objection-visibility');
const uuid = require('uuid/v4');

class UserToken extends VisibilityPlugin(Model) {

  static get tableName() {
    return 'tb_user_token';
  }

  static get visible() {
    return ['token'];
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${UserToken.tableName}.user_id`,
          to: `${User.tableName}.id`,
        },
      },
    };
  }

  generateToken() {
    this.token = uuid();
  }

  $beforeInsert(queryContext) {
    this.generateToken();

    return super.$beforeInsert(queryContext);
  }

}

module.exports = UserToken;

