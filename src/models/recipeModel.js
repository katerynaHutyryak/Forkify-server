const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A recipe must have a name'],
        minlength: [3, 'A recipe name should have at least 3 characters'],
        maxlength: [30, 'A recipe name should be shorter than 30 characters'],
        unique: false,
    },
    image: { type: String, unique: false },
    userID: {
        type: String,
        required: true,
        unique: false,
    },
    servings: {
        type: Number,
        required: [true, 'A recipe must have a serving number information'],
        minlength: [1, 'A recipe must have at least one serving'],
        unique: false,
    },
    cookingTime: {
        type: Number,
        required: [true, 'The cookimg time is required'],
        unique: false,
    },
    ingredients: {
        type: [
            {
                quantity: {
                    type: Number,
                    required: [true, 'Ingredient quantity is required'],
                    unique: false,
                },
                unit: { type: String, unique: false },
                description: {
                    type: String,
                    required: [true, 'Ingredient description is required'],
                    unique: false,
                },
            },
        ],
        required: [true, 'A recipe must contain ingredients'],
        minlength: [2, 'A recipe must contain at least 2 ingredients'],
        maxlength: [100, 'A recipe can not have more than 100 ingredients'],
        unique: false,
    },
    cookingDirections: {
        type: String,
        required: true,
        unique: false,
    },
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
