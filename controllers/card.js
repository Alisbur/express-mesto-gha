const Card = require('../models/card');

const VALIDATION_ERROR_CODE = 400;
const VALIDATION_ERROR_MESSAGE = { message: `переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля`};
const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_ERROR_MESSAGE = { message: `карточка или пользователь не найден`};
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = { message: `ошибка по-умолчанию`};

const getAllCards = (req, res) => {
  Card.find({})
    .then(data => res.status(200).send({ data: data }))
    .catch(err => res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE));
}

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(data => {
      if(!data) return Promise.reject({name:"CastError"})
      else return data;
    })
    .then(card => res.status(200).send({ data: card }))
    .catch(err => {
      err.name==="CastError"
        ? res.status(NOT_FOUND_ERROR_CODE).send(NOT_FOUND_ERROR_MESSAGE)
        : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE);
    });
}

const createCard = (req, res) => {
  const body = {...req.body, ["owner"]:req.user._id};
  Card.create(body)
    .then(card => res.status(201).send({ data: card }))
    .catch(err => {
      err.name==="ValidationError"
        ? res.status(VALIDATION_ERROR_CODE).send(VALIDATION_ERROR_MESSAGE)
        : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE);
    });
}

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then(data => {
      if(!data) return Promise.reject({name:"CastError"})
      else return data;
    })
    .then(card => res.status(200).send({ data: card }))
    .catch(err => {
      err.name==="CastError"
        ? res.status(NOT_FOUND_ERROR_CODE).send(NOT_FOUND_ERROR_MESSAGE)
        : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE);
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then(data => {
      if(!data) return Promise.reject({name:"CastError"})
      else return data;
    })
    .then(card => res.status(200).send({ data: card }))
    .catch(err => {
      console.log(err.name);
      err.name==="CastError"
        ? res.status(NOT_FOUND_ERROR_CODE).send(NOT_FOUND_ERROR_MESSAGE)
        : res.status(DEFAULT_ERROR_CODE).send(DEFAULT_ERROR_MESSAGE);
    });
};

module.exports = {getAllCards, deleteCardById, createCard, addLike, removeLike};