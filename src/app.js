/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const { requiresAuth } = require('express-openid-connect');
const recipesRouter = require('./routers/recipesRouter');

const app = express();

dotenv.config({ path: '.env' });

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

module.exports = app;
