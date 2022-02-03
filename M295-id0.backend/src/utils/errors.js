const { APIResponse } = require('./response');

class GeneralError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name; // good practice
    this.code = this.getCode();
    this.message = this.getUserFriendlyMessage();
  }

  getCode() {
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof Forbidden) {
      return 403;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    if (this instanceof BadRequest) {
      return 400;
    }
    return 500;
  }

  getUserFriendlyMessage() {
    if (this instanceof NotFound) {
      return "I didn't found what you requested.";
    }
    if (this instanceof Forbidden) {
      return 'I think you are not authorized for this kind of request!';
    }
    if (this instanceof Unauthorized) {
      return "I don't know who you are. Bye Bye!";
    }
    if (this instanceof BadRequest) {
      return "I can't process your request.";
    }
    return 'I will not answer your request!';
  }

  send(res) {
    const pong = new APIResponse(
      this.getCode(),
      this.getUserFriendlyMessage(),
      {},
    );
    return pong.send(res);
  }
}

class NotFound extends GeneralError {}
class Forbidden extends GeneralError {}
class BadRequest extends GeneralError {}
class Unauthorized extends GeneralError {}

module.exports = {
  GeneralError,
  NotFound,
  Forbidden,
  Unauthorized,
  BadRequest,
};
