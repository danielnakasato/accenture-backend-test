# Accenture Backend - Teste

![Accenture](https://logodownload.org/wp-content/uploads/2014/05/accenture-logo-2.png)

## Projeto

O projeto consiste em uma aplicação NodeJS + Mongo hospedada no Heroku [API](https://accenture-backend-test.herokuapp.com) com os requisitos executados na seguinte forma:
• Persistência de dados
  - Está sendo usado o mongoDB Atlas como instância do banco de dados
• Gestão de dependências via gerenciador de pacotes (npm)
  - Dependências listadas no package.json
• Utilização de Eslint 
  - Regras definidas em .eslintrc - Regras recomendadas
• API: Express, Hapi ou similares
  - Express
• Utilizar banco nosql
  - MongoDB

### Variáveis de ambiente

Por ser tratar de um teste, vou deixar listadas aqui as variáveis de ambiente, mas idealmente seria melhor essa informação estar em algum lugar com menos exposição e mais seguro. (Passpack ou alguma plataforma do tipo)

- NODE_ENV=development
- PORT=3000
- MONGO_HOST=mongodb+srv://danielnakasato:teste10@cluster0.umj52.mongodb.net/test?retryWrites=true&w=majority
- MONGO_HOST_TEST=mongodb://admin:teste123@127.0.0.1:27017/accenture-test-db
- MONGO_PORT=27017

- JWT_DURATION=300
- JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEArShR7vW2d04TnxjAf3h15hgvq3PDbo4HazJO9wBI8r+LCtsH\nTL+jGVQNBZaY2mYzSz2p4530rDDURaicuMP8Zk/83SStps4qZvw0a0ZLpfYNMoWI\nS0t0c084Ft4EKXN0NZufkJ2M0XMQHUiHvcw5bjezWuALFEs4unq/ULhu5rn58HCQ\nFPkGct6S9I+qckp1D3v2irn/IG1RBM4DQ03JqdhUdzAxa3eMnpeYRcKJWdD7GWNO\n2tRkehfEiVNtccmhBPy7iHc8MoKi4h+NVfh/rtmCh2oCqGlRm0B+dvXPi1fXeaD6\nbnEa+2kXpFpKpMzdAA58EaPyVXosautxXdLGrQIDAQABAoIBAQCdJ3L1RdyM+zej\ntXtANbwLUPgyy6YbuJvTFp3EX2XVqzIucAt4BJWqbzZCVCP2U7tKFnUSOFHP1aFS\nd22F45o34XDF5HwWYBbr0QpiMjKGNYJU0AybCahu3v8xAd8VH8vgu5VeUx9zGNMP\nQLyx7aBSAAuv9pcXnA2oca8hO8Krc6+SljswvD34TCgnL/4+Wbdh0UHFigi9YHih\nN37uIqSXdJid4DHxjSkaafccsrYDsSarXCauSILkD3IXs/EdHqRe0h/Y/CD5S69P\nkGzTHaBX1f/pMlkmmBVDqyN0wXpZS2UfnXlg3RHyoJGRnU/nmvlMkyf2TgzwT7di\n97Mlax+hAoGBAOQvGZHg4Cbk7byOLMD+a1b2OAFQcKGxrrAvnBRT9aUbOahXh/pO\n/PHpApAdH/Nq5SQAjQ1V8ReRz+5Wz7UtSnWyqNpYdEN803jeGSb6LnxyDLnicScs\n56arPTO2AzGOC0pINpwegCENPQyiV5WJQ3NKpLGcxXmoEMypyvna5+c/AoGBAMJE\nBInc8+7+qUCBEgIltjAgLvk6GRldE3E02IxDhezfOCszWTrJtXifq5zOaoTlfZRi\nIUYfWidbaQlvd5inl6TOxTwS7yFieiL6SC4U89UTURsldi3FL2TIsKjbKdl5vrvn\naRcUhNBoL/M9lRH7tZ6QNTGtNTm1ctgU8AeNQSMTAoGAHk8HRXIqM+Bal54G4cep\neE6SF9KYc1HHk01vnN+eFEUufmbJ//x36qX5mizULp/3ObX9BlVxBaFvjgfn5PfU\nGRgXB5GSN9ifukE99AhtHkiD2jjysLJtPp0mLvUxLWbhpwc6gbgnarx4bHIv0gP+\nepTilVjuff9N4/F1rYRfIz8CgYAu9MPoEuk/bny4o7oXnMfx0AWqpjlk4ROO/IgP\nN08K11W7U3kQ9aqQkn+nslka8GGvWRzT10YyVy0HY9MTqgbEhlo0UBtPBX+iLr79\nrIDXkwi6uA5dt9jh0oSo+/icoYnR33iOZJ5JxbU5ZTxAEYhv4EmLTWOdJFezFTSD\njsgc0wKBgHqueu+LbPXHBK9SetZfJJ0hjYAH+x8VQj0SHIhbVSh9G97dLzYtN+QN\nc6gsJbHkt4g34QDdio01iODkHwjfOTw2mMRTSfoXsw2DWErbwxJheAr5fmcYw9mp\nnb19+V/jCD6q7ZH1VVJG5af7V8KFP9W59L2tr1b5BqkjmR8RJfQK\n-----END RSA PRIVATE KEY-----"
- JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArShR7vW2d04TnxjAf3h1\n5hgvq3PDbo4HazJO9wBI8r+LCtsHTL+jGVQNBZaY2mYzSz2p4530rDDURaicuMP8\nZk/83SStps4qZvw0a0ZLpfYNMoWIS0t0c084Ft4EKXN0NZufkJ2M0XMQHUiHvcw5\nbjezWuALFEs4unq/ULhu5rn58HCQFPkGct6S9I+qckp1D3v2irn/IG1RBM4DQ03J\nqdhUdzAxa3eMnpeYRcKJWdD7GWNO2tRkehfEiVNtccmhBPy7iHc8MoKi4h+NVfh/\nrtmCh2oCqGlRm0B+dvXPi1fXeaD6bnEa+2kXpFpKpMzdAA58EaPyVXosautxXdLG\nrQIDAQAB\n-----END PUBLIC KEY-----"

**Obs**: As chaves públicas e privadas estão no readme porque o dotenv tem um problema na hora de fazer o parse das chaves e acaba considerando as identações como parte da chave e isso causa alguns problemas.
---

## API
Para realizar testes e documentar a API, foi usado a ferramenta [Postman](https://www.postman.com/)
Na pasta docs estão os arquivos com as variáveis de ambiente e os endpoints configurados para testes rápidos.

## Testes
Para realizar testes unitários, foi utilizado a biblioteca [Jest](https://www.npmjs.com/package/jest).
Para facilitar a execução dos testes sem interferir no banco que está no MongoDB Atlas, foi adicionado uma imagem docker para execução dos testes.

### Docker
  - Instalar o [Docker](https://docs.docker.com/get-docker/)
  - Executar o comando `docker pull mongo:4.2.2` para baixar a imagem com o mongoDB
  - Executar o comando `docker-compose up` para subir a instância definida no docker-compose.yml

### Considerações sobre os requisitos desejáveis
• JWT como token
  - Optei por utilizar o JWT RS256 em vez do HS256 para assinar o token
  - As chaves pública e privada estão em `config/jwt`
• Testes unitários
  - É necessário estar com o docker do mongo rodando ao executar os testes


