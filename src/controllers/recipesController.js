const Recipe = require('../models/recipeModel');

exports.getRecipes = async (req, res) => {
    try{
        const recipeName = req.query.search;
        const regex = new RegExp(recipeName, 'i');
        const recipes = await Recipe.find({title: regex});

        if (recipes.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No recipes found'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                data: recipes
            }
        })
    } catch (error) {
        res.status(404).json({ error: 'Not found' });
    }

}

exports.createRecipe = async (req, res) => {
    try{
        const recipe = await Recipe.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: recipe
            }
        })
    } catch (err) {
        return res.status(400).json({
          status: 'error',
          message: err.message,
        });
      }
}

