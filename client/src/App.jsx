import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Prompt from './pages/Prompt';
import Create from './pages/Create';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import NotFound from './pages/NotFound';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [friendSelect, setFriendSelect] = useState('')
  const [temperamentSelect, setTemperamentSelect] = useState('')
  const [ageSelect, setAgeSelect] = useState('')
  const [languageSelect, setLanguageSelect] = useState('')
  const [promptEntered, setPromptEntered] = useState('')
  const options = {friendSelect, temperamentSelect, ageSelect, languageSelect, promptEntered, setFriendSelect, setTemperamentSelect, setAgeSelect, setLanguageSelect, setPromptEntered}

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create {...options}/>} />
            <Route path="/prompt" element={<Prompt {...options}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
