const BadRequest = require('../Error/BadRequest');
const NotFound = require('../Error/NotFound');
const User = require('../models/user');

const findUserById = (id) => User.findById(id).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFound('Пользователь c указанным _id не найден');
});

module.exports.getProfile = (req, res, next) => {
  const { _id } = req.user;

  findUserById(_id)
    .then((user) => res.send({ user }))
    .catch(next);
};

const updateUserData = (id, data) => User.findByIdAndUpdate(id, data, {
  new: true,
  runValidators: true,
})
  .then((user) => {
    if (user) {
      return user;
    }
    throw new NotFound('Пользователь с указанным _id не найден');
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequest('Переданы некорректные данные при обновлении информации');
    }
    throw err;
  });

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  updateUserData(_id, { name, email })
    .then((user) => res.send({ user }))
    .catch((err) => next(err));
};
