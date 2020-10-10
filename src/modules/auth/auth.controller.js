const _ = require('lodash');
const httpStatus = require('http-status');
const User = require('../user/user.model');
const APIError = require('../helpers/APIError');
const crypto = require('../../services/crypto')
const token = require('../../services/token');


const signIn = async (req, res, next) => {
  let users = await User.findByEmail(req.body.email);
  let userPassword = req.body.senha;

  if (_.isEmpty(users)) {
    const err = new APIError('Usuário e/ou senha inválidos', httpStatus.UNAUTHORIZED, true);
    return next(err);
  } else {
    let user = users[0];
    const isMatch = await crypto.compare(userPassword, user.senha);

    if (!isMatch) {
      const err = new APIError('Usuário e/ou senha inválidos', httpStatus.UNAUTHORIZED, true);
      return next(err);
    }

    let updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          ultimo_login: Date.now(),
          data_atualizacao: Date.now(),
          token: token.sign({
            id: user.id,
            email: user.email,
          })
        }
      }
    );

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

      return res.json(parsedUser);
    }
  }
}

module.exports = { signIn }
