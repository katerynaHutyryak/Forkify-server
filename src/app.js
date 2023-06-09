const express = require('express');
const app = express();
const recipesRouter = require('./routers/recipesRouter')

app.use(express.json());

app.use('/api/v1/recipes', recipesRouter);

module.exports = app;