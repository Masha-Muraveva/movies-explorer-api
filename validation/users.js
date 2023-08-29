const { celebrate, Joi } = require('celebrate');
const { EMAIL_REGEX } = require('../utils/config');

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(EMAIL_REGEX).required(),
  }),
});

module.exports = {
  updateProfileValidation,
};
