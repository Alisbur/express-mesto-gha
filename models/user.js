/* eslint-disable prefer-regex-literals */

const mongoose = require('mongoose');

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
    validate: {
      validator(v) {
        const regex = new RegExp(/https?:\/\/(\w|\d|\/)+\.\w+/);
        return regex.test(v);
      },
      message: 'Ошибка в адресе аватара',
    },
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
