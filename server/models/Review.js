const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
    default: Date.now
  }
});

const Review = model('Review', reviewSchema);

module.exports = Review;