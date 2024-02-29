const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  user: {
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