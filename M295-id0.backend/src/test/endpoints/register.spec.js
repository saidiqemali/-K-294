var assert = require('assert');
var sinon = require('sinon');
// var expect = require('chai').expect;
// const logger = require('../utils/logger');
var request = require('supertest');
var app = require('../../api');
const storage = require('../../utils/db');

// let invalidEmail = 'InvalidUser@local.zli.ch';
let validEmail = 'hugo@m295.local.zli.ch';
let defaultPassword = 'Zli123';

function makeid() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 9; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

// let sandbox = sinon.createSandbox();

describe('API /register', function () {
  describe('POST /v1/register', function () {
    it('not matching the password policy responds with 400', function (done) {
      request(app)
        .post('/v1/register')
        .set('Accept', 'application/json')
        .send({ email: 'boss@nowhere.local.lan', password: 'pwd' })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err) {
          // console.log(res);
          if (err) return done(err);
          return done();
        });
    });
    it('using an invalid email responds with 400 and an error message', function (done) {
      request(app)
        .post('/v1/register')
        .set('Accept', 'application/json')
        .send({ email: 'noname', password: defaultPassword })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(function (res) {
          assert.strictEqual(
            res.body.data.errors,
            'Please enter a valid email address',
          );
        })
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
    it('using email not unique responds with 400 and an error message', function (done) {
      request(app)
        .post('/v1/register')
        .set('Accept', 'application/json')
        .send({ email: validEmail, password: defaultPassword })
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert.strictEqual(res.body.data.errors, 'Email is already in use!');
        })
        .expect(400)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
    it('using a unique email and strong password responds with 200 and a 36 chars uuid', function (done) {
      request(app)
        .post('/v1/register')
        .set('Accept', 'application/json')
        .send({ email: makeid() + validEmail, password: defaultPassword })
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert.strictEqual(res.body.data.id.length, 36);
        })
        .expect(200)
        .end(function (err, res) {
          storage.db.users.remove(res.body.data.id);
          if (err) return done(err);
          return done();
        });
    });
  });

  // describe('Stubbed POST /v1/register', function () {
  //   beforeEach(function () {
  //     sandbox.stub(storage.db.users, 'add').rejects(new Error());
  //   });
  //   afterEach(function () {
  //     // completely restore all fakes created through the sandbox
  //     sandbox.restore();
  //   });
  //   it('Should respond with a GeneralError', function (done) {
  //     request(app)
  //       .post('/v1/register')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(500)
  //       .end(function (err) {
  //         if (err) return done(err);
  //         return done();
  //       });
  //   });
  // });
});
