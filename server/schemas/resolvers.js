const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils /auth');

const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      return await User.findById(args.id).populate('reviews'); 
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
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, { username, review, rating }) => {
      // create new review
      const newReview = await Review.create({ username, review, rating });

      // find user by username and update the reviews array
      const user = await User.findOneAndUpdate(
        { username },
        { $push: { reviews: newReview._id } },
        { new: true }
      );

      return newReview;
    },
    login: async (_, { email, password }) => {
      // find user in the database
      const user = await User.findOne({ email });

      // check if the user exists and if the password is correct
      if (!user || !user.isCorrectPassword(password)) {
        throw new Error('Invalid email or password');
      }

      const token = signToken(user);

      // return the token and the user data
      return { token, user };
    }
  },
};

module.exports = resolvers;