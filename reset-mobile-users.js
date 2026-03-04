// Script to reset mobile users collection and fix indexing issues
const mongoose = require('mongoose');

async function resetMobileUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/thulira');
    console.log('Connected to MongoDB');
    
    // Drop the users collection to clear all indexes
    await mongoose.connection.db.dropCollection('users');
    console.log('Dropped users collection');
    
    // The User model will recreate the collection with proper indexes when imported
    const User = require('./models/User.ts').default;
    
    // Force index creation
    await User.createIndexes();
    console.log('Created indexes successfully');
    
    console.log('✅ Mobile users collection reset complete!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error resetting users collection:', error);
    process.exit(1);
  }
}

resetMobileUsers();