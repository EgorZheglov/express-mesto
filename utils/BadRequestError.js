/* eslint-disable linebreak-style */
module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
};
