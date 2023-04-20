import React from 'react';
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
  Textarea
} from '@chakra-ui/react';

export default function PromptJ() {
    // const [userInput, setUserInput] = useState('');
    // const [promptResponse, setPromptResponse] = useState('');
    // const [getPromptResponse, { loading, error, data }] = useLazyQuery(PROMPT);
    // async function onSubmit(event) {
    //     event.preventDefault();
    //     const {
    //     data: { prompt },
    //     } = await getPromptResponse({
    //     variables: { input: userInput },
    //     });
    //     setPromptResponse(prompt);
    // }

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
                    <Box >
                        <div style={{display:'flex', flexDirecion:'row', justifyContent:'center', alignContent:'center'}}>
                            <FormControl 
                            // onSubmit={onSubmit} className='txtInput'
                            >
                                <Center>
                                    <FormLabel>Name my Pet</FormLabel>
                                </Center>
                                <Input type='text' 
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '1rem',
                                    marginTop: '5px',
                                    maxWidth: '80%',
                                }}
                                placeholder='Enter an animal'
                                name="animal"
                                // value={userInput}
                                // onChange={(e) => setUserInput(e.target.value)}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                            <Button colorScheme='teal' size='sm' ml={2}>
                                <Input type="submit" value="Generate names" sx={{display:'none'}}/>
                                Generate Names
                            </Button>
                            </FormControl>
                            {/* <div>{loading ? <div>Loading...</div> : <p>{promptResponse}</p>}</div> */}
                        </div>
                    </Box>
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
                        <FormControl className='txtInput'>
                            <Input type='text' sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '1rem',
                                    marginTop: '5px',
                                }}
                                placeholder='What do you want to say?'
                            />
                        </FormControl>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
      </div>
    );
  }
  