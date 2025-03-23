const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
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

// ✅ GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ POST create a new product (with file upload)
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, price, category, quantity, inStock } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      inStock,
      image: req.file ? req.file.path : 'default.jpg' // Save the file path or use a default image
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// ✅ PUT update product by ID (with optional file upload)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, description, price, category, quantity, inStock } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Update fields if provided
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (quantity !== undefined) product.quantity = quantity;
    if (inStock !== undefined) product.inStock = inStock;
    if (req.file) product.image = req.file.path; // Update image if a new file is uploaded

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// ✅ DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// ✅ POST a review for a product
router.post('/:id/reviews', async (req, res) => {
  try {
    const { username, comment, rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const newReview = {
      username,
      comment,
      rating,
      date: new Date().toLocaleDateString(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;