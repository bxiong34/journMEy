const typeDefs = `
  type User {
    _id: ID!
    email: String!
    username: String!
    reviews: [Review!]!
  }

  type Review {
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
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    #add new user
    addUser(email: String!, username: String!, xpassword: String!): Auth
    login(email: String!, password: String!): Auth

    # add new review
    addReview(user: String!, review: String!, rating: Int!, createdAt: String!, cityName: String!): Review
  }
`;

module.exports = typeDefs;