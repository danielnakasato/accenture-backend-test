const request = require("supertest");
const app = require("../../../app");
const User = require('./user.model');

describe("Test user functions", () => {

  beforeAll(async () => {
    await User.deleteMany({});
  });

  let userToTest = {}; // User created to test token

  test("It should create an User and validate if returning fields exists", done => {
    request(app)
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
      .then(res => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('data_criacao');
        expect(res.body).toHaveProperty('data_atualizacao');
        expect(res.body).toHaveProperty('ultimo_login');
        expect(res.body).toHaveProperty('token');
        userToTest = res.body;
        done();
      });
  });

  test("It should return code 401 and 'Sessão inválida' for fake token", done => {
    request(app)
      .get(`/user/${userToTest.id}`)
      .set({
        'Content-Type': 'application/json',
        'Authorization': `Bearer mockfaketoken`
      })
      .then(res => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('mensagem');
        done();
      });
  });

  test("It should return code 401 and 'Sessão inválida' for invalid token", done => {
    request(app)
      .get(`/user/${userToTest.id}`)
      .set({
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbG1uYWthc2F0b0BnbWFpbC5jb20iLCJpYXQiOjE2MDIzNzEzMjksImV4cCI6MTYwMjM3MzEyOX0.Wa9o_V5H9yhHcad55BLrz-nk4YHBs-YSyOVbRqbQBl2-OAQJCOofdmpBWtq0A27yP1WH7c85vSfLLzAgtidh-xeacs2jV2Zp_zb4IfTWYInPy-gLXVJ6GcliDXBX7LBVzJaiH1TT7Q-mzR4zsYmDONugvKXWzShWCkpRGKN4H7n1nDKrO4k-HmjQSzd0fGo8a3ZHMT51ffEuGn72BRs6NT4u8MLhzm3xEnOMll9vVYS5cBxcIdn2IKRGbcDCvT-DddJl8x2LTnrMKVh8RR3sPtHqdbwDYPx3hYCIGkQdWqH1aqDjV7UEDjrQxZOC8cUOMOihftK0llkfgexLqOxZLQ`
      }) // This authorization token was created for the same email a long time ago.
      .then(res => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('mensagem');
        done();
      });
  });

  test("It should return user info when requested with a valid token", done => {
    request(app)
      .get(`/user/${userToTest.id}`)
      .set({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToTest.token}`
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data_criacao');
        expect(res.body).toHaveProperty('data_atualizacao');
        expect(res.body).toHaveProperty('ultimo_login');
        expect(res.body).toHaveProperty('token');
        done();
      });
  });
});

