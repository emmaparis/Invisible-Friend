import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Header from './components/Header';
import Create from './pages/Create'
import Prompt from './pages/Prompt'
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';


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
          {/* <Body /> */}
          {/* <Prompt /> */}
          {/* <SignUp /> */}
          {/* <LogIn /> */}
        </ChakraProvider>
      </ApolloProvider>
  );
}

export default App;
