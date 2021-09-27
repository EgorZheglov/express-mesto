/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
