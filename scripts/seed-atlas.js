// Script to seed MongoDB Atlas with all product data
// Run: node scripts/seed-atlas.js

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');

// Import product data from the centralized file
const { PRODUCTS } = require('../lib/product-data.js');

async function seedAtlasDatabase() {
  try {
    // Get MongoDB URI from environment
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      console.log('Please set your MongoDB Atlas connection string in .env.local');
      process.exit(1);
    }

    console.log('🚀 Connecting to MongoDB Atlas...');
    console.log('URI:', MONGODB_URI.substring(0, 50) + '...');
    
    // Connect to MongoDB Atlas with proper options
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true
    });
    
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Import Product model
    const Product = require('../models/Product');
    
    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    const deletedCount = await Product.deleteMany({});
    console.log(`✅ Deleted ${deletedCount.deletedCount} existing products`);
    
    // Prepare products data for MongoDB
    const productsToInsert = PRODUCTS.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      primaryImage: product.primaryImage,
      hoverImage: product.hoverImage,
      images: product.images,
      category: product.category,
      brand: product.brand,
      colors: product.colors,
      inStock: product.inStock,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert all products
    console.log(`📥 Inserting ${productsToInsert.length} products...`);
    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`✅ Successfully inserted ${insertedProducts.length} products into MongoDB Atlas`);
    
    // Verify insertion
    const totalProducts = await Product.countDocuments();
    console.log(`📊 Total products in database: ${totalProducts}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    console.log('🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
if (require.main === module) {
  seedAtlasDatabase();
}

module.exports = seedAtlasDatabase;