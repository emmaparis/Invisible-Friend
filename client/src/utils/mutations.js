import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    name: String!, 
    email: String!, 
    password: String!) {
    addUser(name: String!, 
        email: String!, 
        password: String!) {
      _id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
    mutation updateUser(
        _id: ID!
        name: String!
        email: String!
        password: String!
    ) {
        updateUser(
            _id: ID!
            name: String!
            email: String!
            password: String!
        ) {
            _id
            name
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser(_id: ID!) {
        deleteUser(_id: ID!) {
            _id
            name
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
        history: [inputMessage]
    ) {
        addFriend(
            name: String!
            language: String!
            age: Int!
            mood: String!
            user: String!
            history: [inputMessage]
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
            history {
                role
                content
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
        history: [inputMessage]
    ) {
        updateFriend(
            _id: ID!
            name: String!
            language: String!
            age: Int!
            mood: String!
            user: String!
            history: [inputMessage]
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
            history {
                role
                content
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
            history {
                role
                content
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
        history: [inputMessage]
    ) {
        addExpert(
            name: String!
            language: String!
            expertise: String!
            user: String!
            history: [inputMessage]
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
            history {
                role
                content
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
        history: [inputMessage]
    ) {
        updateExpert(
            _id: ID!
            name: String!
            language: String!
            expertise: String!
            user: String!
            history: [inputMessage]
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
            history {
                role
                content
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
            history {
                role
                content
            }
        }
    }
`;
