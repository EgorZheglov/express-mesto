/* eslint-disable no-lonely-if */
/* eslint-disable linebreak-style */
const Card = require('../models/card');

const getAllCards = (req, res) => Card.find({}).then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => {
    const owner = req.user;

    if (!card) {
      res.status(404).send({ message: 'Данные не найдены' });
    } else {
      if (owner._id !== card.owner.toString()) {
        res.status(403).send({ message: 'Недостаточно прав' });
      } else {
        res.status(200).send(card);
      }
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Введены некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;

  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'данные не прошли валидацию' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user.id } }, // добавить _id в массив, если его там нет
  {
    new: true,
    runValidators: true,
  },
).then((card) => {
  if (!card) {
    res.status(404).send({ message: 'Данные не найдены' });
  } else {
    res.status(200).send(card);
  }
})
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Введены некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user.id } }, // убрать _id из массива
  {
    new: true,
    runValidators: true,
  },
).then((card) => {
  if (!card) {
    res.status(404).send({ message: 'Данные не найдены' });
  } else {
    res.status(200).send(card);
  }
}).catch((err) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Введены некорректные данные' });
  } else {
    res.status(500).send({ message: 'Произошла ошибка' });
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
