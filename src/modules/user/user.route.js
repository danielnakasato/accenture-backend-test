const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const userCtrl = require('./user.controller');
const authenticateMiddleware = require('../../middlewares/auth');

const router = express.Router()

router.route('/')
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
  .get(authenticateMiddleware, userCtrl.search);

module.exports = router;
