// routes/recipes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST (create) a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT (update) a recipe by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    // Update only if fields are provided
    if (title !== undefined) recipe.title = title;
    if (description !== undefined) recipe.description = description;
    if (ingredients !== undefined) recipe.ingredients = ingredients;
    if (instructions !== undefined) recipe.instructions = instructions;

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE a recipe by ID
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndRemove(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.json({ msg: 'Recipe removed' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;