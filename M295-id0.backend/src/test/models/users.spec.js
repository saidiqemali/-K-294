var expect = require('chai').expect;
require('dotenv').config();
const storage = require('../../utils/db');
const logger = require('../../utils/logger');

let defaultDomain = '@m295.local.zli.ch';
let defaultPassword = 'Zli123';

const randomString = function () {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for (var ii = 0; ii < 7; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string;
};

describe('Users Model', function () {
  let data = {};
  before(async function () {
    let id = await storage.db.users.id();
    data = Object.assign(data, id);
    let hash = await storage.db.users.hash(defaultPassword);
    data = Object.assign(data, hash);
    data.email = randomString() + defaultDomain;
    let response = await storage.db.users.add(data.id, data.email, data.hash);
    // console.log(response);
    logger.debug(response);
  });

  it('uuid has 36 characters', function () {
    storage.db.users.id().then(function (response) {
      expect(response.id.length).to.equal(36);
    }); // no catch, it'll figure it out since the promise is rejected
  });
  describe('Add user', function () {
    it('created user has a valid uuid', function () {
      storage.db.users.get(data.id).then(function (response) {
        expect(response.id.length).to.equal(36);
      });
    });
    it('created user has correct email', function () {
      storage.db.users.get(data.id).then(function (response) {
        expect(response.email).to.equal(data.email);
      });
    });
    it('created user can be verified', function () {
      storage.db.users
        .verify(data.email, defaultPassword)
        .then(function (response) {
          expect(response.id.length).to.equal(36);
          expect(response.email).to.equal(data.email);
        });
    });
    it('created user email is unique', function () {
      storage.db.users.unique(data.email).then(function (response) {
        expect(response.email).to.equal(data.email);
      });
    });
  });
  it('Delete unit test user by uuid', function () {
    storage.db.users.remove(data.id).then(() => {
      storage.db.users.get(data.id).then(function (data) {
        expect(data.email).to.be.an('undefined');
      });
    });
  });
});
