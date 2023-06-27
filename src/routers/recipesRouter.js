/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const router = express.Router();
const recipesController = require('../controllers/recipesController');

router
  .route('/')
  .get(recipesController.getRecipes)
  .post(requiresAuth(), recipesController.createRecipe);

router
  .route('/:id')
  .get(recipesController.getOneRecipe)
  .delete(requiresAuth(), recipesController.deleteRecipe);

module.exports = router;
