var assert = require('assert');
var expect = require('chai').expect;
var {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
  Forbidden,
} = require('../../utils/errors');

describe('Testing Friendly Errors', function () {
  describe('GeneralError', function () {
    let error = new GeneralError('GeneralError Error');
    it(`Should respond with code 500`, function () {
      assert.strictEqual(error.getCode(), 500);
    });
    it(`must report the right error`, function () {
      expect(error).to.be.an.instanceof(Error);
    });
    it(`Should respond with a friendly message`, function () {
      assert.strictEqual(
        error.getUserFriendlyMessage(),
        'I will not answer your request!',
      );
    });
  });

  describe('NotFound', function () {
    let error = new NotFound();
    it(`Should respond with code 404`, function () {
      assert.strictEqual(error.getCode(), 404);
    });
    it(`Should respond with a friendly message`, function () {
      assert.strictEqual(
        error.getUserFriendlyMessage(),
        "I didn't found what you requested.",
      );
    });
  });

  describe('BadRequest', function () {
    let error = new BadRequest();
    it(`Should respond with code 400`, function () {
      assert.strictEqual(error.getCode(), 400);
    });
    it(`Should respond with a friendly message`, function () {
      assert.strictEqual(
        error.getUserFriendlyMessage(),
        "I can't process your request.",
      );
    });
  });

  describe('Unauthorized', function () {
    let error = new Unauthorized();
    it(`Should respond with code 401`, function () {
      assert.strictEqual(error.getCode(), 401);
    });
    it(`Should respond with a friendly message`, function () {
      assert.strictEqual(
        error.getUserFriendlyMessage(),
        "I don't know who you are. Bye Bye!",
      );
    });
  });

  describe('Forbidden', function () {
    let error = new Forbidden('Forbidden Error');
    it(`Should respond with code 403`, function () {
      assert.strictEqual(error.getCode(), 403);
    });
    it(`Should respond with a friendly message`, function () {
      assert.strictEqual(
        error.getUserFriendlyMessage(),
        'I think you are not authorized for this kind of request!',
      );
    });
  });
});
