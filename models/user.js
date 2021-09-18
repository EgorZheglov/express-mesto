/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  }
});

const model = mongoose.model('user', userSchema);

module.exports = model;
