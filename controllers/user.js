/* eslint-disable linebreak-style */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../utils/BadRequestError');
const AuthorizationError = require('../utils/AuthorizationError');
const NotFoundError = require('../utils/NotFoundError');
const AlreadyRegistredError = require('../utils/AlreadyRegistredError');

const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return next(new AuthorizationError('Неправильные почта или пароль'));
          }
          const token = jwt.sign(
            { _id: user.id },
            'secret',
            { expiresIn: '7d' },
          );

          // аутентификация успешна
          return res.status(200).send({ token });
        })
        .catch((err) => next(err));
      // Захешируем его и сравним с хешем в базе. bcrypt.compare - асинхронный.
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
      name: req.body.name,
      avatar: req.body.avatar,
      about: req.body.about,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new AlreadyRegistredError('Пользователь с таким email уже есть'));
      }

      if (err.name === 'ValidationError') {
        next(new BadRequestError('данные не прошли валидацию'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { ...req.body },
  {
    new: true,
    runValidators: true,
  },
).then((user) => {
  if (!user) {
    next(new NotFoundError('Данные не найдены'));
  } else {
    res.status(200).send({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    });
  }
})
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('данные не прошли валидацию'));
    } else {
      next(err);
    }
  });

const updateUser = (req, res, next) => User.findByIdAndUpdate(
  req.user.id,
  { ...req.body },
  {
    new: true,
    runValidators: true,
  },
).then((user) => {
  if (!user) {
    next(new NotFoundError('Данные не найдены'));
  } else {
    res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  }
})
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('данные не прошли валидацию'));
    } else {
      next(err);
    }
  });

const getAllUsers = (req, res, next) => User.find({}).then((users) => res.status(200).send(users))
  .catch((err) => next(err));

const getUser = (req, res, next) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Данные не найдены'));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены неправильные данные'));
      } else {
        next(err);
      }
    });
};

const getAuthUser = (req, res, next) => {
  const id = req.user;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Данные не найдены'));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  login,
  getAllUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser,
  getAuthUser,
};
