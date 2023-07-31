const moviesRouter = require('express').Router();

const {
  getMovies,
  createMovieCard,
  deleteMovieCard,
} = require('../controllers/movies');

const {
  creationMovieValidation,
  deletionMovieValidation,
} = require('../validation/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', creationMovieValidation, createMovieCard);
moviesRouter.delete('/:movieId', deletionMovieValidation, deleteMovieCard);

module.exports = moviesRouter;
