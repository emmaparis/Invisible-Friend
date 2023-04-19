import React from 'react';
import { Card, CardHeader, CardBody, Heading, Stack, Text, Box, StackDivider, Input } from '@chakra-ui/react'

export default function SignUp() {
    return(
        <Card  class= 'login-signup'>
            <CardHeader>
                <Heading fontSize='5xl' size='md' m={8}>Sign Up</Heading>
            </CardHeader>
            <CardBody sx={{display:'flex', justifyContent:'center', alignSelf:'center'}}>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='s' textTransform='uppercase'>
                        Name
                        </Heading>
                        <Input    class='formInput' placeholder='First Name'/>
                        <Input   class='formInput' placeholder='Last Name'/>
                    </Box>
                    <Box>
                        <Heading size='s' textTransform='uppercase'>
                        Email
                        </Heading>
                        <Input class='formInput' placeholder='example@example.com'/>
                    </Box>
                    <Box mb={3}>
                        <Heading size='s' textTransform='uppercase'>
                        Password
                        </Heading>
                        <Input  type='password' class='formInput' placeholder='Password'/>
                        <Input   type='password' class='formInput' placeholder='Confirm Password'/>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}
