const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Friend {
    _id: ID
    name: String
    language: String
    age: Int
    mood: String
    user: User
  }

  type Expert {
    _id: ID
    name: String
    language: String
    expertise: String
    user: User
  }
`;

module.exports = typeDefs;
