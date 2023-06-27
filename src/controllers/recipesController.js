const Recipe = require('../models/recipeModel');
const AppError = require('../utils/appError');

exports.getRecipes = async (req, res, next) => {
  try {
    const recipeName = req.query.search;
    const regex = new RegExp(recipeName, 'i');
    const recipes = await Recipe.find({ title: regex });

    if (recipes.length === 0) {
      return next(new AppError('No recipes found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: recipes,
      },
    });
  } catch (error) {
    res.status(404).json({ error: 'Not found' });
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create({
      userId: req.oidc.user.sid,
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      data: recipe,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.getOneRecipe = async (req, res, next) => {
  try {
    if (!req.params.id) return next(new AppError('No recipe selected', 400));

    const recipeID = req.params.id;
    const recipe = await Recipe.findById(recipeID);

    res.status(200).json({
      status: 'success',
      data: {
        data: recipe,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'No recipe found',
    });
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    if (!req.params.id) return next(new AppError('No recipe selected', 400));

    const recipeID = req.params.id;
    const recipe = await Recipe.findById(recipeID);

    if (req.oidc.user.sid !== recipe.userId) {
      return next(
        new AppError('Unauthorized to delete a recipe of another user', 401),
      );
    }

    await Recipe.deleteOne(recipe);

    res.status(200).json({
      status: 'success',
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
