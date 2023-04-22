import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useSpeechSynthesis } from 'react-speech-kit';
import {
  PROMPT_FRIEND,
  PROMPT_EXPERT,
  QUERY_FRIEND,
  QUERY_EXPERT,
} from '../utils/queries';
import { useMutation } from '@apollo/client';
import {
  UPDATE_FRIEND_HISTORY,
  UPDATE_EXPERT_HISTORY,
} from '../utils/mutations';
import Message from '../subcomponents/Message';
import audioIcon from '../assets/images/audioIcon.png';
import { useParams } from 'react-router-dom';
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
  HStack,
} from '@chakra-ui/react';

export default function Prompt(props) {
  const [userInput, setUserInput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [getFriendPromptResponse, { loading, error, data }] =
    useLazyQuery(PROMPT_FRIEND);
  const [
    getExpertPromptResponse,
    {
      loading: expertPromptLoading,
      error: expertPromptError,
      data: expertPromptData,
    },
  ] = useLazyQuery(PROMPT_EXPERT);
  const [
    getFriend,
    { data: friendData, error: friendError, loading: friendLoading },
  ] = useLazyQuery(QUERY_FRIEND);
  const [
    getExpert,
    { data: expertData, error: expertError, loading: expertLoading },
  ] = useLazyQuery(QUERY_EXPERT);
  const [
    updateFriend,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_FRIEND_HISTORY);

  const [
    updateExpert,
    {
      data: updateExpertData,
      error: updateExpertError,
      loading: updateExpertLoading,
    },
  ] = useMutation(UPDATE_EXPERT_HISTORY);
  // const [typeId, settypeId] = useState('')
  const { id, type } = useParams();
  const typeId = id;
  const loggedInUserId = '6442cc0f4d559f71b7d62ab6';

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
    expertiseSelect,
  } = props;

  async function onSubmit(event) {
    event.preventDefault();
    const userInputLocal = userInput;
    const message = { role: 'user', content: userInputLocal };
    let response;
    if (type === 'Friend') {
      const friend = await getFriend({
        variables: {
          id: typeId,
        },
      });

      await updateFriend({
        variables: { _id: typeId, message: message },
      });

      response = await getFriendPromptResponse({
        variables: {
          input: userInputLocal,
          friendType: type,
          temperament: friend.data.friend.mood,
          age: friend.data.friend.age,
          language: friend.data.friend.language,
        },
      });
      console.log('This is the response ', response);
      setPromptResponse(response.data.prompt);
    } else {
      await updateExpert({
        variables: { _id: typeId, message: message },
      });

      const expert = await getExpert({
        variables: {
          id: typeId,
        },
      });

      response = await getExpertPromptResponse({
        variables: {
          input: userInputLocal,
          friendType: type,
          expertise: expert.data.expert.expertise,
          language: expert.data.expert.language,
        },
      });
      console.log('This is the response ', response);
      setPromptResponse(response.data.expertPrompt);
    }

    setUserInput('');

    try {
      if (type === 'Friend') {
        const sysMessage = { role: 'system', content: response.data.prompt };
        await updateFriend({
          variables: { _id: typeId, message: sysMessage },
        });
      } else {
        const sysMessage = {
          role: 'system',
          content: response.data.expertPrompt,
        };
        await updateExpert({
          variables: { _id: typeId, message: sysMessage },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function onLoad() {
    if (type === 'Friend') {
      const friend = await getFriend({
        variables: {
          id: typeId,
        },
      });
      setMessages(friend.data.friend.history);
    } else {
      const expert = await getExpert({
        variables: {
          id: typeId,
        },
      });
      setMessages(expert.data.expert.history);
    }
  }

  if (type === 'Friend') {
    useEffect(() => {
      onLoad();
    }, [friendData, friendError, friendLoading]);
  } else {
    useEffect(() => {
      onLoad();
    }, [expertData, expertError, expertLoading]);
  }

  const [text, setText] = useState('Hello this is a test');
  const { speak } = useSpeechSynthesis();

  const handleOnClick = (text) => {
    speak({ text: text });
  };

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
                {loading || expertPromptLoading ? (
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
                            marginRight: '0',
                          }}
                          placeholder="What do you want to say?"
                          name="request"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                        />
                        <InputRightElement
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '30%',
                          }}
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
