const cardsRouter = require('express').Router();
const cardController = require('../controllers/card');

cardsRouter.get('/', cardController.getAllCards);
cardsRouter.delete('/:cardId', cardController.deleteCardById);
cardsRouter.post('/', cardController.createCard);
cardsRouter.put('/:cardId/likes', cardController.addLike);
cardsRouter.delete('/:cardId/likes', cardController.removeLike);

module.exports = cardsRouter;
