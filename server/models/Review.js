const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  user: {
    type: String, // Assuming username is a string
    ref: 'User', // Reference the User model
    required: true,
    // Explicitly specify the field to use for referencing
    // This references the 'username' field of the User model
    match: /^[a-zA-Z0-9._-]+$/, // Add appropriate regex pattern for usernames
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function() {
      return this._doc.createdAt.toLocaleDateString('en-US');
    }
  },
  cityName: {
    type: String,
    required: true
  }
});

const Review = model('Review', reviewSchema);

module.exports = Review;