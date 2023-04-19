import React from "react";
import { Button, ButtonGroup, Spacer } from '@chakra-ui/react';

function Home () {
    return(
        <div style={{marginTop:'150px'}} > 
                <Button  size='lg' style= {{ backgroundColor: '#319795', color:'white', boxShadow: '0px 4px 4px #81E6D9', display:"inline-flex", alignItems:'center'}} >
                    <strong> + </strong> &emsp; Create a friend
                </Button>
                <Spacer/>
                <Button size='lg' style= {{ backgroundColor: '#319795', color:'white', display:'block', boxShadow: '0px 4px 4px #81E6D9', display:"inline-flex", margin:'30px', alignItems:'center'}}>
                    <strong> + </strong> &emsp; Create a friend
                </Button>
       </div>
    )
}

export default Home;