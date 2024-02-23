const db = require('../config/connection');
const { User, Review } = require('../models');
const accountSeeds = require('./accountSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Review', 'reviews');
    
    await User.create(accountSeeds);
    await Review.create(reviewSeeds);

    console.log('Seeding done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});