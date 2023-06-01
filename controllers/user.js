/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-promise-reject-errors */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const E = require('../errors');

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
      return user;
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE));
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE));
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE);
        return;
      }
      err.name === 'CastError'
        ? res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE);
        return;
      }
      err.name === 'CastError'
        ? res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const userData = {
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      };
      return User.create(userData);
    })
    .then((data) => res.status(201).send({ data }))
    .catch((err) => {
      err.name === 'ValidationError'
        ? res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
};

const updateProfile = (req, res) => {
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
      throw new Error('NotFound');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE);
        return;
      }
      err.name === 'CastError' || err.name === 'ValidationError'
        ? res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
};

const updateAvatar = (req, res) => {
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
      throw new Error('NotFound');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE);
        return;
      }
      err.name === 'CastError' || err.name === 'ValidationError'
        ? res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
};

module.exports = {
  login, getAllUsers, getCurrentUser, getUserById, createUser, updateProfile, updateAvatar,
};
