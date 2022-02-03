const express = require('express');
const path = require('path');
const logger = require('./utils/logger');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const OpenApiValidator = require('express-openapi-validator');

const errorHandler = require('./middleware/error-handler');
const { NotFound } = require('./utils/errors');

const OpenApiFile = path.join(__dirname, process.env.API_SPEC);

const app = express();

app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logFormat =
  ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(logFormat, { stream: logger.stream }));

// Add the openapi validator middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: OpenApiFile,
    validateRequests: true, // (default)
    validateResponses: true, // <-- to validate responses
    validateApiSpec: true, // <-- to validate the open api specification
    // validateSecurity: {
    //   handlers: {
    //     // bearerAuth: verifyToken(req, res)
    //   }
    // },
    // Don't want to manually map the OpenAPI endpoints to Express handler functions
    operationHandlers: path.join(__dirname, './controllers'),
  }),
);

app.use(errorHandler);

// Catch 404 non matching request from the client
app.use((req, res) => {
  let error = new NotFound();
  error.send(res);
});

// fail safe handler
app.use((error, req, res) => {
  res.status(500).send(error);
});

// Run the server
app.listen(process.env.API_PORT, () => {
  logger.info(
    'Server started and running on http://%s:%d',
    process.env.API_HOST,
    process.env.API_PORT,
  );
});

module.exports = app;
