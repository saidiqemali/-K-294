var assert = require('assert');
// var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../api');

describe('API /healthcheck', function () {
  describe('GET /v1/healthcheck', function () {
    it('responds with JSON', function (done) {
      request(app)
        .get('/v1/healthcheck')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err) {
          if (err) done(err);
          done();
        });
    });
    it('responds with uptime greater 0', function (done) {
      request(app)
        .get('/v1/healthcheck')
        .set('Accept', 'application/json')
        .expect(function (res) {
          assert(res.body.code, 200);
          assert.notStrictEqual(res.body.data.uptime, 0);
          assert(res.body.message, 'All well with me, thank you for asking.');
        })
        .expect(200)
        .end(function (err) {
          if (err) done(err);
          done();
        });
    });
  });
});
