/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  // Т.е в Postman в заголовках авторизации я всегда должен был писать Bearer?

  if (!token || !token.startsWith('Bearer ')) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token.replace('Bearer ', ''), 'secret');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
