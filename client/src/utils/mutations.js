import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    username: String!, 
    email: String!, 
    password: String!) {
    addUser(name: String!, 
        email: String!, 
        password: String!) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_USER = gql`
    mutation updateUser(
        _id: ID!
        username: String!
        email: String!
        password: String!
    ) {
        updateUser(
            _id: ID!
            username: String!
            email: String!
            password: String!
        ) {
            _id
            username
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser(_id: ID!) {
        deleteUser(_id: ID!) {
            _id
            username
            email
        }
    }
`;

export const ADD_FRIEND = gql`
    mutation addFriend(
        name: String!
        language: String!
        age: Int!
        mood: String!
        user: String!
    ) {
        addFriend(
            name: String!
            language: String!
            age: Int!
            mood: String!
            user: String!
        ) {
            _id
            name
            language
            age
            mood
            user {
                _id
                name
                email
            }
        }
    }
`;

export const UPDATE_FRIEND = gql`
    mutation updateFriend(
        _id: ID!
        name: String!
        language: String!
        age: Int!
        mood: String!
        user: String!
    ) {
        updateFriend(
            _id: ID!
            name: String!
            language: String!
            age: Int!
            mood: String!
            user: String!
        ) {
            _id
            name
            language
            age
            mood
            user {
                _id
                name
                email
            }
        }
    }
`;

export const DELETE_FRIEND = gql`
    mutation deleteFriend(_id: ID!) {
        deleteFriend(_id: ID!) {
            _id
            name
            language
            age
            mood
            user {
                _id
                name
                email
            }
        }
    }
`;

export const ADD_EXPERT = gql`
    mutation addExpert(
        name: String!
        language: String!
        expertise: String!
        user: String!
    ) {
        addExpert(
            name: String!
            language: String!
            expertise: String!
            user: String!
        ) {
            _id
            name
            language
            expertise
            user {
                _id
                name
                email
            }
        }
    }
`;

export const UPDATE_EXPERT = gql`
    mutation updateExpert(
        _id: ID!
        name: String!
        language: String!
        expertise: String!
        user: String!
    ) {
        updateExpert(
            _id: ID!
            name: String!
            language: String!
            expertise: String!
            user: String!
        ) {
            _id
            name
            language
            expertise
            user {
                _id
                name
                email
            }
        }
    }
`;

export const DELETE_EXPERT = gql`
    mutation deleteExpert(_id: ID!) {
        deleteExpert(_id: ID!) {
            _id
            name
            language
            expertise
            user {
                _id
                name
                email
            }
        }
    }
`;
