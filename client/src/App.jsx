import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Header from './components/Header';
import Create from './pages/Create';
import Prompt from './pages/Prompt';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import Avatar from './pages/Avatar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  // const [count, setCount] = useState(0);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Header />
          {/* <Body /> */}
          {/* <Prompt /> */}
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
