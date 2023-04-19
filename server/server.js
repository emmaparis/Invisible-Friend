// express
const express = require('express');
// eslint-disable-next-line
const colors = require('@colors/colors');
const path = require('path');
// apollo server
const { ApolloServer } = require('apollo-server-express');
// database connection
const db = require('./config/connection');

// graphql schemas
const { typeDefs, resolvers } = require('./schemas');
// app & port
const app = express();
const PORT = process.env.PORT || 3001;
// new apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// point to dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) =>
  res.sendFile(__dirname, '../client/dist/index.html')
);

// startserver
const startServer = async () => {
  // start apollo server
  await server.start();
  // connect express middleware for apollo
  server.applyMiddleware({ app });
  // connect the db
  db.once('open', () => {
    // start the express server
    app.listen(PORT, () => {
      console.log(
        'server running on http://localhost:3001'.white.underline.bold
      );
      console.log(
        `graphql at http://localhost:${PORT}${server.graphqlPath}`.blue
          .underline.bold
      );
    });
  });
};


startServer();
