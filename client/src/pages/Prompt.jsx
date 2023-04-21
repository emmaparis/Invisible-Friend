<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useSpeechSynthesis } from 'react-speech-kit';
import { PROMPT, QUERY_FRIEND } from '../utils/queries';
import Message from '../subcomponents/Message';
=======
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { PROMPT } from '../utils/queries';
import avatar from '../assets/images/avatars/avatar-1.png';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
  const [messages, setMessages] = useState([]);
  const [getPromptResponse, { loading, error, data }] = useLazyQuery(PROMPT);
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  const friendId = '6442ae591be626f5ceda3483';
  const loggedInUserId = '6442acd01be626f5ceda347a';

  const [
    getFriend,
    { data: friendData, error: friendError, loading: friendLoading },
  ] = useLazyQuery(QUERY_FRIEND);

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const {
    friendSelect,
    temperamentSelect,
    ageSelect,
    languageSelect,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    avatarSelect,
>>>>>>> Stashed changes
=======
    avatarSelect,
>>>>>>> Stashed changes
    promptEntered,
    setFriendSelect,
    setTemperamentSelect,
    setAgeSelect,
    setLanguageSelect,
    setPromptEntered,
  } = props;

  async function onSubmit(event) {
    event.preventDefault();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const userInputLocal = userInput;
    setUserInput('');
    const response = await getPromptResponse({
      variables: {
        input: userInputLocal,
=======
=======
>>>>>>> Stashed changes
    console.log(props);
    console.log(userInput);
    // const {
    //   data: { prompt },
    // }
    const response = await getPromptResponse({
      variables: {
        input: userInput,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        friendType: friendSelect.value,
        temperament: temperamentSelect.value,
        age: parseInt(ageSelect.value),
        language: languageSelect.value,
      },
    });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    console.log(response.data.prompt);
>>>>>>> Stashed changes
    setPromptResponse(response.data.prompt);
  }

  async function onLoad() {
    const friend = await getFriend({
      variables: {
        id: friendId,
      },
    });

    console.log(friend.data.friend.history);
    setMessages(friend.data.friend.history);
  }

  useEffect(() => {
    onLoad();
  }, [friendData, friendError, friendLoading]);

  const [text,setText] = useState('Hello this is a test');
  const {speak} = useSpeechSynthesis();

  const handleOnClick = () => {
    speak({text:text})
=======
    console.log(response.data.prompt);
    setPromptResponse(response.data.prompt);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
            <img src={avatarSelect} />
>>>>>>> Stashed changes
=======
            <img src={avatarSelect} />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <div id="chat-container">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                ))}{' '}
                {loading ? (
                  <Message role={'system'} content={'Loading'} />
                ) : (
                  <Message role={'system'} content={promptResponse} />
                )}
              </div>
=======
=======
>>>>>>> Stashed changes
              <Card
                sx={{
                  height: '300px',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  color: 'black',
                }}
              >
                {loading ? <div>Loading...</div> : <p>{promptResponse}</p>}
              </Card>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                            value="Play"
                            type="button"
                            onClick={()=>{handleOnClick()}}
                          >
                            Play Sound
                          </Button>
                          <Button
                            minWidth={100}
                            mr={10}
                            className="genButton"
=======
>>>>>>> Stashed changes
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
