const jwt = require('jsonwebtoken');
const E = require('../errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(E.AUTH_ERROR_CODE)
      .send(E.AUTH_ERROR_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return res
      .status(E.AUTH_ERROR_CODE)
      .send(E.AUTH_ERROR_MESSAGE);
  }

  req.user = payload;

  next();
};
