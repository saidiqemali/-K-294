const { validationResult } = require('express-validator');
// const logger = require('../utils/logger');
const { BadRequest } = require('../utils/errors');
const storage = require('../utils/db');

// Extract errors from validation result
const validationErrors = (req) => {
  const messages = [];
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array();
    for (const i of errors) {
      // rewrite error message
      messages.push(i.msg);
    }
  }
  return messages.join();
};

const validateRequest = (req, res, next) => {
  const messages = validationErrors(req);
  if (messages.length <= 0) {
    return next();
  }
  const err = new BadRequest('BadRequest');
  return res.status(err.getCode()).json({
    code: err.getCode(),
    message: err.getUserFriendlyMessage(),
    data: {
      errors: messages,
    },
  });
};

// Define schema to register a new user
const registerValidatorSchema = {
  // Returns: an array of validation chains and { run: (req) => Promise<unknown[]> }
  password: {
    isLength: {
      errorMessage: 'Password should be at least 6 chars long',
      options: { min: 6 },
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Please enter a valid email address',
      bail: true,
    },
    custom: {
      options: (value) => {
        return storage.db.users.unique(value).then((user) => {
          if (user) {
            throw new Error('Email is already in use!');
          }
          // Indicates the success of this synchronous custom validator
          return true;
        });
      },
    },
  },
};

module.exports = {
  validationErrors,
  validateRequest,
  registerValidatorSchema,
};
