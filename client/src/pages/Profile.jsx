import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Stack,
  Box,
  StackDivider,
  Button,
  useBoolean,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { UPDATE_USER } from '../utils/actions';
import {
  UPDATE_USERDATA,
  DELETE_EXPERT,
  DELETE_FRIEND,
  DELETE_USER,
} from '../utils/mutations';
import UpdatePassword from '../subcomponents/UpdatePassword';
import avatara from '../assets/images/avatars/avatar-1.png';
import avatarb from '../assets/images/avatars/avatar-2.png';
import avatarc from '../assets/images/avatars/avatar-3.png';
import avatard from '../assets/images/avatars/avatar-4.png';
import avatare from '../assets/images/avatars/avatar-5.png';
import avatarf from '../assets/images/avatars/avatar-6.png';

const avatars = {
  avatar1: avatara,
  avatar2: avatarb,
  avatar3: avatarc,
  avatar4: avatard,
  avatar5: avatare,
  avatar6: avatarf,
};

function Profile() {
  const [state, dispatch] = useStoreContext();
  const [usernameFlag, setUsernameFlag] = useBoolean();
  const [emailFlag, setEmailFlag] = useBoolean();
  const [newUsernameState, setNewUsernameState] = useState(state.user.username);
  const [newEmailState, setNewEmailState] = useState(state.user.email);
  const [newExpertState, setNewExpertState] = useState(state.user.experts);
  const [newFriendState, setNewFriendState] = useState(state.user.friends);
  const [isOpen, setIsOpen] = useState(false);
  const [expertData, setExpertData] = useState({
    name: '',
    id: '',
    type: '',
  });
  const userData = state.user;

  const cancelRef = React.useRef();

  const onOpen = (name, id, type) => {
    setExpertData({
      name,
      id,
      type,
    });
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

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
    fetchPolicy: 'network-only',
    pollInterval: 500,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (state.user.username === '') {
      loadUserData();
    }
  }, [state]);

  useEffect(() => {
    loadUserData();
    console.log('userData', userData);
  }, []);

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

  const [updateUsername, { usernameData, usernameLoading, usernameError }] =
    useMutation(UPDATE_USERDATA, {
      variables: {
        _id: userData._id,
        username: newUsernameState,
        email: userData.email,
      },
      context: {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      },
    });

  const [updateExpert, { upExpertData, expertLoading, expertError }] =
    useMutation(UPDATE_USERDATA, {
      context: {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      },
    });

  const [deleteExpert, { deleteData, deleteLoading, deleteError }] =
    useMutation(DELETE_EXPERT, {
      context: {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      },
    });

  const [updateFriend, { upFriendData, friendLoading, friendError }] =
    useMutation(UPDATE_USERDATA, {
      context: {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      },
    });

  const [
    deleteFriend,
    { deleteFriendData, deleteFriendLoading, deleteFriendError },
  ] = useMutation(DELETE_FRIEND, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
  });

  const [deleteUser, { deleteUserData, deleteUserLoading, deleteUserError }] =
    useMutation(DELETE_USER, {
      context: {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      },
    });

  const handleUsernameChange = (event) => {
    const { value } = event.target;

    setNewUsernameState(value);
  };

  const handleEditUsernameSubmit = () => {
    updateUsername();
    loadUserData(), setUsernameFlag.off();
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;

    setNewEmailState(value);
  };

  useEffect(() => {}, [handleEmailChange, handleUsernameChange, deleteExpert]);

  const handleEditEmailSubmit = () => {
    updateEmail();
    loadUserData(), setEmailFlag.off();
  };

  const handleDeleteExpert = async (id, event) => {
    await deleteExpert({
      variables: {
        _id: id,
      },
    });
    loadUserData();
    setNewExpertState(newExpertState.filter((expert) => expert._id !== id));
    updateExpert({
      variables: {
        ...userData,
        experts: newExpertState,
      },
    });

    onClose();
  };

  const handleDeleteFriend = async (id, event) => {
    await deleteFriend({
      variables: {
        _id: id,
      },
    });
    loadUserData();
    setNewFriendState(newFriendState.filter((friend) => friend._id !== id));
    updateFriend({
      variables: {
        ...userData,
        friends: newFriendState,
      },
    });

    onClose();
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      await deleteUser({
        variables: {
          _id: userData._id,
        },
      });
      Auth.logout();
      window.location.assign('/');
    }
  };

  return (
    <div className="mainPage">
      <Card className="mainCard" width="50%">
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
                  onClick={handleEditUsernameSubmit}
                >
                  Save
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
                <>
                  <Button colorScheme="red" onClick={onOpen} size="sm">
                    Delete
                  </Button>

                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader
                          fontSize="lg"
                          fontWeight="bold"
                          size="sm"
                        >
                          Delete Yourself
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure you want to delete yourself?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={handleDeleteUser}
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </>
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
                        margin: '2px',
                        width: '150%',
                        height: '90%',
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
                Password
              </Heading>
              <Stack direction="row" justify="space-between">
                <Text pt="2" fontSize="sm">
                  ********
                </Text>
                <UpdatePassword />
              </Stack>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase" align="left">
                Saved Friends
              </Heading>
              <Stack direction="column" justify="space-between" width="100%">
                {userData?.friends?.map((friend) => (
                  <Stack
                    key={friend._id}
                    direction="row"
                    justify="space-between"
                  >
                    <Text pt="2" fontSize="sm" key={friend._id}>
                      {friend.name}
                    </Text>
                    <img
                      className="icon"
                      src={avatars[friend.avatar]}
                      alt="avatar"
                    />
                    <>
                      <Button
                        key={`delete${friend._id}`}
                        colorScheme="red"
                        onClick={() =>
                          onOpen(friend.name, friend._id, 'friend')
                        }
                        size="sm"
                      >
                        Delete
                      </Button>

                      <AlertDialog
                        isOpen={isOpen && expertData.type === 'friend'}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader
                              fontSize="lg"
                              fontWeight="bold"
                              size="sm"
                            >
                              Delete
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure you want to delete {expertData.name}
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={(event) => {
                                  handleDeleteFriend(expertData.id, event);
                                }}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </>
                  </Stack>
                ))}
              </Stack>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase" align="left">
                Saved Teachers
              </Heading>
              <Stack direction="column" justify="space-between">
                {userData?.experts?.map((expert) => (
                  <Stack
                    key={expert._id}
                    direction="row"
                    justify="space-between"
                  >
                    <Text pt="2" fontSize="sm" key={expert._id}>
                      {expert.name}
                    </Text>
                    <img
                      className="icon"
                      src={avatars[expert.avatar]}
                      alt="avatar"
                    />
                    <>
                      <Button
                        key={`delete${expert._id}`}
                        colorScheme="red"
                        onClick={() =>
                          onOpen(expert.name, expert._id, 'expert')
                        }
                        size="sm"
                      >
                        Delete
                      </Button>

                      <AlertDialog
                        isOpen={isOpen && expertData.type === 'expert'}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader
                              fontSize="lg"
                              fontWeight="bold"
                              size="sm"
                            >
                              Delete
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure you want to delete {expertData.name}?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={(event) => {
                                  handleDeleteExpert(expertData.id, event);
                                }}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </>
                  </Stack>
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
