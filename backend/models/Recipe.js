const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  ingredients: [{ 
    type: String 
  }],
  steps: [{ 
    type: String 
  }],
  image: { 
    type: String, 
    default: 'default.jpg' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);