import React from 'react';
import { Button, ButtonGroup, Spacer } from '@chakra-ui/react';
import SavedFriendButton from '../subcomponents/SavedFriendButton';
import CreateFriendButton from '../subcomponents/CreateFriendButton';
import { Link } from 'react-router-dom';

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
      <Link to="/create" colorscheme="teal">
        <CreateFriendButton/>
      </Link>
      <SavedFriendButton />
      <SavedFriendButton />
    </ButtonGroup>
  );
}

export default Home;
