import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      username
      email
      reviews {
        _id
        review
        rating
        createdAt
      }
    }
  }`;