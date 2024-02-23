const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils /auth');

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return await User.findById(args.id).populate('review');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
    const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, { username, review, rating }) => {
      return await Review.create({ username, review, rating });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        return 'No user with this email!';
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      return user;
    }
  },
};

module.exports = resolvers;