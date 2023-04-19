import React from "react";
import { Button } from '@chakra-ui/react';

function Home () {
    return(
        <div > 
            <Button colorScheme='teal' size='lg' sx={{alignItems: 'center'}}>
                <strong> + </strong> &emsp; Create a friend
            </Button>
       </div>
    )
}

export default Home;