const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    reviews: [Review]!
  }

  type Review {
    _id: ID!
    user: String!
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(review: String!, rating: Int!, cityName: String!, createdAt: String!): Review!
  }
`;

module.exports = typeDefs;
