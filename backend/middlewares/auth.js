const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const forbiddenError = new ForbiddenError('Запрос перенаправлен.');
const unauthorizedError = new UnauthorizedError('Необходима авторизация.');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(forbiddenError);
  }

  const token = authorization.replace('Bearer ', '');
  let playload;

  try {
    playload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(unauthorizedError);
  }

  req.user = playload;

  next();
};
