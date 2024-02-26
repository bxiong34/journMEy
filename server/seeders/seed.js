const db = require('../config/connection');
const { User, Review } = require('../models');
const userSeeds = require('./userSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Review', 'reviews');

    const users = await User.create(userSeeds);

    // create reviews and associate them with users
    const reviewPromises = reviewSeeds.map(async (reviewSeed) => {
      const user = users.find(u => u.username === reviewSeed.username);
      if (user) {
        // create the review document with review, rating, and createdAt fields
        const review = await Review.create({
          user: user._id,
          review: reviewSeed.review,
          rating: reviewSeed.rating,
          createdAt: new Date(reviewSeed.createdAt)
        });
        // push review ObjectId to the user's reviews array
        user.reviews.push(review._id);
      } else {
        console.warn(`User '${reviewSeed.username}' not found for review.`);
      }
    });

    // wait for all reviews to be associated with users
    await Promise.all(reviewPromises);

    // save all user documents after creating reviews for all users
    const saveUserPromises = users.map(user => user.save());
    await Promise.all(saveUserPromises);

    console.log('Seeding done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});