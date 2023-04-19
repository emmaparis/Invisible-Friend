import React from 'react';
import { Button} from '@chakra-ui/react';
import personIcon from '../assets/images/personIcon.png'

export default function SavedFriendButton(){
    return (
        <Button className= 'savefriend' size='xl' p={4} >
            <img className='icon' src= {personIcon} ></img>
            &emsp;
            Saved friend
        </Button>
    )
}