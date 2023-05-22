const usersRouter = require('express').Router();
const User = require('../models/user');
const userController = require('../controllers/user');

/*const doesIdExist = (req, res, next) => {
  if (!User[req.params._id]) {
    res.status(404).send(`MidleWare говорит Такого пользователя не существует`);
    return;
  }

  next();
};*/

usersRouter.get('/', userController.getAllUsers);
/*usersRouter.get('/:id', doesIdExist);*/
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userController.createUser);
usersRouter.patch('/me', userController.updateProfile);
usersRouter.patch('/me/avatar', userController.updateAvatar);

module.exports = usersRouter;