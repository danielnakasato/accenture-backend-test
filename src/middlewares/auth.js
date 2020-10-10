const { verify } = require('../services/token');

const extractToken = ctx => {
  const authorization = ctx.headers.authorization || ''
  return authorization.replace('Bearer ', '')
}

module.exports = (req, res, next) => {
  const token = extractToken(req);
  return verify(token)
  .then(data => {
    req.body.userEmail = data;
    return next();
  })
  .catch(() => {
    return res.status(401).send({ mensagem: 'Sessão inválida!' });
  })
}
