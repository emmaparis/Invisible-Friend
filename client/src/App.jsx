import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import Home from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Header from './components/Header';
import Create from './pages/Create'
import Prompt from './pages/Prompt'


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Header />
          {/* <Body /> */}
          <Home />
          <Prompt />
        </ChakraProvider>
      </ApolloProvider>
  );
}

export default App;
