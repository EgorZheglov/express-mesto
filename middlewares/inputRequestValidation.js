/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */

const { celebrate, Joi } = require('celebrate');

// email и link валидируются непосредственно в схеме
const validateUsersPost = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/w*\.?\w+\.\w+/),
  })
});

const validateCardPost = celebrate({
  body: Joi.object().keys({
    link: Joi.string().pattern(/https?:\/\/w*\.?\w+\.\w+/).required(),
    name: Joi.string().required().min(2).max(30),
  })
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/w*\.?\w+\.\w+/),
  }),
});

const validateParams = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateParams,
  validateUsersPost,
  validateCardPost,
  validateUpdateAvatar,
  validateUserLogin,
  validateUpdateUser,
};
