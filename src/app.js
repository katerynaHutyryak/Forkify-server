const express = require('express');
const recipesRouter = require('./routers/recipesRouter');

const app = express();

app.use(express.json());

app.use('/api/v1/recipes', recipesRouter);

module.exports = app;
