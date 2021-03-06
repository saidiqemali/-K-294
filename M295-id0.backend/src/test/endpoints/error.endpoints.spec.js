var request = require('supertest');
var app = require('../../api');

describe('API Response Errors', function () {
  describe('GET /', function () {
    it('responds with NotFound', function (done) {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
  });
});
