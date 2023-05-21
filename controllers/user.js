const User = require('../models/user');

const VALIDATION_ERROR_CODE = 400;
const VALIDATION_ERROR_MESSAGE = { message: `переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля`};
const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_ERROR_MESSAGE = { message: `карточка или пользователь не найден`};
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = { message: `ошибка по-умолчанию`};

const getAllUsers = (req, res) => {
  User.find({})
    .then(data => res.status(200).send({ data: data }))
    .catch(err => res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE));
}

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(data => res.status(200).send({ data: data }))
    .catch(err => {
      err.name==="CastError"
        ? res.status(NOT_FOUND_ERROR_CODE).send(NOT_FOUND_ERROR_MESSAGE)
        : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE);
    });
}

const createUser = (req, res) => {
  User.create(req.body)
    .then(data => res.status(201).send({ data: data }))
    .catch(err => {
      err.name==="ValidationError"
        ? res.status(VALIDATION_ERROR_CODE).send(VALIDATION_ERROR_MESSAGE)
        : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE);
    });
}

const updateProfile = (req, res) => {
  const newData = req.body;

  if(req.body.name)
    newData["name"] = req.body.name;
  if(req.body.about)
    newData["about"] = req.body.about;

  User.findByIdAndUpdate(
    req.user._id,
    newData,
    {
        new: true,
        runValidators: true,
        upsert: true
    })
    .then(data => res.status(201).send({ data: data }))
    .catch(err =>
      err.name==="CastError"
        ? res.status(NOT_FOUND_ERROR_CODE).send(NOT_FOUND_ERROR_MESSAGE)
        : err.name==="ValidationError"
          ? res.status(VALIDATION_ERROR_CODE).send(VALIDATION_ERROR_MESSAGE)
          : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE));
}

const updateAvatar = (req, res) => {
  const newData = req.body;

  if(req.body.name)
    newData["avatar"] = req.body.avatar;

  User.findByIdAndUpdate(
    req.user._id,
    newData,
    {
        new: true,
        runValidators: true,
        upsert: true
    })
    .then(data => res.status(201).send({ data: data }))
    .catch(err =>
      err.name==="CastError"
        ? res.status(NOT_FOUND_ERROR_CODE).send(NOT_FOUND_ERROR_MESSAGE)
        : err.name==="ValidationError"
          ? res.status(VALIDATION_ERROR_CODE).send(VALIDATION_ERROR_MESSAGE)
          : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE));
}

module.exports = {getAllUsers, getUserById, createUser, updateProfile, updateAvatar};