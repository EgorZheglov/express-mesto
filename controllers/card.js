/* eslint-disable no-lonely-if */
/* eslint-disable linebreak-style */
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForBiddenError');

const Card = require('../models/card');

const getAllCards = (req, res, next) => Card.find({}).then((cards) => res.status(200).send(cards))
  .catch((err) => next(err));

const deleteCard = (req, res, next) => Card.findById(req.params.id)
  .then((card) => {
    const owner = req.user;

    if (!card) {
      next(new NotFoundError('Данные не найдены'));
    } else {
      if (owner._id !== card.owner.toString()) {
        next(new ForbiddenError('Недостаточно прав'));
      } else {
        Card.deleteOne(card)
          .then(() => res.status(200).send(card));
      }
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Введены неправильные данные'));
    } else {
      next(err);
    }
  });

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;

  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('данные не прошли валидацию'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user.id } }, // добавить _id в массив, если его там нет
  {
    new: true,
    runValidators: true,
  },
).then((card) => {
  if (!card) {
    next(new NotFoundError('Данные не найдены'));
  } else {
    res.status(200).send(card);
  }
})
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Введены неправильные данные'));
    } else {
      next(err);
    }
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user.id } }, // убрать _id из массива
  {
    new: true,
    runValidators: true,
  },
).then((card) => {
  if (!card) {
    next(new NotFoundError('Данные не найдены'));
  } else {
    res.status(200).send(card);
  }
}).catch((err) => {
  if (err.name === 'CastError') {
    next(new BadRequestError('Введены неправильные данные'));
  } else {
    next(err);
  }
});

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

/* Большое спасибо за понятное ревью, */
/* Извиняюсь за невнмательность. */
