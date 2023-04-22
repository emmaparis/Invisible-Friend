import React from 'react';
import { Button } from '@chakra-ui/react';
import personIcon from '../assets/images/personIcon.png';

const SavedFriendButton = ({ bot, onClick }) => {
  return (
    <>
      <Button className="savefriend" size="xl" p={4} onClick={onClick}>
        <img className="icon" src={personIcon} alt="Person icon" />
        &emsp;
        {bot.name}
        &emsp;
      </Button>
    </>
  );
};

export default SavedFriendButton;
