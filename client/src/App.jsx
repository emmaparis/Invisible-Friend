import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './utils/GlobalState';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Prompt from './pages/Prompt';
import Create from './pages/Create';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          friends: {
            merge(existing = [], incoming) {
              return { ...existing, ...incoming };
            },
          },
          experts: {
            merge(existing = [], incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <StoreProvider>
            <Header />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/prompt/:type/:id" element={<Prompt />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StoreProvider>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
