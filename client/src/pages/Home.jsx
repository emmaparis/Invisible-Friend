import React from 'react';
import { Button, ButtonGroup, Spacer } from '@chakra-ui/react';
import SavedFriendButton from '../subcomponents/SavedFriendButton';
import CreateFriendButton from '../subcomponents/CreateFriendButton';

function Home() {
  return (
    <div className='mainCard'>
        <ButtonGroup
        style={{
            marginTop: '150px',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            justifyContent: 'center',
        }}
        >
        <CreateFriendButton />
        <SavedFriendButton />
        <SavedFriendButton />
        </ButtonGroup>
    </div>
  );
}

export default Home;
