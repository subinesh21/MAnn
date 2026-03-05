import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  primaryImage: {
    type: String,
    required: true
  },
  hoverImage: {
    type: String
  },
  images: {
    type: Map,
    of: [String], // Color -> [image URLs]
    default: {}
  },
  faqs: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  category: {
    type: String,
    required: true,
    enum: ['drinkware', 'tableware', 'storage', 'kitchenware', 'homeware', 'bakeware', 'gardenware', 'gifting']
  },
  brand: {
    type: String,
    required: true
  },
  colors: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true // For hiding/unhiding products
  },
  isRemoved: {
    type: Boolean,
    default: false // For soft deleting products
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

// Update timestamps
productSchema.pre('save', function(next) {
  this.updatedAt = new Date() as any;
  next();
});

// Index for better query performance
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ name: 'text', description: 'text' });

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;