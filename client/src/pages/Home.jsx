import React from "react";
import { Button, AddIcon } from '@chakra-ui/react'
  //maybe add a loggedIN prop for find saved friends
function Home () {
    return(
        <div> 
            <AddIcon boxSize={6} />
            <Button colorScheme='teal' size='lg'>
                Create a friend
            </Button>
        </div>
    )
}

export default Home;