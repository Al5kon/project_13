/* eslint-disable no-useless-escape */

const mongoose = require('mongoose');

const validator = function (v) {
  return /href\=\"(.*)\"/.test(v);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate:
      [validator, 'It is not a valid link'],
  },
});

module.exports = mongoose.model('user', userSchema);
