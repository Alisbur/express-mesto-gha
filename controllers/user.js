const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then(data => res.status(200).send({ data: data }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(data => res.status(200).send({ data: data }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

const createUser = (req, res) => {
  User.create(req.body)
    .then(data => res.status(201).send({ data: data }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

const updateProfile = (req, res) => {
  const newData = req.body;

  if(req.body.name)
    newData["name"] = req.body.name;
  if(req.body.about)
    newData["about"] = req.body.about;

  User.findByIdAndUpdate(
    req.user._id,
    newData,
    {
        new: true,
        runValidators: true,
        upsert: true
    })
    .then(data => res.status(201).send({ data: data }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

const updateAvatar = (req, res) => {
  const newData = req.body;

  if(req.body.name)
    newData["avatar"] = req.body.avatar;

  User.findByIdAndUpdate(
    req.user._id,
    newData,
    {
        new: true,
        runValidators: true,
        upsert: true
    })
    .then(data => res.status(201).send({ data: data }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

module.exports = {getAllUsers, getUserById, createUser, updateProfile, updateAvatar};