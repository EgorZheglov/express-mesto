/* eslint-disable linebreak-style */
const user = require('express').Router();
const {
  getAllUsers,
  getUser,
  updateAvatar,
  updateUser,
  getAuthUser,
} = require('../controllers/user');

const {
  validateUpdateAvatar,
  validateUpdateUser,
} = require('../middlewares/inputRequestValidation');

user.get('/users', getAllUsers);
user.get('/users/me', getAuthUser);
user.get('/users/:id', getUser);
user.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);
user.patch('/users/me', validateUpdateUser, updateUser);

module.exports = user;
