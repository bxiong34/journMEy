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

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    # add new review
    addReview(username: String!, review: String!, rating: Int!): Review
  }
`;

module.exports = typeDefs;