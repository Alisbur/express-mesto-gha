const cardsRouter = require('express').Router();
const Card = require('../models/card');
const cardController = require('../controllers/card');

const VALIDATION_ERROR_CODE = 400;
const VALIDATION_ERROR_MESSAGE = { message: `переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля`};

const regexp = new RegExp(/[0-9a-z]{24}/);

const checkId = (req, res, next) => {
  if (!regexp.test(req.params.cardId)) {
    res.status(VALIDATION_ERROR_CODE).send(VALIDATION_ERROR_MESSAGE);
    return;
  }

  next();
};

cardsRouter.get('/', cardController.getAllCards);
cardsRouter.delete('/:cardId', cardController.deleteCardById);
cardsRouter.post('/', cardController.createCard);
cardsRouter.put('/:cardId/likes', cardController.addLike);
cardsRouter.delete('/:cardId/likes', cardController.removeLike);

module.exports = cardsRouter;