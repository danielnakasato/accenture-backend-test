const _ = require('lodash');
const User = require('./user.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const create = async (req, res, next) => {

  console.log(req.body.email);
  let users = await User.findByEmail(req.body.email);

  if (!_.isEmpty(users)) {
    const err = new APIError('Email já existente!', httpStatus.OK, true);
    return next(err);
  } else {
    const userToSave = new User({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      telefones: req.body.telefones,
    });

    return userToSave.save()
      .then(savedUser => {
        parsedUser = {
          id: savedUser._id,
          nome: savedUser.nome,
          email: savedUser.email,
          telefones: savedUser.telefones,
          data_criacao: savedUser.data_criacao,
          data_atualizacao: savedUser.data_atualizacao,
          ultimo_login: savedUser.ultimo_login,
          token: savedUser.token,
        };
        return res.json(parsedUser);
      })
      .catch(e => next(e));
  }
}

const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

module.exports = { create, list };
