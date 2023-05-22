const usersRouter = require('express').Router();
const User = require('../models/user');
const userController = require('../controllers/user');

const VALIDATION_ERROR_CODE = 400;
const VALIDATION_ERROR_MESSAGE = { message: `переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля`};

const regexp = new RegExp(/[0-9a-z]{24}/);

const checkId = (req, res, next) => {
  if (!regexp.test(req.params.id)) {
    res.status(VALIDATION_ERROR_CODE).send(VALIDATION_ERROR_MESSAGE);
    return;
  }

  next();
};

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id', checkId);
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userController.createUser);
usersRouter.patch('/me', userController.updateProfile);
usersRouter.patch('/me/avatar', userController.updateAvatar);

module.exports = usersRouter;