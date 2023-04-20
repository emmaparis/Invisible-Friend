import { React, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

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
import { useStoreContext } from '../utils/GlobalState';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';

const LogIn = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [state, dispatch] = useStoreContext();
  const [getUserInfo, { loading, error: queryError, data: queryData }] =
    useLazyQuery(QUERY_ME);

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
      getUserInfo();
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  if (loading) return <p>Loading...</p>;
  if (queryError) return <p>Error fetching user data.</p>;

  if (queryData) {
    dispatch({
      type: 'QUERY_ME',
      payload: queryData.me,
    });
  }

  return (
    <div className="mainPage">
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
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
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
    </div>
  );
};

export default LogIn;
