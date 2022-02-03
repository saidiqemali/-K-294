const chai = require('chai');
var expect = chai.expect;
const sinon = require('sinon');
let app = require('../../api');

// Taken from Alexandr Lazarev
// https://stackoverflow.com/questions/31997358/testing-express-middleware-usage-with-mocha-and-sinon-chai
function isMiddlewareSet(app, middlewareName) {
  var _return = false;
  app._router.stack.filter(function (layer) {
    if (layer.handle.name == middlewareName) {
      _return = true;
    }
  });
  return _return;
}

describe('Connected middlewares', function () {
  it('should use "errorHandler" middleware in dev env', function () {
    app.get = sinon.stub().returns('development');
    expect(isMiddlewareSet(app, 'errorHandler')).to.equal(true);
  });
  it('should use "cors" middleware', function () {
    expect(isMiddlewareSet(app, 'corsMiddleware')).to.equal(true);
  });

  it('should use "morgan" middleware logger', function () {
    expect(isMiddlewareSet(app, 'logger')).to.equal(true);
  });

  it('should use "jsonParser" middleware', function () {
    expect(isMiddlewareSet(app, 'jsonParser')).to.equal(true);
  });

  it('should use "OpenApiValidator" middleware', function () {
    expect(isMiddlewareSet(app, 'pathParamsMiddleware')).to.equal(true);
    expect(isMiddlewareSet(app, 'metadataMiddleware')).to.equal(true);
    expect(isMiddlewareSet(app, 'multipartMiddleware')).to.equal(true);
    expect(isMiddlewareSet(app, 'securityMiddleware')).to.equal(true);
    expect(isMiddlewareSet(app, 'requestMiddleware')).to.equal(true);
    expect(isMiddlewareSet(app, 'responseMiddleware')).to.equal(true);
    expect(isMiddlewareSet(app, 'operationHandlersMiddleware')).to.equal(true);
  });
});
