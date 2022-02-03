var request = require('supertest');
var app = require('../../api');

describe('API /unauthorized', function () {
  describe('GET /v1/unauthorized', function () {
    it('Should responds with Code 401', function (done) {
      request(app)
        .get('/v1/unauthorized')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err) {
          if (err) return done(err);
          return done();
        });
    });
  });
});
