const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      nome: Joi.string().required(),
      email: Joi.string().required(),
      senha: Joi.string().required(),
    },
  },

  // POST /api/auth/login
  signIn: {
    body: {
      email: Joi.string().required(),
      senha: Joi.string().required(),
    },
  },
}
