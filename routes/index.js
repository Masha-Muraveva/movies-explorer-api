const router = require('express').Router();
const { checkAuthorizedUser } = require('../middlewares/auth');
const NotFound = require('../Error/NotFound');

const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.use(checkAuthorizedUser);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => next(new NotFound('Страницы по данному URL не существует')));

module.exports = router;
