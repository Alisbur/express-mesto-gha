/* eslint-disable prefer-regex-literals */

const mongoose = require('mongoose');

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
    validate: {
      validator(v) {
        const regex = new RegExp(/https?:\/\/(\w|\d|\/)+\.\w+/);
        return regex.test(v);
      },
      message: 'Ошибка в адресе изображения',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, {
  versionKey: false,
});

/* cardSchema.statics.isMyCard = function (_Id, userId) {
  return this.findOne({ _id })
    .then((card) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password);
    });
}; */

module.exports = mongoose.model('card', cardSchema);
