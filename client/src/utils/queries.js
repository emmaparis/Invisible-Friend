import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      friends {
        _id
        name
        language
        age
        mood
      }
      experts {
        _id
        name
        language
        expertise
      }
    }
  }
`;

export const USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      username
      email
      friends {
        _id
        name
        language
        age
        mood
      }
      experts {
        _id
        name
        language
        expertise
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
        language
        age
        mood
      }
      experts {
        _id
        name
        language
        expertise
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
      user {
        _id
        username
        email
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
      user {
        _id
        username
        email
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
      user {
        _id
        username
        email
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
      user {
        _id
        username
        email
      }
    }
  }
`;

export const PROMPT = gql`
  query prompt(_id: $id){
    prompt {
      _id
      body
    }
  }
`;
