const cardsRouter = require('express').Router();
const Card = require('../models/card');
const cardController = require('../controllers/card');

cardsRouter.get('/', cardController.getAllCards);
cardsRouter.get('/:cardId', cardController.deleteCardById);
cardsRouter.post('/', cardController.createCard);
cardsRouter.put('/:cardId/likes', cardController.addLike);
cardsRouter.delete('/:cardId/likes', cardController.removeLike);

/*cardsRouter.get('/cards', (req, res) => {
  Card.find({})
    .then(data => res.send({ cards: data }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

cardsRouter.post('/cards', (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

cardsRouter.put('/cards/:cardId/likes', (req, res) => {
  Card.find({_id})
  if (!Card[likes].includes(req.params.cardId))
    Card.findByIdAndUpdate(req.params.cardId,
      {
        avatar : avatar
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      })
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

cardsRouter.delete('/cards/:cardId', (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});*/

module.exports = cardsRouter;