const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../../config/param-validation')
const userCtrl = require('./user.controller')

const router = express.Router()

router.route('/')
  .post(validate(paramValidation.createUser), userCtrl.create)

module.exports = router
