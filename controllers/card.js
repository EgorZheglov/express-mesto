/* eslint-disable linebreak-style */
const Card = require('../models/card');

const getAllCards = (req, res) => Card.find({}).then((cards) => res.status(200).send(cards));

const deleteCard = (req, res) => Card.findOneAndRemove(req.params)
  .then((card) => res.status(200).send(card));

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user.id;

  return Card.create({ name, link, owner }).then((card) => res.status(201).send(card));
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user.id } }, // добавить _id в массив, если его там нет
  { new: true },
).then((card) => res.status(201).send(card));

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user.id } }, // убрать _id из массива
  { new: true },
).then((card) => res.status(201).send(card));

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
