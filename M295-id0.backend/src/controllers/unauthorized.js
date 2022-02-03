// const { APIResponse } = require('../utils/response');
const { Unauthorized } = require('../utils/errors');
// const { APIResponse } = require('../utils/response');

function unauthorized(req, res) {
  const err = new Unauthorized();
  return err.send(res);
}

module.exports = {
  unauthorized,
};
