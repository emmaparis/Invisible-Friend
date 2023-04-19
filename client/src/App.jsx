import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import Header from './components/Header';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  // const [count, setCount] = useState(0);

  return (
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Header />
          <Body />
        </ChakraProvider>
      </ApolloProvider>
  );
}

export default App;
