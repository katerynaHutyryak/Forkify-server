const Recipe = require('../models/recipeModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

exports.getRecipes = catchAsync(async (req, res, next) => {
    if (
        req.query.search === '' ||
        req.query.search === null ||
        req.query.search === undefined ||
        !req.query.search
    ) {
        return next(new AppError('Please, provide a recipe name', 404))
    }
    const recipeName = req.query.search
    const regex = new RegExp(recipeName, 'i')
    const recipes = await Recipe.find({ title: regex })

    if (recipes.length === 0) {
        return next(new AppError('No recipes found', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            recipes,
        },
    })
})

exports.createRecipe = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization.slice(7)
    if (!token) return next(new AppError('Not authorized!', 401))
    const decoded = await jwt.decode(token)

    const recipe = await Recipe.create({
        userID: decoded.sub,
        ...req.body,
    })

    res.status(201).json({
        status: 'success',
        data: {
            recipe,
        },
    })
})

exports.getOneRecipe = catchAsync(async (req, res, next) => {
    if (!req.params.id) return next(new AppError('No recipe selected', 400))

    const recipeID = req.params.id
    const recipe = await Recipe.findById(recipeID)

    res.status(200).json({
        status: 'success',
        data: {
            recipe,
        },
    })
})

exports.deleteRecipe = catchAsync(async (req, res, next) => {
    if (!req.params.id) return next(new AppError('No recipe selected', 400))

    const recipeID = req.params.id
    const recipe = await Recipe.findById(recipeID)

    const token = req.headers.authorization.slice(7)
    if (!token) return next(new AppError('Not authorized!', 401))
    const decoded = await jwt.decode(token)

    if (decoded.sub !== recipe.userID) {
        return next(
            new AppError('Unauthorized to delete a recipe of another user', 401)
        )
    }

    await Recipe.deleteOne(recipe)

    res.status(200).json({
        status: 'success',
        message: 'Recipe deleted successfully',
    })
})

exports.editRecipe = catchAsync(async (req, res, next) => {
    if (!req.params.id) return next(new AppError('No recipe selected', 400))

    const recipeID = req.params.id
    const recipe = await Recipe.findById(recipeID)

    const token = req.headers.authorization.slice(7)
    if (!token) return next(new AppError('Not authorized!', 401))
    const decoded = await jwt.decode(token)

    if (decoded.sub !== recipe.userID) {
        return next(
            new AppError('Unauthorized to delete a recipe of another user', 401)
        )
    }

    const doc = await Recipe.findByIdAndUpdate(recipeID, req.body, {
        new: true,
        runValidators: true,
    })

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            doc,
        },
    })
})
