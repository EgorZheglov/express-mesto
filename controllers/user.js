/* eslint-disable linebreak-style */
const User = require('../models/user');

const updateAvatar = (req, res) => User.findByIdAndUpdate(
  req.user.id,
  { ...req.body },
  { new: true },
).then((user) => res.status(200).send(user));

const updateUser = (req, res) => User.findByIdAndUpdate(
  req.user.id,
  { ...req.body },
  { new: true },
).then((user) => res.status(200).send(user));

const getAllUsers = (req, res) => User.find({}).then((users) => res.status(200).send(users));

const getUser = (req, res) => {
  const { id } = req.params;

  return User.findById(id).then((user) => res.status(200).send(user));
};

const createUser = (req, res) => User.create(req.body).then((user) => res.status(200).send(user));

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser,
};
