// Script to cleanup users collection and resolve duplicate key issues
const mongoose = require('mongoose');

async function cleanupUsersDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/cgg-eha');
    console.log('Connected to MongoDB');
    
    // Get the users collection
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Remove duplicate indexes
    console.log('Removing duplicate indexes...');
    try {
      await usersCollection.dropIndex('email_1');
      console.log('Dropped email_1 index');
    } catch (err) {
      console.log('email_1 index not found or already dropped');
    }
    
    try {
      await usersCollection.dropIndex('mobile_1');
      console.log('Dropped mobile_1 index');
    } catch (err) {
      console.log('mobile_1 index not found or already dropped');
    }
    
    try {
      await usersCollection.dropIndex('googleId_1');
      console.log('Dropped googleId_1 index');
    } catch (err) {
      console.log('googleId_1 index not found or already dropped');
    }
    
    // Check for duplicate _id entries
    console.log('Checking for duplicate _id entries...');
    const duplicates = await usersCollection.aggregate([
      { $group: { _id: "$_id", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } }
    ]).toArray();
    
    if (duplicates.length > 0) {
      console.log('Found duplicate _id entries:', duplicates);
      // Remove duplicates, keeping only the first occurrence
      for (const dup of duplicates) {
        const docs = await usersCollection.find({ _id: dup._id }).toArray();
        // Keep the first document, remove the rest
        for (let i = 1; i < docs.length; i++) {
          await usersCollection.deleteOne({ _id: docs[i]._id });
          console.log(`Removed duplicate document with _id: ${docs[i]._id}`);
        }
      }
    } else {
      console.log('No duplicate _id entries found');
    }
    
    console.log('✅ Database cleanup complete!');
    console.log('You can now restart your development server');
    
    process.exit(0);
    
  } catch (error) {
    console.error('Error cleaning up database:', error);
    process.exit(1);
  }
}

cleanupUsersDB();