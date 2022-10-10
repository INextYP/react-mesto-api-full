const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const User = require('../models/user');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
    User.findOne({ _id: payload._id });
  } catch (err) {
    next(new AuthError('Необходима авторизация.'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
