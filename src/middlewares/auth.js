const httpStatus = require('http-status');
const APIError = require('../modules/helpers/APIError');
const { verify } = require('../services/token');

const extractToken = ctx => {
  const authorization = ctx.headers.authorization || ''
  console.log('\n\n\n\nauthorization header');
  console.log(authorization);

  return authorization.replace('Bearer ', '')
}

// const handleError = error => {
//   console.error('Failed to verify token', error)
//   // illustration purposes only
//   // for production-ready code, use error codes/types and a catalog (maps codes -> responses)

//   /* eslint-disable prefer-promise-reject-errors */
//   return Promise.reject({
//     status: 401,
//     message: 'Invalid authentication token',
//     code: 'UNAUTHENTICATED',
//   })
// }

const setUserInState = ctx => user =>
  (ctx.state.user = user)

module.exports = (req, res, next) => {
  const token = extractToken(req);
  // return next;
  return verify(token)
  .then(data => {
    req.body.userEmail = data;
    // console.log('\n\nDATA DATA DATA');
    // console.log(data);
    return next();
  })
  .catch(err => {
    // console.log('\n\nDATA DATA DATA ERROR');
    // console.log(err);
    return res.status(401).send({ error: 'Sessão inválida!' });
  })
}
