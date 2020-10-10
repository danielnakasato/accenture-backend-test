const request = require("supertest");
const app = require("../../../app");
const User = require('../user/user.model');

describe("Test user authentication", () => {

  beforeAll(async () => {
    await User.deleteMany({});

    return request(app)
      .post("/user")
      .send({
        nome: 'daniel',
        email: 'danielmnakasato@gmail.com',
        senha: 'teste10',
        telefones: [
          {
            numero: '9983638384',
            ddd: '11'
          }
        ],
      })
  });

  test("It should login successfully and return user data", done => {
    request(app)
      .post("/auth")
      .send({
        email: 'danielmnakasato@gmail.com',
        senha: 'teste10',
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data_criacao');
        expect(res.body).toHaveProperty('data_atualizacao');
        expect(res.body).toHaveProperty('ultimo_login');
        expect(res.body).toHaveProperty('token');
        done();
      })
  });

  test("It should return code 401 for incorrect email/password", done => {
    request(app)
      .post("/auth")
      .send({
        email: 'danielmnakasatoerror@gmail.com',
        senha: 'teste10',
      })
      .then(res => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('mensagem');
        request(app)
          .post("/auth")
          .send({
            email: 'danielmnakasato@gmail.com',
            senha: 'teste10error',
          })
          .then(res => {
            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('mensagem');
            done();
          })
      })
  });
});

