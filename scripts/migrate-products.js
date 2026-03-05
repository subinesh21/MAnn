// Script to migrate products from product-data.js to MongoDB
// Run this once: node scripts/migrate-products.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import products data
const { PRODUCTS } = require('../lib/product-data');

async function migrateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get Product model with proper schema
    const ProductSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      price: { type: Number, required: true, min: 0 },
      originalPrice: { type: Number, min: 0 },
      primaryImage: { type: String, required: true },
      hoverImage: { type: String },
      images: {
        type: Map,
        of: [String],
        default: {}
      },
      category: {
        type: String,
        required: true,
        enum: ['drinkware', 'tableware', 'storage', 'kitchenware', 'homeware', 'bakeware', 'gardenware', 'gifting']
      },
      brand: { type: String, required: true },
      colors: [{ type: String }],
      inStock: { type: Boolean, default: true },
      description: { type: String, required: true },
      rating: { type: Number, min: 0, max: 5, default: 0 },
      reviews: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },
      faqs: [{
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    // Clear existing products to avoid duplicates
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    // Transform and insert products
    const productsToInsert = PRODUCTS.map(product => ({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      primaryImage: product.primaryImage,
      hoverImage: product.hoverImage,
      images: product.images || {},
      category: product.category,
      brand: product.brand,
      colors: product.colors || [],
      inStock: product.inStock !== undefined ? product.inStock : true,
      description: product.description,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      isActive: true, // All products active by default
      faqs: product.faqs || []
    }));

    // Insert products
    const result = await Product.insertMany(productsToInsert, { ordered: false });
    
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`✅ Successfully migrated ${result.length} products to MongoDB`);
    
    // Show some stats
    const categories = {};
    result.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });
    
    console.log('\n📊 Products by category:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });
    
    console.log('\n💡 Next steps:');
    console.log('   1. Restart your dev server: npm run dev');
    console.log('   2. Visit /shop to see products from MongoDB');
    console.log('   3. Visit /admin to manage products');

  } catch (error) {
    if (error.code === 11000) {
      console.error('❌ Duplicate key error - products may already exist');
    } else {
      console.error('❌ Migration error:', error.message);
    }
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
}

// Run migration
migrateProducts();
