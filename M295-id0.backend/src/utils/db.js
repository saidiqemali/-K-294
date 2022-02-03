require('dotenv').config();
const logger = require('./logger');
const Users = require('../models/users');
const Tasks = require('../models/tasks');

// Make the properties configurable by disabling locks
// This allows sinon to replace the properties
let noLocking = false;
if (process.env.NODE_ENV !== 'development') {
  noLocking = true;
}

const options = {
  noLocking: noLocking,
  extend(obj) {
    obj.getVersion = async () => {
      return obj.connect().then((link) => {
        return link.client.serverVersion;
      });
    };
    obj.users = new Users(obj, pgp);
    obj.tasks = new Tasks(obj, pgp);
  },
  query(e) {
    logger.log('info', e.query);
  },
  error: (err) => {
    // The error applies to the result from the following methods: none, one, oneOrNone and many.
    if (err instanceof pgp.errors.QueryResultError) {
      logger.error('%s: %s. Query: %s.', err.name, err.message, err.query);
    }
  },
};

const pgp = require('pg-promise')(options);
// creates the object, but it does not try to connect
const db = pgp(process.env.DATABASE_CONNECTOR);

const Storage = {
  options,
  pgp,
  db,
};

module.exports = Storage;
