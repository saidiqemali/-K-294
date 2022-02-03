const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const storage = require('../utils/db');
const { Unauthorized, Forbidden } = require('../utils/errors');

function generateAccessToken(email, uid) {
  return jwt.sign(email + ',' + uid, process.env.TOKEN_SECRET);
}

// grab authentication token from req header
const grabAuthenticationToken = (req, res, next) => {
  if (req.headers['authorization']) {
    const headers = req.headers['authorization'];
    const bearer = headers.split(' ');
    req.token = bearer[1];
    return next();
  } else {
    const err = new Forbidden();
    return err.send(res);
  }
};

const verifyToken = (req, res, next) => {
  grabAuthenticationToken(req, res, () => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        logger.error('JWT Verification failed!');
        const err = new Unauthorized();
        return err.send(res);
      } else {
        logger.log('info', 'JWT Verification succeeded!');
        // logger.log('info', decoded);
        let user = decoded.split(',');
        // inject our params into request
        req.email = user[0];
        req.id = user[1];
        req.uid = user[1];
        next();
      }
    });
  });
};

const verifyCredentials = (req, res, next) => {
  // return (req, res, next) => {
  storage.db.users
    .verify(req.body.email, req.body.password)
    .then((response) => {
      // console.log(response);
      if (response !== null && response.email === req.body.email) {
        // generate a JWT token for the user with a secret key
        let userToken = generateAccessToken(response.email, response.id);
        // inject our params into request
        req.token = userToken;
        req.id = response.id;
        req.email = response.email;
        next();
      } else {
        // Invalid credentials
        const err = new Unauthorized();
        return err.send(res);
      }
    })
    .catch((error) => {
      logger.log('error', error.message || error);
      const err = new Unauthorized();
      return err.send(res);
    });
  // }
};

module.exports = {
  grabAuthenticationToken,
  generateAccessToken,
  verifyCredentials,
  verifyToken,
};
