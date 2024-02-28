const typeDefs = `
  type User {
    _id: ID
    email: String
    username: String
    reviews: [Review!]
    token: ID
  }

  type Review {
    _id: ID!
    user: String!
    review: String!
    rating: Int!
    createdAt: String!
    cityName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    # add new review
    addReview(user: String!, review: String!, rating: Int!, createdAt: String!, cityName: String!): Review
  }
`;

module.exports = typeDefs;