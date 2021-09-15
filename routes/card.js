/* eslint-disable linebreak-style */
const card = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

card.get('/cards', getAllCards);
card.post('/cards', createCard);
card.delete('/cards/:id', deleteCard);
card.put('/cards/:cardId/likes', likeCard);
card.delete('/cards/:cardId/likes', dislikeCard);

module.exports = card;
