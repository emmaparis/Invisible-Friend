const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    friends: [Friend]
    experts: [Expert]
  }

  type Message {
    role: String!
    content: String!
  }

  input inputMessage {
    role: String!
    content: String!
  }

  type Friend {
    _id: ID!
    name: String!
    language: String!
    age: Int!
    mood: String!
    user: User!
    history: [Message!]
    avatar : String!
  }

  type Expert {
    _id: ID!
    name: String!
    language: String!
    expertise: String!
    user: User!
    history: [Message!],
    avatar : String!
  }

  type Auth {
    token: ID!
    username: User
  }

  type Prompt {
    _id: ID!
    body: String!
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    friends: [Friend]
    friend(_id: ID!): Friend
    experts: [Expert]
    expert(_id: ID!): Expert
<<<<<<< HEAD
    prompt(
      input: String!
      friendType: String!
      temperament: String!
      age: Int!
      language: String!
    ): String
=======
    prompt(input: String!, friendType: String!, temperament: String!, age: Int!, language: String!, avatar: String!): String
>>>>>>> 35331e6f56f62c78104730a85c36e9ed1db2aab7
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(_id: ID!, username: String!, email: String!): User
    deleteUser(_id: ID!): User
    addFriend(
      name: String!
      language: String!
      age: Int!
      mood: String!
      user: String!
      history: [inputMessage]
      avatar : String!
    ): Friend
    updateFriend(
      _id: ID!
      name: String!
      language: String!
      age: Int!
      mood: String!
      user: String!
      history: [inputMessage]
      avatar : String!
    ): Friend
    updateFriendHistory(_id: ID!, message: inputMessage): Friend
    updateExpertHistory(_id: ID!, message: inputMessage): Expert
    deleteFriend(_id: ID!): Friend
    addExpert(
      name: String!
      language: String!
      expertise: String!
      user: String!
      history: [inputMessage]
      avatar : String!
    ): Expert
    updateExpert(
      _id: ID!
      name: String!
      language: String!
      expertise: String!
      user: String!
      history: [inputMessage]
      avatar : String!
    ): Expert
    deleteExpert(_id: ID!): Expert
  }
`;

module.exports = typeDefs;
