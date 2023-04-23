import { React } from 'react';
import { Button } from '@chakra-ui/react';
import avatara from '../assets/images/avatars/avatar-1.png';
import avatarb from '../assets/images/avatars/avatar-2.png';
import avatarc from '../assets/images/avatars/avatar-3.png';
import avatard from '../assets/images/avatars/avatar-4.png';
import avatare from '../assets/images/avatars/avatar-5.png';
import avatarf from '../assets/images/avatars/avatar-6.png';

const avatars = {
  avatar1: avatara,
  avatar2: avatarb,
  avatar3: avatarc,
  avatar4: avatard,
  avatar5: avatare,
  avatar6: avatarf,
};

const SavedFriendButton = ({ bot, onClick }) => {
  console.log(bot);
  console.log(bot.avatar);
  return (
    <>
      <Button className="savefriend" size="xl" p={4} onClick={onClick}>
        <img className="icon" src={avatars[bot.avatar]} alt="avatar" />
        &emsp; {bot.name}
        &emsp;
      </Button>
    </>
  );
};

export default SavedFriendButton;
