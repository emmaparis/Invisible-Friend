import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const UPDATE_USERDATA = gql`
  mutation updateUser($_id: ID!, $username: String!, $email: String!) {
    updateUser(_id: $_id, username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
      username
      email
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend(
    $name: String!
    $language: String!
    $age: Int!
    $mood: String!
    $user: String!
    $avatar: String
    $history: [inputMessage]
  ) {
    addFriend(
      name: $name
      language: $language
      age: $age
      mood: $mood
      user: $user
      avatar: $avatar
      history: $history
    ) {
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

export const UPDATE_FRIEND = gql`
  mutation updateFriend(
    $_id: ID!
    $name: String!
    $language: String!
    $age: Int!
    $mood: String!
    $user: String!
    $avatar: String
    $history: [inputMessage]
  ) {
    updateFriend(
      _id: $_id
      name: $name
      language: $language
      age: $age
      mood: $mood
      user: $user
      avatar: $avatar
      history: $history
    ) {
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

export const UPDATE_FRIEND_HISTORY = gql`
  mutation updateFriendHistory($_id: ID!, $message: inputMessage!) {
    updateFriendHistory(_id: $_id, message: $message) {
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
      history {
        role
        content
      }
    }
  }
`;

export const UPDATE_EXPERT_HISTORY = gql`
  mutation updateExpertHistory($_id: ID!, $message: inputMessage!) {
    updateExpertHistory(_id: $_id, message: $message) {
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

export const DELETE_FRIEND = gql`
  mutation deleteFriend($_id: ID!) {
    deleteFriend(_id: $_id) {
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

export const ADD_EXPERT = gql`
  mutation addExpert(
    $name: String!
    $language: String!
    $expertise: String!
    $user: String!
    $avatar: String
    $history: [inputMessage]
  ) {
    addExpert(
      name: $name
      language: $language
      expertise: $expertise
      user: $user
      avatar: $avatar
      history: $history
    ) {
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

export const UPDATE_EXPERT = gql`
  mutation updateExpert(
    $_id: ID!
    $name: String!
    $language: String!
    $expertise: String!
    $user: String!
    $avatar: String
    $history: [inputMessage]
  ) {
    updateExpert(
      _id: $_id
      name: $name
      language: $language
      expertise: $expertise
      user: $user
      avatar: $avatar
      history: $history
    ) {
      _id
      username
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

export const DELETE_EXPERT = gql`
  mutation deleteExpert($_id: ID!) {
    deleteExpert(_id: $_id) {
      _id
    }
  }
`;
