const { APIResponse } = require('../utils/response');
const logger = require('../utils/logger');
const { BadRequest } = require('../utils/errors');
const storage = require('../utils/db');

function uuid(req, res) {
  //db.one("SELECT replace(gen_random_uuid()::text, '-', '') AS UUID;")
  storage.db.users
    .id()
    .then((result) => {
      const pong = new APIResponse(200, 'A random UUID', result);
      return pong.send(res);
    })
    .catch((error) => {
      logger.log('error', error);
      const err = new BadRequest();
      return err.send(res);
    });
}

module.exports = {
  uuid,
};
