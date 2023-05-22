const usersRouter = require('express').Router();
const userController = require('../controllers/user');

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userController.createUser);
usersRouter.patch('/me', userController.updateProfile);
usersRouter.patch('/me/avatar', userController.updateAvatar);

module.exports = usersRouter;
