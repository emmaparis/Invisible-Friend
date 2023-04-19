import React from 'react';
import { Card, CardHeader, CardBody, Button, Heading, Stack, Box, StackDivider, Input } from '@chakra-ui/react'

export default function SignUp() {
    return(
        <Card  className= 'login-signup'>
            <CardHeader>
                <Heading fontSize='5xl' size='md' m={8}>Sign Up</Heading>
            </CardHeader>
            <CardBody sx={{display:'flex', justifyContent:'center', alignSelf:'center'}}>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='s' textTransform='uppercase'>
                        Name
                        </Heading>
                        <Input  className='formInput' placeholder='First Name'/>
                        <Input   className='formInput' placeholder='Last Name'/>
                    </Box>
                    <Box>
                        <Heading size='s' textTransform='uppercase'>
                        Email
                        </Heading>
                        <Input className='formInput' placeholder='example@example.com'/>
                    </Box>
                    <Box mb={3}>
                        <Heading size='s' textTransform='uppercase'>
                        Password
                        </Heading>
                        <Input  type='password' className='formInput' placeholder='Password'/>
                        <Input   type='password' className='formInput' placeholder='Confirm Password'/>
                    </Box>
                    <Button mb={5} colorScheme='teal' variant='outline'>
                        Create Account
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    )
}
