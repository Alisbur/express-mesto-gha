/* eslint-disable prefer-regex-literals */

const cardsRouter = require('express').Router();
const cardController = require('../controllers/card');
const E = require('../errors');

const regexp = new RegExp(/[0-9a-z]{24}/);

const checkId = (req, res, next) => {
  if (!regexp.test(req.params.cardId)) {
    res.status(E.VALIDATION_ERROR_CODE).send(E.VALIDATION_ERROR_MESSAGE);
    return;
  }

  next();
};

cardsRouter.get('/', cardController.getAllCards);
cardsRouter.delete('/:cardId', checkId);
cardsRouter.delete('/:cardId', cardController.deleteCardById);
cardsRouter.post('/', cardController.createCard);
cardsRouter.put('/:cardId/likes', checkId);
cardsRouter.put('/:cardId/likes', cardController.addLike);
cardsRouter.delete('/:cardId/likes', checkId);
cardsRouter.delete('/:cardId/likes', cardController.removeLike);

module.exports = cardsRouter;
