const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then(data => res.status(200).send({ data: data }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

const createCard = (req, res) => {
  const body = {...req.body, ["owner"]:req.user._id};
  Card.create(body)
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports = {getAllCards, deleteCardById, createCard, addLike, removeLike};