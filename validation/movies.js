const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/config');

const creationMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(URL_REGEX).required(),
    trailerLink: Joi.string().pattern(URL_REGEX).required(),
    thumbnail: Joi.string().pattern(URL_REGEX).required(),
    movieId: Joi.required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deletionMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  creationMovieValidation,
  deletionMovieValidation,
};
