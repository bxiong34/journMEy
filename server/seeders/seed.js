const db = require('../config/connection');
const { User, Review } = require('../models');
const userSeeds = require('./userSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const cleanDB = require('./cleanDB');

async function seedDatabase() {
  try {
    // drop existing collections
    await cleanDB('users');
    await cleanDB('reviews');
    
    // seed users
    for (const userSeed of userSeeds) {
      const user = new User(userSeed);
      await user.save();
    }
    console.log('User seeding done!');

    // verify if reviewSeeds is an array
    if (!Array.isArray(reviewSeeds.reviewSeeds)) {
      throw new Error('reviewSeeds is not an array');
    }

    // seed reviews and associate them with users
    for (const reviewSeed of reviewSeeds.reviewSeeds) {
      const { user: username, createdAt, ...reviewData } = reviewSeed;
      const user = await User.findOne({ username });

      if (user) {
        const review = new Review({ ...reviewData, user: user._id, createdAt: new Date(reviewSeed.createdAt),
        });
        await review.save();
        user.reviews.push(review);
        await user.save();
        console.log(`Review for user '${username}' seeded successfully.`);
      } else {
        console.warn(`User '${username}' not found for review.`);
      }
    }

    console.log('Review seeding done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();