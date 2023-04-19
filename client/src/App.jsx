import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { ChakraProvider, Button } from '@chakra-ui/react'
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';



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
        </ChakraProvider>
      </ApolloProvider>
  );
}

export default App;
