/* eslint-disable linebreak-style */
module.exports = class AlreadyRegistredError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
};
