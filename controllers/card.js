/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-promise-reject-errors */

const Card = require('../models/card');
const E = require('../errors');

const getAllCards = (req, res) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE));
};

const deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => card.owner.equals(req.user._id))
    .then((match) => {
      console.log(match);
      if (!match) {
        return Promise.reject(new Error());
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.send({ data: card }))
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

const createCard = (req, res) => {
  const body = { ...req.body, owner: req.user._id };
  Card.create(body)
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      err.name === 'ValidationError'
        ? res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE)
        : res.status(E.DEFAULT_ERROR_CODE).send(E.DEFAULT_ERROR_MESSAGE);
    });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
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

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
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

module.exports = {
  getAllCards, deleteCardById, createCard, addLike, removeLike,
};
