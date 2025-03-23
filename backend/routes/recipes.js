const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

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

// POST a review for a recipe
router.post('/:id/reviews', async (req, res) => {
  try {
    const { username, comment, rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    const newReview = {
      username,
      comment,
      rating,
      date: new Date().toLocaleDateString(),
    };

    recipe.reviews.push(newReview);
    await recipe.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST (create) a new recipe with file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;
    const newRecipe = new Recipe({
      title,
      description,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      steps: steps.split(',').map(step => step.trim()),
      image: req.file ? req.file.path : 'default.jpg',
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT (update) a recipe by ID with optional file upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    if (title !== undefined) recipe.title = title;
    if (description !== undefined) recipe.description = description;
    if (ingredients !== undefined) recipe.ingredients = ingredients.split(',').map(ingredient => ingredient.trim());
    if (steps !== undefined) recipe.steps = steps.split(',').map(step => step.trim());
    if (req.file) recipe.image = req.file.path;

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