class APIResponse {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data || {};
  }

  getCode() {
    return this.code;
  }

  getMessage() {
    return this.message;
  }

  getData() {
    return this.data;
  }

  send(res) {
    return res.status(this.code).json(this);
  }
}

module.exports = {
  APIResponse,
};
