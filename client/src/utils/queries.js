import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    me {
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