import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { PROMPT, QUERY_FRIEND } from '../utils/queries';
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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Center,
  Text,
  ButtonGroup,
  Textarea,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';

export default function Prompt(props) {
  const [userInput, setUserInput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [getPromptResponse, { loading, error, data }] = useLazyQuery(PROMPT);
  const {
    friendSelect,
    temperamentSelect,
    ageSelect,
    languageSelect,
    promptEntered,
    setFriendSelect,
    setTemperamentSelect,
    setAgeSelect,
    setLanguageSelect,
    setPromptEntered,
  } = props;

  async function onSubmit(event) {
    event.preventDefault();
    const userInputLocal = userInput;
    setUserInput('');
    console.log(props);
    console.log(userInputLocal);
    // const {
    //   data: { prompt },
    // }
    const response = await getPromptResponse({
      variables: {
        input: userInputLocal,
        friendType: friendSelect.value,
        temperament: temperamentSelect.value,
        age: parseInt(ageSelect.value),
        language: languageSelect.value,
      },
    });

    console.log(response.data.prompt);
    setPromptResponse(response.data.prompt);
  }

  //displaying the messages in the screen
  const friendId = '6441b39ca4329807ba3f32b5';
  const loggedInUserId = '6441736451f5db0da79c37ee';

  // const {
  //   data: friendData,
  //   error: friendError,
  //   loading: friendLoading,
  // } = useQuery(QUERY_FRIEND, {
  //   variables: { _id: friendId },
  // });

  const { data: friendData, error: friendError, loading: friendLoading } = '';

  const [messages, setMessages] = useState([]);
  function OnLoad() {
    if (!friendLoading && !friendError && friendData) {
      const friend = friendData.getFriendById;
      if (friend.user !== loggedInUserId) {
        console.error('Friend belongs to another user');
        return;
      }
      setMessages(friend.history);
    } else if (!friendLoading && !friendData) {
      const messagesData = [
        { type: 'user', content: 'Hello!' },
        { type: 'system', content: 'Welcome to the chat.' },
      ];
      setMessages(messagesData);
    }
  }
  useEffect(() => {
    OnLoad();
  }, [friendData, friendError]);

  function Message({ type, content }) {
    return <div className={`message ${type}`}>{content}</div>;
  }

  return (
    <div className="mainPage">
      <Card
        className="mainCard"
        sx={{
          margin: '8rem',
          backgroundColor: '#E6FFFA',
          boxShadow: '8px 5px 5px #B2F5EA',
          borderRadius: '2rem',
        }}
      >
        <CardHeader>
          <Heading fontSize="5xl" size="md" m={3} mb={0}>
            Talk to 'Friend Name'
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <div
                style={{
                  display: 'flex',
                  flexDirecion: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                }}
              >
                <Text fontSize="lg">Friend Name</Text>
                &emsp;
                <ButtonGroup>
                  <Button
                    colorScheme="teal"
                    style={{ color: 'white' }}
                    size="sm"
                  >
                    Save Friend
                  </Button>
                  <Button colorScheme="teal" size="sm">
                    Edit Friend
                  </Button>
                  <Button colorScheme="teal" size="sm">
                    Remove Friend
                  </Button>
                </ButtonGroup>
              </div>
            </Box>
            <Box>
              <div id="chat-container">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    type={message.type}
                    content={message.content}
                  />
                ))}
                {loading ? (
                  <Message type={'system'} content={'Loading'} />
                ) : (
                  <Message type={'system'} content={promptResponse} />
                )}
              </div>
              <Box mt={5}>
                <div
                  style={{
                    display: 'flex',
                    flexDirecion: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <FormControl>
                    <form onSubmit={onSubmit}>
                      <InputGroup>
                        <Input
                          type="text"
                          sx={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            marginTop: '5px',
                            maxWidth: '80%',
                          }}
                          placeholder="What do you want to say?"
                          name="request"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                        />
                        <InputRightElement
                          style={{ display: 'flex', flexDirection: 'row' }}
                        >
                          <Button
                            minWidth={100}
                            mr={10}
                            className="genButton"
                            value="Generate"
                            type="submit"
                          >
                            Send
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </form>
                  </FormControl>
                </div>
              </Box>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}
