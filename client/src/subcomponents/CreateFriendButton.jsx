import React from 'react';
import { Button } from '@chakra-ui/react';

export default function CreateFriendButton() {
  return (
    <Button className="createfriend" size="xl" p={4}>
      <strong>+</strong> &emsp; Create a friend
    </Button>
  );
}
