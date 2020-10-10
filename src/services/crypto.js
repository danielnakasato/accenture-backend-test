const bcrypt = require('bcrypt');
const config = require('../../config/config');

const hash = value => {
  return bcrypt
    .hash(value, config.hashSaltRounds)
}

const compare = (value, hash) => {
  return bcrypt.compare(value, hash);
}

module.exports = {
  hash,
  compare,
}
