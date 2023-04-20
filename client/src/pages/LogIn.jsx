import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Button,
  Box,
  StackDivider,
  Input,
} from '@chakra-ui/react';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LogIn = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Card
      sx={{
        margin: '8rem',
        backgroundColor: '#E6FFFA',
        boxShadow: '8px 5px 5px #B2F5EA',
        borderRadius: '2rem',
      }}
    >
      <CardHeader>
        <Heading fontSize="5xl" size="md" m={8}>
          Log In
        </Heading>
      </CardHeader>
      <CardBody
        sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}
      >
        <Stack divider={<StackDivider />} spacing="4">
          <form onSubmit={handleFormSubmit}>
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
                placeholder="email@example.com"
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
            </Box>
            <Button
              mb={5}
              sx={{ backgroundColor: '#319795', color: 'white' }}
              variant="outline"
              type="submit"
              onClick={handleFormSubmit}
            >
              Log In
            </Button>
            <Heading size="s">Don't have an account?</Heading>
            <Link to="/signup">
              <Button
                mb={5}
                sx={{ backgroundColor: '#319795', color: 'white' }}
                variant="outline"
              >
                Sign Up
              </Button>
            </Link>
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
        </Stack>
      </CardBody>
    </Card>
  );
};

export default LogIn;
