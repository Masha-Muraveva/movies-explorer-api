require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { DB_URL } = require('./utils/config');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimiter');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_URL);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);
app.use(rateLimiter);

app.use('/', signInRouter);
app.use('/', signUpRouter);
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
