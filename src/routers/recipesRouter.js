const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const router = express.Router();
const recipesController = require('../controllers/recipesController');

router
  .route('/')
  .get(recipesController.getRecipes)
  .post(requiresAuth(), recipesController.createRecipe);

module.exports = router;
