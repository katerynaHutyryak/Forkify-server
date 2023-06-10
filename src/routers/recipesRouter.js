const express = require('express');

const router = express.Router();
const recipesController = require('../controllers/recipesController');

router
  .route('/')
  .get(recipesController.getRecipes)
  .post(recipesController.createRecipe);

module.exports = router;
