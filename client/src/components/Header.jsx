import React from 'react';
import logo from '../assets/images/ifLogoMini.png'
import {Flex, Box, Heading, Spacer, ButtonGroup, Button, Image } from '@chakra-ui/react'

export default function Header(){
    return(     
        <header style= {{ backgroundColor: '#E6FFFA', boxShadow: '0px 3px 3px #81E6D9', display:'flex', justifyContent:'space-between', width:'100vw', border:'0px'}}>
            <Flex sx={{display:'flex', justifyContent:'space-between', width:'100%'}}  minWidth='max-content' alignItems='center' gap='2'>
            <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <Image
                    boxSize='100px'
                    objectFit='cover'
                    src={logo}
                    alt='Invisible Friend logo.'
                    href=''
                />
                <Heading>Invisible Friend</Heading>
            </Box>
                 <Spacer />
                  <ButtonGroup gap='2'>
                    {/* {loggedIN ? :} */}
                      <Button colorScheme='teal'>Sign Up</Button>
                      <Button colorScheme='teal'>Log in</Button>
                  </ButtonGroup>
              </Flex> 
        </header> 
    )
}

// --chakra-colors-teal-50: #E6FFFA;
//     --chakra-colors-teal-100: #B2F5EA;
//     --chakra-colors-teal-200: #81E6D9;
//     --chakra-colors-teal-300: #4FD1C5;
//     --chakra-colors-teal-400: #38B2AC;
//     --chakra-colors-teal-500: #319795;
//     --chakra-colors-teal-600: #2C7A7B;
//     --chakra-colors-teal-700: #285E61;
//     --chakra-colors-teal-800: #234E52;
//     --chakra-colors-teal-900: #1D4044;