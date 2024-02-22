const { User, Review } = require('../models');

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return await User.findById(args.id).populate('review');
    },
  },
  Mutation: {
    addReview: async (parent, { username, review, rating }) => {
      return await Review.create({ username, review, rating });
    },
  },
};

module.exports = resolvers;