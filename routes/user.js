/* eslint-disable linebreak-style */
const user = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser,
} = require('../controllers/user');

user.get('/users', getAllUsers);
user.get('/users/:id', getUser);
user.post('/users', createUser);
user.patch('/users/me/avatar', updateAvatar);
user.patch('/users/me', updateUser);

module.exports = user;
