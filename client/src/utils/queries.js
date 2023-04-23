import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
      friends {
        _id
        name
        language
        age
        mood
        avatar
        history {
          role
          content
        }
      }
      experts {
        _id
        name
        language
        expertise
        avatar
        history {
          role
          content
        }
      }
    }
  }
`;

export const USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      name
      email
      friends {
        _id
        name
        language
        age
        mood
        avatar
        history {
          role
          content
        }
      }
      experts {
        _id
        name
        language
        expertise
        avatar
        history {
          role
          content
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      friends {
        _id
        name
        avatar
      }
      experts {
        _id
        name
        avatar
      }
    }
  }
`;

export const QUERY_FRIENDS = gql`
  query allFriends {
    friends {
      _id
      name
      language
      age
      mood
      avatar
      user {
        _id
        username
        email
      }
      history {
        role
        content
      }
    }
  }
`;

export const QUERY_FRIEND = gql`
  query Friend($id: ID!) {
    friend(_id: $id) {
      _id
      name
      language
      age
      mood
      avatar
      user {
        _id
        username
        email
      }
      history {
        role
        content
      }
    }
  }
`;

export const QUERY_EXPERTS = gql`
  query allExperts {
    experts {
      _id
      name
      language
      expertise
      avatar
      user {
        _id
        username
        email
      }
      history {
        role
        content
      }
    }
  }
`;

export const QUERY_EXPERT = gql`
  query Expert($id: ID!) {
    expert(_id: $id) {
      _id
      name
      language
      expertise
      avatar
      user {
        _id
        username
        email
      }
      history {
        role
        content
      }
    }
  }
`;

export const PROMPT_FRIEND = gql`
  query Query(
    $input: [inputMessage!]!
    $friendType: String!
    $temperament: String!
    $age: Int!
    $avatar: String
    $language: String!
    $name: String!
  ) {
    prompt(
      input: $input
      friendType: $friendType
      temperament: $temperament
      age: $age
      language: $language
      avatar: $avatar
      name: $name
    )
  }
`;

export const PROMPT_EXPERT = gql`
  query Query(
    $input: [inputMessage!]!
    $friendType: String!
    $avatar: String
    $language: String!
    $expertise: String!
  ) {
    expertPrompt(
      input: $input
      friendType: $friendType
      language: $language
      avatar: $avatar
      expertise: $expertise
    )
  }
`;
