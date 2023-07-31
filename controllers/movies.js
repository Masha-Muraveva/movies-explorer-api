const Forbidden = require('../Error/Forbidden');
const NotFound = require('../Error/NotFound');
const BadRequest = require('../Error/BadRequest');

const Movie = require('../models/movie');
const {
  CODE_CREATED,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie
    .find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovieCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => res.status(CODE_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при создании карточки фильма'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieCard = (req, res, next) => {
  Movie
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Карточка фильма с указанным _id не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new Forbidden('Нет доступа для удаления данной карточки фильма - её создал другой пользователь');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные удаления'));
      } else {
        next(e);
      }
    });
};
