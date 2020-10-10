const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const signOptions = {
  algorithm: 'RS256',
  // expiresIn: config.jwt.duration || 1800,
  expiresIn: "30m",
}

const sign = payload => {
  return jwt.sign(
    payload,
    config.jwt.privateKey,
    signOptions,
  );
}

const verify = token => new Promise((resolve, reject) =>
  jwt.verify(
    token,
    config.jwt.publicKey,
    (error, data) => error ? reject(error) : resolve(data),
  )
)

module.exports = {
  sign,
  verify,
}
