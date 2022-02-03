const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');

const { BadRequest } = require('../../utils/errors');
const storage = require('../../utils/db');
const app = require('../../api');

let sandbox = sinon.createSandbox();

describe('API /uuid', function () {
  describe('GET /v1/uuid', function () {
    it('Should responds with Code 200 and a 36 chars uuid', function (done) {
      request(app)
        .get('/v1/uuid')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log(res.body.data);
          assert.strictEqual(res.body.data.id.length, 36);
        })
        .expect(200)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('Exception on GET /v1/uuid', function () {
    beforeEach(function () {
      // sandbox.stub(storage.db.users, 'id').rejects(new BadRequest());
      sandbox.stub(storage.db.users, 'id').rejects(new Error());
    });
    afterEach(function () {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });
    it('Should respond with GeneralError', function (done) {
      request(app)
        .get('/v1/uuid')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
  });
});
