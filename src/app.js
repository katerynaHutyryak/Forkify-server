const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const recipesRouter = require('./routers/recipesRouter');
const AppError = require('./utils/appError');

const app = express();

/** SECURITY MIDDLEWARES */

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(
  hpp({
    whitelist: ['search'],
  }),
);

/** ROUTES */

app.use(express.json());

app.use('/api/v1/recipes', recipesRouter);

app.all('*', (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)),
);

module.exports = app;
