import React from 'react';
import { ButtonGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SavedFriendButton from '../subcomponents/SavedFriendButton';
import CreateFriendButton from '../subcomponents/CreateFriendButton';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';

function Home() {
  const [state] = useStoreContext();
  console.log(state);

  // Combine the `friends` and `experts` arrays
  const allItems = [...state.user.me.friends, ...state.user.me.experts];

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
      {allItems.length > 0 &&
        allItems.map((item) => (
          <SavedFriendButton key={item._id} item={item} />
        ))}
    </ButtonGroup>
  );
}

export default Home;
