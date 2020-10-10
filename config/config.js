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
    // privateKey: process.env.JWT_PRIVATE_KEY,
    // publicKey: process.env.JWT_PUBLIC_KEY,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEArShR7vW2d04TnxjAf3h15hgvq3PDbo4HazJO9wBI8r+LCtsH
TL+jGVQNBZaY2mYzSz2p4530rDDURaicuMP8Zk/83SStps4qZvw0a0ZLpfYNMoWI
S0t0c084Ft4EKXN0NZufkJ2M0XMQHUiHvcw5bjezWuALFEs4unq/ULhu5rn58HCQ
FPkGct6S9I+qckp1D3v2irn/IG1RBM4DQ03JqdhUdzAxa3eMnpeYRcKJWdD7GWNO
2tRkehfEiVNtccmhBPy7iHc8MoKi4h+NVfh/rtmCh2oCqGlRm0B+dvXPi1fXeaD6
bnEa+2kXpFpKpMzdAA58EaPyVXosautxXdLGrQIDAQABAoIBAQCdJ3L1RdyM+zej
tXtANbwLUPgyy6YbuJvTFp3EX2XVqzIucAt4BJWqbzZCVCP2U7tKFnUSOFHP1aFS
d22F45o34XDF5HwWYBbr0QpiMjKGNYJU0AybCahu3v8xAd8VH8vgu5VeUx9zGNMP
QLyx7aBSAAuv9pcXnA2oca8hO8Krc6+SljswvD34TCgnL/4+Wbdh0UHFigi9YHih
N37uIqSXdJid4DHxjSkaafccsrYDsSarXCauSILkD3IXs/EdHqRe0h/Y/CD5S69P
kGzTHaBX1f/pMlkmmBVDqyN0wXpZS2UfnXlg3RHyoJGRnU/nmvlMkyf2TgzwT7di
97Mlax+hAoGBAOQvGZHg4Cbk7byOLMD+a1b2OAFQcKGxrrAvnBRT9aUbOahXh/pO
/PHpApAdH/Nq5SQAjQ1V8ReRz+5Wz7UtSnWyqNpYdEN803jeGSb6LnxyDLnicScs
56arPTO2AzGOC0pINpwegCENPQyiV5WJQ3NKpLGcxXmoEMypyvna5+c/AoGBAMJE
BInc8+7+qUCBEgIltjAgLvk6GRldE3E02IxDhezfOCszWTrJtXifq5zOaoTlfZRi
IUYfWidbaQlvd5inl6TOxTwS7yFieiL6SC4U89UTURsldi3FL2TIsKjbKdl5vrvn
aRcUhNBoL/M9lRH7tZ6QNTGtNTm1ctgU8AeNQSMTAoGAHk8HRXIqM+Bal54G4cep
eE6SF9KYc1HHk01vnN+eFEUufmbJ//x36qX5mizULp/3ObX9BlVxBaFvjgfn5PfU
GRgXB5GSN9ifukE99AhtHkiD2jjysLJtPp0mLvUxLWbhpwc6gbgnarx4bHIv0gP+
epTilVjuff9N4/F1rYRfIz8CgYAu9MPoEuk/bny4o7oXnMfx0AWqpjlk4ROO/IgP
N08K11W7U3kQ9aqQkn+nslka8GGvWRzT10YyVy0HY9MTqgbEhlo0UBtPBX+iLr79
rIDXkwi6uA5dt9jh0oSo+/icoYnR33iOZJ5JxbU5ZTxAEYhv4EmLTWOdJFezFTSD
jsgc0wKBgHqueu+LbPXHBK9SetZfJJ0hjYAH+x8VQj0SHIhbVSh9G97dLzYtN+QN
c6gsJbHkt4g34QDdio01iODkHwjfOTw2mMRTSfoXsw2DWErbwxJheAr5fmcYw9mp
nb19+V/jCD6q7ZH1VVJG5af7V8KFP9W59L2tr1b5BqkjmR8RJfQK
-----END RSA PRIVATE KEY-----`,
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArShR7vW2d04TnxjAf3h1
5hgvq3PDbo4HazJO9wBI8r+LCtsHTL+jGVQNBZaY2mYzSz2p4530rDDURaicuMP8
Zk/83SStps4qZvw0a0ZLpfYNMoWIS0t0c084Ft4EKXN0NZufkJ2M0XMQHUiHvcw5
bjezWuALFEs4unq/ULhu5rn58HCQFPkGct6S9I+qckp1D3v2irn/IG1RBM4DQ03J
qdhUdzAxa3eMnpeYRcKJWdD7GWNO2tRkehfEiVNtccmhBPy7iHc8MoKi4h+NVfh/
rtmCh2oCqGlRm0B+dvXPi1fXeaD6bnEa+2kXpFpKpMzdAA58EaPyVXosautxXdLG
rQIDAQAB
-----END PUBLIC KEY-----`,
  },
}

module.exports = config;
