const { User, Review } = require('../models'); // Adjust the path if necessary
const { signToken, AuthenticationError } = require('../utils/auth'); // Adjust the path if necessary

const resolvers = {
  Query: {
    user: async () => {
        return await User.find({}).populate('reviews'); ;
    },
    review: async () => {
        return await Review.find({});
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const user = await User.create(args);
        return user;
      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user');
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !user.isCorrectPassword(password)) {
          throw new AuthenticationError('Invalid email or password');
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error during login:', error);
        throw new AuthenticationError('Failed to log in');
      }
    },
    addReview: async (_, { review, rating, cityName, createdAt }) => {
      try {
        const newReview = await Review.create({ review, rating, cityName, createdAt });
        return newReview;
      } catch (error) {
        console.error('Error adding review:', error);
        throw new Error('Failed to add review');
      }
    }
  }
};

module.exports = resolvers;