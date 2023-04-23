import React, { useState, useEffect } from 'react';
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
import { useSpeechSynthesis } from 'react-speech-kit';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
  PROMPT_FRIEND,
  PROMPT_EXPERT,
  QUERY_FRIEND,
  QUERY_EXPERT,
} from '../utils/queries';
import {
  UPDATE_FRIEND_HISTORY,
  UPDATE_EXPERT_HISTORY,
} from '../utils/mutations';
import Message from '../subcomponents/Message';
import PromptHeader from '../subcomponents/PromptHeader';
import audioIcon from '../assets/images/audioIcon.png';

// Prompt component for interacting with a chatbot (Friend or Expert)
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

  // Function to handle the chat submission
  async function onSubmit(event) {
    event.preventDefault();
    const userInputLocal = userInput;
    setUserInput('');
    const message = { role: 'user', content: userInputLocal };
    let response;
    if (type === 'Friend') {
      // Fetch friend data and update the conversation history

      await updateFriend({
        variables: { _id: typeId, message: message },
      });

      const friend = await getFriend({
        variables: {
          id: typeId,
        },
      });

      // Create context for the bot
      const history = friend.data.friend.history;
      const contextArray = [];
      // Add the 10 most recent messages
      for (let i = Math.max(history.length - 10, 1); i < history.length; i++) {
        contextArray.push(history[i]);
      }

      // Function to estimate token count
      const estimateTokenCount = (str) => Math.ceil(str.length / 4);

      // Check if the context exceeds the 2000-token limit
      const tokenLimit = 2000;
      let context = contextArray
        .map((message) => `${message.role}: ${message.content}`)
        .join('\n');
      let tokenCount = estimateTokenCount(context);

      while (tokenCount > tokenLimit) {
        // Remove the oldest message
        contextArray.splice(0, 1);
        context = contextArray
          .map((message) => `${message.role}: ${message.content}`)
          .join('\n');
        tokenCount = estimateTokenCount(context);
      }

      console.log('This is Context', context);

      // Get the chatbot response
      response = await getFriendPromptResponse({
        variables: {
          input: context,
          friendType: type,
          temperament: friend.data.friend.mood,
          age: friend.data.friend.age,
          language: friend.data.friend.language,
        },
      });
      setPromptResponse(response.data.prompt);
    } else {
      // Fetch expert data and update the conversation history
      await updateExpert({
        variables: { _id: typeId, message: message },
      });

      const expert = await getExpert({
        variables: {
          id: typeId,
        },
      });

      // Create context for the bot
      const history = expert.data.expert.history;
      const contextArray = [];

      // Add the 10 most recent messages
      for (let i = Math.max(history.length - 10, 0); i < history.length; i++) {
        contextArray.push(history[i]);
      }

      // Function to estimate token count
      const estimateTokenCount = (messages) =>
        messages.reduce(
          (count, message) => count + Math.ceil(message.content.length / 4),
          0
        );

      // Check if the context exceeds the 2000-token limit
      const tokenLimit = 2000;
      let tokenCount = estimateTokenCount(contextArray);

      while (tokenCount > tokenLimit) {
        // Remove the oldest message
        contextArray.splice(0, 1);
        tokenCount = estimateTokenCount(contextArray);
      }

      const cleanedContextArray = contextArray.map((message) => ({
        role: message.role,
        content: message.content,
      }));

      console.log('This is Context', contextArray);

      //Get the chatbot response
      response = await getExpertPromptResponse({
        variables: {
          input: cleanedContextArray,
          friendType: type,
          expertise: expert.data.expert.expertise,
          language: expert.data.expert.language,
        },
      });
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', response);
      setPromptResponse(response.data.expertPrompt);
    }

    try {
      // Update the conversation history with the chatbot's response
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

  // Function to load the chat history when the component is mounted
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
  // Load chat history based on the type (Friend or Expert)
  if (type === 'Friend') {
    useEffect(() => {
      onLoad();
    }, [friendData, friendError, friendLoading]);
  } else {
    useEffect(() => {
      onLoad();
    }, [expertData, expertError, expertLoading]);
  }
  // Text-to-speech functionality
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
          backgroundColor: '#E6FFFA',
          boxShadow: '8px 5px 5px #B2F5EA',
          borderRadius: '2rem',
          margin: '4rem',
        }}
      >
        <PromptHeader />
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
              ></div>
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
                  <Message role={'system'} content={'...'} />
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
