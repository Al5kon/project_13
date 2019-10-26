/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const userModel = require('./user');

const validator = function (v) {
  return /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
};

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate:
      [validator, 'It is not a valid link'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    default: [],
  }],
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
