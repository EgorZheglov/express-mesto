/* eslint-disable linebreak-style */
const User = require('../models/user');

const updateAvatar = (req, res) => User.findByIdAndUpdate(
  req.user.id,
  { ...req.body },
  {
    new: true,
    runValidators: true,
  },
).then((user) => {
  if (!user) {
    res.status(404).send({ message: 'Данные не найдены' });
  } else {
    res.status(200).send(user);
  }
})
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'данные не прошли валидацию' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });

const updateUser = (req, res) => User.findByIdAndUpdate(
  req.user.id,
  { ...req.body },
  {
    new: true,
    runValidators: true,
  },
).then((user) => {
  if (!user) {
    res.status(404).send({ message: 'Данные не найдены' });
  } else {
    res.status(200).send(user);
  }
})
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'данные не прошли валидацию' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });

const getAllUsers = (req, res) => User.find({}).then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

const getUser = (req, res) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Данные не найдены' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const createUser = (req, res) => User.create(req.body).then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'данные не прошли валидацию' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser,
};
