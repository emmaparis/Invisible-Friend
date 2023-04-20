import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { PROMPT } from '../utils/queries';
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

export default function PromptJ() {
    const [userInput, setUserInput] = useState('');
    const [promptResponse, setPromptResponse] = useState('');
    const [getPromptResponse, { loading, error, data }] = useLazyQuery(PROMPT);
    async function onSubmit(event) {
        event.preventDefault();
        const {
          data: { prompt },
        } = await getPromptResponse({
          variables: { input: userInput },
        });
        // console.log(response.error.message);
        setPromptResponse(prompt);
      }
    return (
      <div className='mainPage'>
        <Card className='mainCard'
            sx={{
            margin: '8rem',
            backgroundColor: '#E6FFFA',
            boxShadow: '8px 5px 5px #B2F5EA',
            borderRadius: '2rem',
            }}
        >
        <CardHeader>
            <Heading fontSize="5xl" size="md" m={8}>
            Talk to 'Friend Name'
            </Heading>
        </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                    
                    <Box>
                        <div style={{display:'flex', flexDirecion:'row', justifyContent:'center', alignContent:'center'}}>
                            <Text fontSize='md'>Friend Name</Text>
                            &emsp;
                            <ButtonGroup>
                                <Button colorScheme='teal' size='sm'>
                                    Save Friend
                                </Button>
                                <Button colorScheme='teal' size='sm'>
                                    Edit Friend
                                </Button>
                                <Button  colorScheme='teal' size='sm'>
                                    Remove Friend 
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Box>
                    <Box>
                        <Textarea sx={{height:'300px',
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                        }} 
                        placeholder='AI text here?' />
                        <Box >
                        <div style={{display:'flex', flexDirecion:'row', justifyContent:'center', alignContent:'center'}}>
                            <FormControl 
                            >
                                <form onSubmit={onSubmit} >
                                <Center>
                                    <FormLabel>Name my Pet</FormLabel>
                                </Center>
                                <InputGroup>
                                    <Input type='text' 
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '1rem',
                                        marginTop: '5px',
                                        maxWidth: '80%',
                                    }}
                                    placeholder='Enter an animal'
                                    name="animal"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    />
                                    <InputRightElement style={{display:'flex', flexDirection:'row'}}>
                                        <Button
                                            // onClick={subscribe}
                                            minWidth={100}
                                            mr={10}
                                            className='genButton'
                                            value="Generate Names"
                                            type="submit"
                                            >
                                            Generate
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </form>
                            </FormControl>
                            <div>{loading ? <div>Loading...</div> : <p>{promptResponse}</p>}</div>
                        </div>
                    </Box>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
      </div>
    );
  }
  