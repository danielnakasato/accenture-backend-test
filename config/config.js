const Joi = require('joi');

// load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false),
    }),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  JWT_DURATION: Joi.any().required(),
  JWT_PRIVATE_KEY: Joi.string().required(),
  JWT_PUBLIC_KEY: Joi.string().required(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
  hashSaltRounds: 10,
  jwt: {
    duration: process.env.JWT_DURATION || '30m',
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY,
  },
}

module.exports = config;
