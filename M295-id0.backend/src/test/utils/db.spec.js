const storage = require('../../utils/db');
const assert = require('assert');
// const sinon = require('sinon');
const expect = require('chai').expect;

describe('Testing database storage', function () {
  it(`Should respond with version 9.6.2`, function () {
    return storage.db.getVersion().then((result) => {
      assert.equal(result, '9.6.2');
    });
  });
  it('Rejects promises when there is a query error', function () {
    // let dbMock = sinon.mock(db);
    return storage.db
      .none('SELECT gen_random_uuid() AS UUID;')
      .catch((error) => {
        expect(error).to.be.an.instanceof(storage.pgp.errors.QueryResultError);
      });
  });
});
