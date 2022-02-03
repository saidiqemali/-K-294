var assert = require('assert');
var expect = require('chai').expect;
var request = require('supertest');
const { generateAccessToken } = require('../../middleware/auth-handler');
const storage = require('../../utils/db');
var app = require('../../api');

let defaultEmail = 'hugo@m295.local.zli.ch';
// let defaultPassword = 'Zli123';
let uid = 'd5e30d8f-a59d-45f3-b9ea-01e742163ff5';

let user = {
  id: uid,
  email: defaultEmail,
  token: generateAccessToken(defaultEmail, uid),
};
let task = {
  owner: uid,
  description: 'This is a test task for unit testing of endpoints.',
};

describe('API /tasks after authentification', function () {
  before(function (done) {
    storage.db.tasks.id().then(function (response) {
      task = Object.assign(task, response);
      storage.db.tasks.add(task.id, task.owner, task.description).then(function () {
        done(); // It is now guaranteed to finish before 'it' starts.
      });
    });
  });
  it('GET /tasks returns the array of user tasks', function (done) {
    request(app)
      .get('/v1/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + user.token)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        // console.log(response);
        expect(response.body.data).to.be.an('array');
      })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });
  it('POST /tasks Create a new personal task', function (done) {
    let description = 'Hello from endpoint POST /tasks';
    request(app)
      .post('/v1/tasks')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + user.token)
      .send({ owner: task.owner, description: description })
      .expect('Content-Type', /json/)
      .expect(function (response) {
        assert.strictEqual(response.body.data.id.length, 36);
        assert.strictEqual(response.body.data.description, description);
      })
      .expect(201)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });
  it('GET /tasks/{uuid} returns the user tasks for given id', function (done) {
    request(app)
      .get('/v1/tasks/' + task.id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + user.token)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        assert.strictEqual(response.body.data.id, task.id);
        assert.strictEqual(response.body.data.owner, task.owner);
        assert.strictEqual(response.body.data.id.length, 36);
      })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });
  it('POST /tasks/{uuid} returns the updated user tasks for given id', function (done) {
    let description = 'Bye Bye from endpoint POST /tasks';
    request(app)
      .post('/v1/tasks/' + task.id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + user.token)
      .send({ owner: task.owner, description: description })
      .expect('Content-Type', /json/)
      .expect(function () {
        storage.db.tasks.get(task.id, user.id).then(function (response) {
          expect(response.description).to.equal(description);
        });
      })
      .expect(201)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });
  it('DELETE /tasks/{uuid} returns empty data for given id', function (done) {
    request(app)
      .delete('/v1/tasks/' + task.id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + user.token)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        expect(response.body.message).to.equal('Task deleted');
        expect(response.body.data).to.be.an('object');
      })
      .expect(201)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });
});
