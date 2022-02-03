// const logger = require('../utils/logger');
const { verifyToken } = require('../middleware/auth-handler');
const { APIResponse } = require('../utils/response');
const { Unauthorized } = require('../utils/errors');

const verify = function (req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email) {
      const data = { email: req.email, token: req.token };
      const pong = new APIResponse(200, 'JWT Verification succeeded', data);
      return pong.send(res);
    } else {
      const err = new Unauthorized();
      return err.send(res);
    }
  });
};

module.exports = {
  verify,
};
