const _ = require('lodash');
const User = require('./user.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const crypto = require('../../services/crypto');
const token = require('../../services/token');

const create = async (req, res, next) => {
  let users = await User.findByEmail(req.body.email);

  if (!_.isEmpty(users)) {
    const err = new APIError('Email já existente!', httpStatus.CONFLICT, true);
    return next(err);
  } else {
    crypto.hash(req.body.senha)
      .then(hash => {
        const userToSave = new User({
          nome: req.body.nome,
          email: req.body.email,
          senha: hash,
          telefones: req.body.telefones,
          token: token.sign({
            email: req.body.email,
          }),
        });

        return userToSave.save()
          .then(savedUser => {
            let parsedUser = {
              id: savedUser._id,
              nome: savedUser.nome,
              email: savedUser.email,
              telefones: savedUser.telefones,
              data_criacao: savedUser.data_criacao,
              data_atualizacao: savedUser.data_atualizacao,
              ultimo_login: savedUser.ultimo_login,
              token: savedUser.token,
            };

            return res.status(201).json(parsedUser);
          })
      })
      .catch(e => next(e));
  }
}

const search = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (_.isEmpty(user)) {
    return res.json(user);
  } else {
    let parsedUser = {
      id: user._id,
      nome: user.nome,
      email: user.email,
      telefones: user.telefones,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token: user.token,
    };

    return res.json(parsedUser);
  }
}

module.exports = { create, search };
