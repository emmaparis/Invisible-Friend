import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/ifLogoMini.png';
import Auth from '../utils/auth';

export default function Header() {
  const logout = async (event) => {
    event.preventDefault();
    await Auth.logout();
    window.location.href = '/';
  };
  return (
    <header
      style={{
        backgroundColor: '#E6FFFA',
        boxShadow: '0px 2px 2px #B2F5EA',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100vw',
        border: '0px',
      }}
    >
      <Flex
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
        minWidth="max-content"
        alignItems="center"
        gap="2"
      >
        <Link to="/">
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Heading sx={{ color: '#1D4044' }} className="mobile-hidden">
              INVISIBLE
            </Heading>
            <Image
              boxSize="28px"
              objectFit="cover"
              src={logo}
              alt="Invisible Friend logo."
              href=""
            />
            <Heading sx={{ color: '#1D4044' }} className="mobile-hidden">
              FRIEND
            </Heading>
          </Box>
        </Link>
        <Spacer />
        <ButtonGroup gap="2">
          {!Auth.loggedIn() ? (
            <>
              <Link to="/signup" colorscheme="teal">
                <Button sx={{ backgroundColor: '#319795', color: 'white' }}>
                  Sign Up
                </Button>
              </Link>
              <Link to="/login" colorscheme="teal">
                <Button sx={{ backgroundColor: '#319795', color: 'white' }}>
                  Log in
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" colorscheme="teal">
                <Button sx={{ backgroundColor: '#319795', color: 'white' }}>
                  Profile
                </Button>
              </Link>
              <Button
                sx={{ backgroundColor: '#319795', color: 'white' }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </header>
  );
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
