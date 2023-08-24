const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Здесь должна быть указана ссылка (URL)',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Здесь должна быть указана ссылка (URL)',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Здесь должна быть указана ссылка (URL)',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
