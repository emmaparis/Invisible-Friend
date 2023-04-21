import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useSpeechSynthesis } from 'react-speech-kit';
import { PROMPT, QUERY_FRIEND } from '../utils/queries';
import { useMutation } from '@apollo/client'
import { UPDATE_FRIEND_HISTORY } from '../utils/mutations';
import Message from '../subcomponents/Message';
import audioIcon from '../assets/images/audioIcon.png'
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
  HStack
} from '@chakra-ui/react';

export default function Prompt(props) {
  const [userInput, setUserInput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [getPromptResponse, { loading, error, data }] = useLazyQuery(PROMPT);
  const [getFriend, { data: friendData, error: friendError, loading: friendLoading }] = useLazyQuery(QUERY_FRIEND);
  const [updateFriend, { data: updateData,error: updateError, loading: updateLoading }] = useMutation(UPDATE_FRIEND_HISTORY);
  // const [friendId, setFriendId] = useState('')

  const friendId = '6442d19f3909f5e455d96e3d';
  const loggedInUserId = '6442ce783909f5e455d96e31';

  // if window.location.hash friend doesnt exist 404
  // if friend does not match user 404
  // else run

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
    const message = { role: 'user', content: userInputLocal };
    await updateFriend({
      variables: { _id: friendId, message: message },
    });
    setUserInput('');
    const response = await getPromptResponse({
      variables: {
        input: userInputLocal,
        friendType: friendSelect.value,
        temperament: temperamentSelect.value,
        age: parseInt(ageSelect.value),
        language: languageSelect.value,
      },
    });

    setPromptResponse(response.data.prompt);

    try {
      const sysMessage = { role: 'system', content: response.data.prompt };
      await updateFriend({
        variables: { _id: friendId, message: sysMessage },
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function onLoad() {
    const friend = await getFriend({
      variables: {
        id: friendId,
      },
    });

    console.log(friend.data.friend.history);
    setMessages(friend.data.friend.history);
    // console.log(friend.data.friend._id);
    // setFriendId(friend.data.friend._id)
  }

  useEffect(() => {
    onLoad();
  }, [friendData, friendError, friendLoading]);

  const [text, setText] = useState('Hello this is a test');
  const {speak} = useSpeechSynthesis();

  const handleOnClick = (text) => {
    speak({text:text})
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
                    role={message.role}
                    content={message.content}
                  />
                ))}{' '}
                {loading ? (
                  <Message role={'system'} content={'Loading'} />
                ) : (
                <>
                  {/* <Message role={'system'} content={promptResponse} /> */}
                  {/* <Button
                  minWidth={20}
                  mr={5}
                  className="genButton"
                  value="Play"
                  type="button"
                  onClick={()=>{handleOnClick(promptResponse)}}
                  >
                      <img src={audioIcon} style={{height:'100%'}} alt='volume button.'></img>
                  </Button> */}
                </>
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
                            width: '70%',
                            marginRight:'0'
                          }}
                          placeholder="What do you want to say?"
                          name="request"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                        />
                        <InputRightElement
                          style={{ display: 'flex', flexDirection: 'row', width:'30%'}}
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