/* eslint-disable linebreak-style */
module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
};
