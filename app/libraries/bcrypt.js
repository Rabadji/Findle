const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports.hash = password => bcrypt.hashSync(password, SALT_ROUNDS);
module.exports.isValid = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);
