import React from 'react';
import {Spacer, Button} from '@chakra-ui/react';
import personIcon from '../assets/images/personIcon.png'

export default function SavedFriendButton(){
    return (
        <Button className= 'savefriend' size='lg' >
            <img className='icon' src= {personIcon} ></img>
            &emsp;
            Saved friend
        </Button>
    )
}