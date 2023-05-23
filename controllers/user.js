/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-promise-reject-errors */

const User = require('../models/user');
const E = require('../errors');

const getAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE));
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
  User.create(req.body)
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

  if (req.body.name) { newData.avatar = req.body.avatar; }

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
  getAllUsers, getUserById, createUser, updateProfile, updateAvatar,
};
