const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Мария',
      minlength: 2,
      maxlength: 30,
      required: [true, 'Данное поле должно быть заполнено'],
    },
    email: {
      type: String,
      required: [true, 'Данное поле должно быть заполнено'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Здесь должен быть указан электронный адрес',
      },
    },
    password: {
      type: String,
      required: [true, 'Данное поле должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password).then((matched) => {
                if (matched) {
                  return user;
                }
                throw new Error('Неправильные данные: почта или пароль');
              });
            }
            throw new Error('Неправильные данные: почта или пароль');
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
