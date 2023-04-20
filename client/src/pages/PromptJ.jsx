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
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        </Card>
      </div>
    );
  }
  