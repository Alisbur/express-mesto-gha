const Card = require('../models/card');
const E = require('../errors');

const getAllCards = (req, res) => {
  Card.find({})
    .then(data => res.status(200).send({ data: data }))
    .catch(err => res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE));
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
        ? res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
}

const createCard = (req, res) => {
  const body = {...req.body, ["owner"]:req.user._id};
  Card.create(body)
    .then(card => res.status(201).send({ data: card }))
    .catch(err => {
      err.name==="ValidationError"
        ? res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
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
        ? res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
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
        ? res.status(E.NOT_FOUND_ERROR_CODE).send(E.NOT_FOUND_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
};

module.exports = {getAllCards, deleteCardById, createCard, addLike, removeLike};