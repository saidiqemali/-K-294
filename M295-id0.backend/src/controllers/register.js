const { APIResponse } = require('../utils/response');
const storage = require('../utils/db'); // your db module
const { checkSchema } = require('express-validator');
const {
  validateRequest,
  registerValidatorSchema,
} = require('../middleware/input-validate');

function register(req, res) {
  checkSchema(registerValidatorSchema)
    .run(req)
    .then(() => {
      validateRequest(req, res, function () {
        storage.db.users.id().then((response) => {
          req.body.id = response.id;
          storage.db.users.hash(req.body.password).then((response) => {
            req.body.hash = response.hash;
            storage.db.users
              .add(req.body.id, req.body.email, req.body.hash)
              .then((response) => {
                const data = { email: req.body.email, id: response };
                const pong = new APIResponse(200, 'Registration done!', data);
                return res.status(pong.code).json(pong);
              });
          });
        });
      });
    });
}

module.exports = {
  register,
};
