/* eslint-disable linebreak-style */
module.exports = class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
};
