#!/usr/bin/env node

// Simple CLI tool to seed MongoDB Atlas
// Usage: node scripts/seed-cli.js

const { spawn } = require('child_process');
const path = require('path');

console.log('🌱 Thulira MongoDB Seeder');
console.log('========================\n');

// Run the seed script with proper environment loading
const seedProcess = spawn('node', ['scripts/seed-atlas.js'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

seedProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Seeding completed successfully!');
    console.log('📊 Your products are now available in MongoDB Atlas');
    console.log('🚀 You can now use the admin panel to manage products');
  } else {
    console.log('\n❌ Seeding failed with exit code:', code);
    console.log('💡 Try checking your MongoDB Atlas connection string');
  }
  process.exit(code);
});

seedProcess.on('error', (error) => {
  console.error('❌ Failed to start seed process:', error.message);
  process.exit(1);
});