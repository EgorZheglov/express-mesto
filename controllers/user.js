/* eslint-disable linebreak-style */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          const token = jwt.sign(
            { _id: user.id },
            'secret',
            { expiresIn: '7d' },
          );

          // аутентификация успешна
          return res.status(200).send({ token });
        })
        .catch((err) => {
          res
            .status(401)
            .send({ message: err.message });
        });
      // Захешируем его и сравним с хешем в базе. bcrypt.compare - асинхронный.
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
      name: req.body.name,
      avatar: req.body.avatar,
      about: req.body.about,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'данные не прошли валидацию' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

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

module.exports = {
  login,
  getAllUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser,
};
