const assert = require('assert');
const logger = require('../../utils/logger');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../api');
const storage = require('../../utils/db');
// let authHandler = require('../../middleware/auth-handler');

let sandbox = sinon.createSandbox();

// let uuid = '';
let invalidEmail = 'InvalidUser@local.zli.ch';
let validEmail = 'hugo@m295.local.zli.ch';
let defaultPassword = 'Zli123';

describe('API /authenticate', function () {
  describe('GET /v1/authenticate', function () {
    it('GET /authenticate responds with 500', function (done) {
      request(app)
        .get('/v1/authenticate')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(405) // Method Not Allowed
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('POST /v1/authenticate', function () {
    it('POST /authenticate with wrong credentials responds with 401', function (done) {
      request(app)
        .post('/v1/authenticate')
        .set('Accept', 'application/json')
        .send({ email: invalidEmail, password: 'unknow' })
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
    it('POST /authenticate with valid credentials responds with 200 and a UUID + token', function (done) {
      request(app)
        .post('/v1/authenticate')
        .set('Accept', 'application/json')
        .send({ email: validEmail, password: defaultPassword })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res) {
          logger.error(res.body.data);
          assert.strictEqual(res.body.data.id.length, 36);
          assert.notStrictEqual(res.body.data.token, undefined);
        })
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('Exception on POST /v1/authenticate', function () {
    beforeEach(function () {
      // sandbox.stub(storage.db.users, 'verify').rejects(new Unauthorized());
      sandbox
        .stub(storage.db.users, 'verify')
        .rejects(new Error('Forced exception throw'));
      // authHandler.verifyCredentials = sandbox.fake.rejects(new Unauthorized());
    });
    afterEach(function () {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });
    it('Should respond with Unathorized', function (done) {
      request(app)
        .post('/v1/authenticate')
        .set('Accept', 'application/json')
        .send({ email: invalidEmail, password: 'unknow' })
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
  });
});
