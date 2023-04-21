import React from 'react';
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
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_ME } from '../utils/queries';

function Profile() {
  const [state, dispatch] = useStoreContext();
  const userData = state.user;

  if (!userData) {
    const { error, data } = useQuery(QUERY_ME, {
      context: {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      },
    });
    dispatch({
      type: UPDATE_USER,
      user: data.me,
    });
  }

  console.log('state', userData);
  console.log(userData.username);

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
                  <>
                    <Text pt="2" fontSize="sm" key={friend._id}>
                      {friend.name}
                    </Text>
                    <Button variant="solid" colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </>
                ))}
              </Stack>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" align="left">
                Saved Teachers
              </Heading>
              <Stack direction="row" justify="space-between">
                {userData?.experts?.map((expert) => (
                  <>
                    <Text pt="2" fontSize="sm" key={expert._id}>
                      {expert.name}
                    </Text>
                    <Button variant="solid" colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </>
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
