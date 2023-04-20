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
  ButtonGroup
} from '@chakra-ui/react';

export default function PromptJ() {
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
            Create Your Friend
            </Heading>
        </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                    <Box >
                        <div style={{display:'flex', flexDirecion:'row', justifyContent:'center', alignContent:'center'}}>
                            <FormControl className='txtInput'>
                                <Center>
                                    <FormLabel>Name my Pet</FormLabel>
                                </Center>
                                <Input type='text' />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                            </FormControl>
                            <Button colorScheme='teal' size='sm' mt={9} >
                                Generate Names
                            </Button>
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
                                <Button colorScheme='teal' size='sm'>
                                    Remove Friend 
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Box>
                    <Box>
                        
                    </Box>
                </Stack>
            </CardBody>
        </Card>
      </div>
    );
  }
  