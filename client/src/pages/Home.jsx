import React from 'react';
import { Button, ButtonGroup, Spacer } from '@chakra-ui/react';
import SavedFriendButton from "../subcomponents/SavedFriendButton"
import CreateFriendButton from '../subcomponents/CreateFriendButton';
function Home () {
    return(
        <ButtonGroup 
        style={{marginTop:'150px', 
            display:'flex', 
            flexDirection: 'column', 
            alignSelf:'center', 
            justifyContent:'center'}} > 
                <CreateFriendButton />
                <SavedFriendButton/>
                <SavedFriendButton/>
       </ButtonGroup>
    )
}

export default Home;
