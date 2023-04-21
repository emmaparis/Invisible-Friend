import React from 'react';
import { Button } from '@chakra-ui/react';
import personIcon from '../assets/images/personIcon.png';
import removeIcon from '../assets/images/remIcon.png';

export default function SavedFriendButton({ botName }) {
  return (
    <>
      <Button className="savefriend" size="xl" p={4}>
        <img className="icon" src={personIcon} alt="Person icon" />
        &emsp;
        {botName}
        &emsp;
      </Button>
    </>
  );
}
