import { React, useEffect, Fragment } from 'react';
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
} from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { UPDATE_USER } from '../utils/actions';

function Profile() {
  const [state, dispatch] = useStoreContext();
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

  useEffect(() => {
    if (state.user.username === '') {
      loadUserData();
    }
  }, [state.user.username]);

  return (
    <div className="mainPage">
      <Card className="mainCard">
        <CardHeader>
          <Stack direction="row" justify="space-between">
            <Heading size="md">{userData.username}</Heading>
            <Stack spacing={4} direction="row" justify="right">
              <Button variant="solid" colorScheme="teal" size="sm">
                Edit
              </Button>
              <Button colorScheme="red" size="sm">
                Delete
              </Button>
            </Stack>
          </Stack>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase" align="left">
                E-mail
              </Heading>
              <Stack direction="row" justify="space-between">
                <Text pt="2" fontSize="sm">
                  {userData.email}
                </Text>
                <Button variant="solid" colorScheme="teal" size="sm">
                  Edit
                </Button>
              </Stack>
            </Box>
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
