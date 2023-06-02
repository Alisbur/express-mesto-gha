/* eslint-disable prefer-regex-literals */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ValidationError = require('../errors/validation-error');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/(www\.)?[a-z0-9\-\._~:\/\?#\[\]@\!\$\&'\(\)\*\+,;=]+#?$/i.test(v);
      },
      message: 'Ошибка в адресе изображения аватара',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Ошибка в адресе электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ValidationError();
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ValidationError();
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
