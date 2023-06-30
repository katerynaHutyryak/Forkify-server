/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const { requiresAuth } = require('express-openid-connect');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const recipesRouter = require('./routers/recipesRouter');
const AppError = require('./utils/appError');

const app = express();

//SECURITY MIDDLEWARES
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

dotenv.config({ path: '.env' });

//AUTH0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(express.json());
app.use('/api/v1', auth(config));

app.get('/api/v1', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/api/v1/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use('/api/v1/recipes', recipesRouter);

app.all('*', (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)),
);

module.exports = app;
