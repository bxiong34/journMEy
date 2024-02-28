const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils /auth');

const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      try {
        const user = await User.findById(args.id).populate('reviews');
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find().populate('reviews');
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user');
      }
    },
    addReview: async (parent, { user, review, rating, cityName, createdAt }) => {
      try {
        const newReview = await Review.create({ user, review, rating, cityName, createdAt });
        
        const updatedUser = await User.findByIdAndUpdate(
          user, 
          { $push: { reviews: newReview._id } }, 
          { new: true }
        );
        
        return newReview;
      } catch (error) {
        console.error('Error adding review:', error);
        throw new Error('Failed to add review');
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
    }
  }
};

module.exports = resolvers;