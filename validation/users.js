const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/config');

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(URL_REGEX).required(),
  }),
});

module.exports = {
  updateProfileValidation,
};
