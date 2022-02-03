const { APIResponse } = require('../utils/response');

function healthcheck(req, res) {
  const data = {
    uptime: process.uptime(),
    date: new Date(),
  };
  const pong = new APIResponse(
    200,
    'All well with me, thanks for asking.',
    data,
  );
  return res.status(pong.code).json(pong);
}

module.exports = {
  healthcheck,
};
