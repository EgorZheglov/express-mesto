/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(mail) {
        return validator.isEmail(mail);
      },
      message: 'Введён некорректный email',
    }
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return /https?:\/\/w*\.?\w+\.\w+/.test(link);
      },
      message: 'Некорректная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

const model = mongoose.model('user', userSchema);

module.exports = model;
