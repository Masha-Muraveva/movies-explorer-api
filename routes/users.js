const usersRouter = require('express').Router();
const {
  updateProfileValidation,
} = require('../validation/users');

const {
  getProfile,
  updateProfile,
} = require('../controllers/users');

usersRouter.get('/me', getProfile);
usersRouter.patch('/me', updateProfileValidation, updateProfile);

module.exports = usersRouter;
