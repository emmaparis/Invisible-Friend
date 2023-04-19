import React from 'react';
import { Card, CardHeader, CardBody, Heading, Stack, Button, Box, StackDivider, Input } from '@chakra-ui/react'

export default function LogIn() {
    return(
        <Card  className="login-sign">
            <CardHeader>
                <Heading fontSize='5xl' size='md' m={8}>Log In</Heading>
            </CardHeader>
            <CardBody sx={{display:'flex', justifyContent:'center', alignSelf:'center'}}>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='s' textTransform='uppercase'>
                        Email
                        </Heading>
                        <Input  className='formInput' placeholder='example@example.com'/>
                    </Box>
                    <Box mb={3}>
                        <Heading size='s' textTransform='uppercase'>
                        Password
                        </Heading>
                        <Input  type='password'  className='formInput' placeholder='Password'/>
                    </Box>
                    <Button mb={5} colorScheme='teal' variant='outline'>
                        Log In
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    )
}
