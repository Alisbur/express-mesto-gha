const Card = require('../models/card');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => card.owner.equals(req.user._id))
    .then((match) => {
      if (!match) {
        throw new Error();
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      next(err);
    });
};

const createCard = (req, res, next) => {
  const body = { ...req.body, owner: req.user._id };
  Card.create(body)
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      next(err);
    });
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      next(err);
    });
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      next(err);
    });
};

module.exports = {
  getAllCards, deleteCardById, createCard, addLike, removeLike,
};
