import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Header from './components/Header';
import Prompt from './pages/Prompt';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
<<<<<<< HEAD
import Create from './pages/Create';
=======
import Create from './pages/Create'
>>>>>>> 26c8387b90d5f0caca12c315eaa45d6066c0ad10

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Header />
          <Prompt />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router> 
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
