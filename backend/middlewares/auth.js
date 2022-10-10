const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const User = require('../models/user');

const authorization = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies.jwt, 'some-secret-key');
    User.findOne({ _id: payload._id });
    req.user = payload;
  } catch (err) {
    next(new AuthError('Необходима авторизация.'));
  }
  return next();
};

module.exports = {
  authorization,
};
