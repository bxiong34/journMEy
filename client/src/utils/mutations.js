import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }`;

  export const ADD_REVIEW = gql`
  mutation addReview($user: ID!, $review: String!, $rating: Int!, $cityName: String!, $createdAt: String!) {
    addReview(user: $user, review: $review, rating: $rating, cityName: $cityName, createdAt: $createdAt) {
      _id
      user
      review
      rating
      cityName
      createdAt
    }
  }
`;