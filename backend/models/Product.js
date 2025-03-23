const mongoose = require('mongoose');

// Define the Review schema
const ReviewSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Username of the reviewer
  comment: { type: String, required: true },  // Review comment
  rating: { type: Number, required: true },   // Rating (1-5)
  date: { type: String, default: new Date().toLocaleDateString() }, // Date of the review
});

// Define the Product schema
const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'], 
    trim: true, 
    maxlength: [100, 'Product name cannot exceed 100 characters'] 
  },
  description: { 
    type: String, 
    trim: true, 
    maxlength: [500, 'Description cannot exceed 500 characters'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'], 
    min: [0, 'Price cannot be negative'] 
  },
  category: { 
    type: String, 
    trim: true, 
    enum: {
      values: ['Coffee', 'Cake', 'Pastry', 'Other'], 
      message: '{VALUE} is not a valid category' 
    },
    default: 'Other' 
  },
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'], 
    min: [0, 'Quantity cannot be negative'], 
    default: 0 
  },
  inStock: { 
    type: Boolean, 
    default: true 
  },
  image: {
    type: String, 
    default: 'default.jpg' 
  },
  reviews: [ReviewSchema], // Add reviews field
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware to update the `updatedAt` field before saving
ProductSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', ProductSchema);