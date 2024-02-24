const typeDefs = `
  type User {
    _id: ID!
    email: String!
    username: String!
    reviews: [Review!]!
  }

  type Review {
    _id: ID!
    username: String!
    review: String!
    rating: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getUserReviews(userId: ID!): [Review!]!
  }

  type Mutation {
    #add new user
    addUser(email: String!, username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    # add new review
    addReview(userId: ID!, review: String!, rating: Int!): Review
  }
`;

module.exports = typeDefs;