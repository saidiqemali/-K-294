var assert = require('assert');
var expect = require('chai').expect;
var { APIResponse } = require('../../utils/response');

describe('Testing API Response Class', function () {
  describe('Instance with data', function () {
    let data = { id: 123, message: 'Test' };
    let response = new APIResponse(200, 'OK', data);
    it(`getCode should be equal 200`, function () {
      assert.strictEqual(response.getCode(), 200);
    });
    it(`getMessage should be equal OK`, function () {
      assert.strictEqual(response.getMessage(), 'OK');
    });
    it(`getData should return an object`, function () {
      expect(response.getData()).to.be.an('Object');
    });
    it(`Data should contain an id with given value`, function () {
      let data = response.getData();
      assert.strictEqual(data.id, 123);
    });
  });
  describe('Instance without data', function () {
    let response = new APIResponse(200, 'OK');
    it(`getData should return an object`, function () {
      expect(response.getData()).to.be.an('Object');
    });
  });
});
