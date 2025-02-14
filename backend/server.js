// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
//console.log('Mongo URI:', process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));     // Admin-only Routes
app.use('/api/content', require('./routes/content'));
app.get('/api/test', (req, res) => {
  res.send('Backend is working!');
});
app.get('/api/recipes', (req, res) => {
  const recipes = [
    { id: 1, name: "Espresso", ingredients: ["Coffee Beans", "Water"] },
    { id: 2, name: "Croissant", ingredients: ["Flour", "Butter", "Sugar"] },
  ];
  res.json(recipes);
});

// Connect to MongoDB (replace <your_connection_string> with your actual connection string)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

