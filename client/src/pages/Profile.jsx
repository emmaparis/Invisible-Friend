import { React, useEffect, Fragment, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Stack,
  Box,
  StackDivider,
  Button,
  useBoolean,
  Input,
} from '@chakra-ui/react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { UPDATE_USER } from '../utils/actions';
import { UPDATE_USERDATA } from '../utils/mutations';

function Profile() {
  const [state, dispatch] = useStoreContext();
  const [usernameFlag, setUsernameFlag] = useBoolean();
  const [newUsernameState, setNewUsernameState] = useState('');
  const [emailFlag, setEmailFlag] = useBoolean();
  const [newEmailState, setNewEmailState] = useState('');
  const userData = state.user;
  const [loadUserData, { called, loading, data }] = useLazyQuery(QUERY_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
    onCompleted: (data) => {
      dispatch({
        type: UPDATE_USER,
        user: data.me,
      });
    },
  });

  const [updateEmail, { emailData, emailLoading, emailError }] = useMutation(
    UPDATE_USERDATA,
    {
      variables: {
        _id: userData._id,
        username: userData.username,
        email: newEmailState,
      },
      context: {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      },
    }
  );

  useEffect(() => {
    if (state.user.username === '') {
      loadUserData();
    }
  }, [state.user.username]);

  const handleUsernameChange = () => {
    const { value } = event.target;

    setNewUsernameState(value);
  };

  const handleEmailChange = () => {
    const { value } = event.target;

    setNewEmailState(value);
    console.log('value', value);
  };

  useEffect(() => {}, [handleEmailChange, handleUsernameChange]);

  const handleEditEmailSubmit = () => {
    console.log({
      _id: userData._id,
      username: userData.username,
      email: newEmailState,
    });
    updateEmail();
    loadUserData(), setEmailFlag.off();
  };

  return (
    <div className="mainPage">
      <Card className="mainCard">
        <CardHeader>
          {usernameFlag ? (
            <Stack direction="row" justify="space-between">
              <Heading size="md">
                <Input
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    paddingLeft: '5px',
                    margin: '5px',
                    width: '150%',
                  }}
                  placeholder={userData.username}
                  name="newUsername"
                  type="text"
                  value={newUsernameState}
                  onChange={handleUsernameChange}
                />
              </Heading>
              <Stack spacing={4} direction="row" justify="right">
                <Button
                  variant="solid"
                  colorScheme="teal"
                  size="sm"
                  onClick={setUsernameFlag.off}
                >
                  Save
                </Button>
                <Button colorScheme="red" size="sm">
                  Delete
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack direction="row" justify="space-between">
              <Heading size="md">{userData.username}</Heading>
              <Stack spacing={4} direction="row" justify="right">
                <Button
                  variant="solid"
                  colorScheme="teal"
                  size="sm"
                  onClick={setUsernameFlag.on}
                >
                  Edit
                </Button>
                <Button colorScheme="red" size="sm">
                  Delete
                </Button>
              </Stack>
            </Stack>
          )}
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {emailFlag ? (
              <Box>
                <Heading size="xs" textTransform="uppercase" align="left">
                  E-mail
                </Heading>
                <Stack direction="row" justify="space-between">
                  <Text pt="2" fontSize="sm">
                    <Input
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        paddingLeft: '5px',
                        margin: '5px',
                        width: '150%',
                      }}
                      placeholder={userData.email}
                      name="newEmail"
                      type="text"
                      value={newEmailState}
                      onChange={handleEmailChange}
                    />
                  </Text>
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    size="sm"
                    onClick={handleEditEmailSubmit}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Box>
                <Heading size="xs" textTransform="uppercase" align="left">
                  E-mail
                </Heading>
                <Stack direction="row" justify="space-between">
                  <Text pt="2" fontSize="sm">
                    {userData.email}
                  </Text>
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    size="sm"
                    onClick={setEmailFlag.on}
                  >
                    Edit
                  </Button>
                </Stack>
              </Box>
            )}

            <Box>
              <Heading size="xs" textTransform="uppercase" align="left">
                Saved Friends
              </Heading>
              <Stack direction="row" justify="space-between">
                {userData?.friends?.map((friend) => (
                  <Fragment key={friend._id}>
                    <Text pt="2" fontSize="sm" key={friend._id}>
                      {friend.name}
                    </Text>
                    <Button
                      variant="solid"
                      colorScheme="red"
                      size="sm"
                      key={`delete${friend._id}`}
                    >
                      Delete
                    </Button>
                  </Fragment>
                ))}
              </Stack>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" align="left">
                Saved Teachers
              </Heading>
              <Stack direction="row" justify="space-between">
                {userData?.experts?.map((expert) => (
                  <Fragment key={expert._id}>
                    <Text pt="2" fontSize="sm" key={expert._id}>
                      {expert.name}
                    </Text>
                    <Button
                      variant="solid"
                      colorScheme="red"
                      size="sm"
                      key={`delete${expert._id}`}
                    >
                      Delete
                    </Button>
                  </Fragment>
                ))}
              </Stack>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
