/* eslint-disable linebreak-style */
module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
};
