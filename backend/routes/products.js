const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST create a new product
router.post('/', async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  try {
    const product = new Product({ name, description, price, category, inStock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT update product by ID
router.put('/:id', async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.inStock = inStock !== undefined ? inStock : product.inStock;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json({ msg: 'Product removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;