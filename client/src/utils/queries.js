import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user {
    user {
    _id
    username
    email
    reviews {
      _id
      review
      rating
      cityName
      createdAt
    }
  }
}
`;

export const QUERY_REVIEW = gql`
  query review {
    review {
      _id
      review
      rating
      createdAt
      user {
        username
        email
      }
    }
  }
`;

export const QUERY_ALLUSERS = gql`
  query allUsers {
    allUsers {
      _id
      username
      email
      reviews {
        _id
        review
        rating
        cityName
        createdAt
      }
    }
  }
`;