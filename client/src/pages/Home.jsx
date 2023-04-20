import React from 'react';
import { ButtonGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SavedFriendButton from '../subcomponents/SavedFriendButton';
import CreateFriendButton from '../subcomponents/CreateFriendButton';
import Auth from '../utils/auth';

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
      <Link to={Auth.loggedIn() ? '/create' : '/login'} colorscheme="teal">
        <CreateFriendButton />
      </Link>
      <SavedFriendButton />
      <SavedFriendButton />
    </ButtonGroup>
  );
}

export default Home;
