import React from 'react';
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

import Auth from '../utils/auth';

const Login = (props) => {
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

export default function LogIn() {
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
            />
          </Box>
          <Button
            mb={5}
            sx={{ backgroundColor: '#319795', color: 'white' }}
            variant="outline"
          >
            Log In
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
