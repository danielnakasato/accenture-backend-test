const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  senha: {
    type: String,
    required: true,
  },
  telefones: {
    type: [{
      _id: false,
      numero: {
        type: String,
        required: true,
        trim: true,
      },
      ddd: {
        type: String,
        required: true,
        trim: true,
      },
    }],
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'O número de telefone inválido.'],
  },
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
})

/**
 * Methods
 */
UserSchema.method({
})

/**
 * Statics
 */
UserSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('Usuário inexistente!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
  },

  findByEmail(email) {
    return this.find({
      email: email,
    });
  },

  list() {
    return this.findOne();
  },
}

module.exports = mongoose.model('User', UserSchema)
