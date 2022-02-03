var assert = require('assert');
// var expect = require('chai').expect;
// const logger = require('../utils/logger');
var request = require('supertest');
var app = require('../../api');

// let invalidEmail = 'InvalidUser@local.zli.ch';
let validEmail = 'hugo@m295.local.zli.ch';
let defaultPassword = 'Zli123';

describe('API /verify', function () {
  describe('GET /v1/verify', function () {
    it('GET /verify with unvalid token responds with 401', function (done) {
      request(app)
        .get('/v1/verify')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer test')
        //.set('Cookie', `token=${token}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
    it('GET /verify with valid token responds with 200 and user.email', function (done) {
      request(app)
        .post('/v1/authenticate')
        .set('Accept', 'application/json')
        .send({ email: validEmail, password: defaultPassword })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function (res) {
          request(app)
            .get('/v1/verify')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + res.body.data.token)
            .expect('Content-Type', /json/)
            .expect(function (res) {
              assert.strictEqual(res.body.data.email, validEmail);
            })
            .expect(200)
            .end(function (err) {
              if (err) return done(err);
              return done();
            });
        });
    });
  });
});
