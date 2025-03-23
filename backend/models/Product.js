const mongoose = require('mongoose');

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