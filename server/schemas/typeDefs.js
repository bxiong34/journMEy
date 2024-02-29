const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    reviews: [Review]
  }

  type Review {
    _id: ID!
    user: ID!
    review: String!
    rating: Int!
    cityName: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    user: User
    review: [Review]!
    allUsers: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(user: ID!, review: String!, rating: Int!, cityName: String!, createdAt: String!): Review!
  }
`;

module.exports = typeDefs;