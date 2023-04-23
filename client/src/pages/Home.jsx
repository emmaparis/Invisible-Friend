import { React, useEffect } from 'react';
import { ButtonGroup } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import SavedFriendButton from '../subcomponents/SavedFriendButton';
import CreateFriendButton from '../subcomponents/CreateFriendButton';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/actions';

function Home() {
  const navigate = useNavigate();
  const [state, dispatch] = useStoreContext();
  console.log(state);
  const { error, data } = useQuery(QUERY_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
    fetchPolicy: 'network-only',
  });

  console.log('query data', data);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      dispatch({
        type: UPDATE_USER,
        user: data.me,
      });
    }
  }, [data]);

  const friendBots = [...state.user.friends];
  const expertBots = [...state.user.experts];

  const promptBot = async (bot, className) => {
    navigate(`/prompt/${className}/${bot._id}`);
  };

  return (
    <div className="mainPage">
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
        {friendBots.map((bot) => (
          <SavedFriendButton
            key={bot._id}
            bot={bot}
            onClick={() => promptBot(bot, 'Friend')}
          />
        ))}
        {expertBots.map((bot) => (
          <SavedFriendButton
            key={bot._id}
            bot={bot}
            onClick={() => promptBot(bot, 'Teacher')}
          />
        ))}
      </ButtonGroup>
    </div>
  );
}

export default Home;
