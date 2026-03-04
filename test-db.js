const mongoose = require('mongoose');

async function testConnection() {
  try {
    const uri = 'mongodb://localhost:27017/cgg-eha';
    console.log('Connecting to:', uri);
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('Connected successfully!');
    
    // Test by fetching products
    const productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      category: String,
      inStock: Boolean
    });
    
    const Product = mongoose.model('Product', productSchema);
    const products = await Product.find({});
    console.log(`Found ${products.length} products:`);
    products.forEach(p => console.log(`- ${p.name}: $${p.price}`));
    
    await mongoose.connection.close();
    console.log('Connection closed');
    
  } catch (error) {
    console.error('Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();