import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import SavedFriendButton from '../subcomponents/SavedFriendButton';

function Home() {
  return (
    <ButtonGroup
      style={{
        marginTop: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
      }}
    >
      <Button size="lg" class="createfriend">
        <strong> + </strong>
        &emsp; Create a friend
      </Button>
      <SavedFriendButton />
      <SavedFriendButton />
    </ButtonGroup>
  );
}

export default Home;
