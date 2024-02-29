const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
        return await User.findById(context.user._id).populate('reviews'); ;
    },
    review: async () => {
        return await Review.find({});
    },
    allUsers: async () => {
      return await User.find({});
  },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addReview: async (_, { user, review, rating, cityName, createdAt }) => {
      try {
        // Create the review document with the provided user ID
        const newReview = await Review.create({ user, review, rating, cityName, createdAt });
        
        return newReview;
      } catch (error) {
        console.error('Error adding review:', error);
        throw new Error('Failed to add review');
      }
    }
  }
};

module.exports = resolvers;