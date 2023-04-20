import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Heading,
  Stack,
  Box,
  StackDivider,
  Input,
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function SignUp() {
  const navigateTo = useNavigate();
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordContent, setPasswordContent] = useState('');

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePassChange = (event) => {
    const { value } = event.target;

    setPasswordContent(value);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (formState.password !== passwordContent) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const { data } = await addUser({
        variables: formState,
      });

      Auth.login(data.addUser.token);
      navigateTo('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='mainPage'>
    <Card className='mainCard'
      sx={{
        margin: '8rem',
        backgroundColor: '#E6FFFA',
        boxShadow: '8px 5px 5px #B2F5EA',
        borderRadius: '2rem',
      }}
    >
      <CardHeader>
        <Heading fontSize="5xl" size="md" m={8}>
          Sign Up
        </Heading>
      </CardHeader>
      <CardBody
        sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}
      >
        <Stack divider={<StackDivider />} spacing="4">
          <form onSubmit={handleFormSubmit}>
            <Box>
              <Heading size="s" textTransform="uppercase">
                Name
              </Heading>
              <Input
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  paddingLeft: '5px',
                  margin: '5px',
                  width: 'fit-content',
                }}
                className="username"
                placeholder="username"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase">
                Email
              </Heading>
              <Input
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  paddingLeft: '5px',
                  margin: '5px',
                  width: 'fit-content',
                }}
                className="formInput"
                placeholder="example@example.com"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Box>
            <Box mb={3}>
              <Heading size="s" textTransform="uppercase">
                Password
              </Heading>
              <Input
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  paddingLeft: '5px',
                  margin: '5px',
                  width: 'fit-content',
                }}
                type="password"
                placeholder="Password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
              <Input
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  paddingLeft: '5px',
                  margin: '5px',
                  width: 'fit-content',
                }}
                type="password"
                className="formInput"
                placeholder="Confirm Password"
                onChange={handlePassChange}
                name="confirmPassword"
                value={passwordContent}
              />
            </Box>
            <Button
              mb={5}
              sx={{ backgroundColor: '#319795', color: 'white' }}
              variant="outline"
              type="submit"
              onClick={handleFormSubmit}
            >
              Create Account
            </Button>
          </form>
          {error && (
            <Box
              sx={{
                backgroundColor: 'red',
                color: 'white',
                padding: '1rem',
                borderRadius: '1rem',
              }}
            >
              {error.message}
            </Box>
          )}
          {!passwordsMatch && (
            <Box
              sx={{
                backgroundColor: 'red',
                color: 'white',
                padding: '1rem',
                borderRadius: '1rem',
              }}
            >
              Passwords do not match
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
    </div>
  );
}
