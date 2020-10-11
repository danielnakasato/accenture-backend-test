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
        });

        userToSave.save().then(savedUser => {
          User.findOneAndUpdate(
            { email: savedUser.email },
            {
              $set: {
                nome: savedUser.nome + ' Atualizado',
                token: token.sign({
                  id: savedUser.id,
                  email: savedUser.email,
                })
              }
            },
            { new: true },
          ).exec((err, updatedUser) => {
            if (updatedUser) {
              let parsedUser = {
                id: updatedUser._id,
                nome: updatedUser.nome,
                email: updatedUser.email,
                telefones: updatedUser.telefones,
                data_criacao: updatedUser.data_criacao,
                data_atualizacao: updatedUser.data_atualizacao,
                ultimo_login: updatedUser.ultimo_login,
                token: updatedUser.token,
              };
              return res.status(201).json(parsedUser);
            }
          })
        });

      }).catch(e => next(e));
  }
}

const search = async (req, res, next) => {
  const userId = req.params.userId;
  const userToken = req.user;
  const user = await User.findById(userId);

  if (_.isEmpty(user)) {
    return res.json(user);
  } else if (userToken.id !== user.id) {
    const err = new APIError('Sessão Inválida!', httpStatus.UNAUTHORIZED, true);
    return next(err);
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
