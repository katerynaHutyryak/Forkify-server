const express = require('express')
const { checkJwt } = require('../utils/checkJwt')
const recipesController = require('../controllers/recipesController')

const router = express.Router()

router
    .route('/')
    .get(recipesController.getRecipes)
    .post(checkJwt, recipesController.createRecipe)

router
    .route('/:id')
    .get(recipesController.getOneRecipe)
    .patch(checkJwt, recipesController.editRecipe)
    .delete(checkJwt, recipesController.deleteRecipe)

module.exports = router
