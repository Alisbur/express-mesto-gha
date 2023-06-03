const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      }
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const userData = {
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      };
      return User.create(userData).select('-password');
    })
    .then((data) => res.status(201).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      }
      if (err.code === 11000) {
        next(new ConflictError());
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const newData = req.body;

  if (req.body.name) { newData.name = req.body.name; }
  if (req.body.about) { newData.about = req.body.about; }

  User.findByIdAndUpdate(
    req.user._id,
    newData,
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError());
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const newData = req.body;

  if (req.body.avatar) { newData.avatar = req.body.avatar; }

  User.findByIdAndUpdate(
    req.user._id,
    newData,
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError());
      }
      next(err);
    });
};

module.exports = {
  login, getAllUsers, getCurrentUser, getUserById, createUser, updateProfile, updateAvatar,
};
