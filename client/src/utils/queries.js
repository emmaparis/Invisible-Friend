import { gql } from '@apollo/client';

export const PROMPT = gql`
  {
    prompt {
      _id
      body
    }
  }
`;
