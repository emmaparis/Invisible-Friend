import { React, useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_FRIEND, QUERY_EXPERT } from '../utils/queries';

const PromptHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [getFriend, { loading: friendLoading, data: friendData }] =
    useLazyQuery(QUERY_FRIEND);
  const [
    getExpert,
    { loading: expertLoading, data: expertData, error: expertError },
  ] = useLazyQuery(QUERY_EXPERT, {
    onError: (error) => {
      console.log('Expert query error:', error);
    },
  });

  const [botData, setBotData] = useState({});

  const url = window.location.href;
  const urlArray = url.split('/');
  const botId = urlArray[urlArray.length - 1];
  const botType = urlArray[urlArray.length - 2];

  const getBotData = () => {
    if (botType === 'Friend') {
      getFriend({
        variables: { id: botId },
      });
    }
    if (botType === 'Teacher') {
      console.log('botid', botId);
      getExpert({
        variables: { id: botId },
      });
      console.log(expertData);
    }
  };

  useEffect(() => {
    getBotData();
  }, []);

  useEffect(() => {
    if (friendLoading || expertLoading) {
      console.log('Data is still loading');
    } else if (friendData) {
      setBotData(friendData);
    } else if (expertData) {
      setBotData(expertData);
    }
  }, [friendData, friendLoading, expertData, expertLoading]);

  console.log('botData', botData);

  return (
    <div>
      <ButtonGroup>
        <>
          <Button onClick={onOpen} colorScheme="teal" size="sm">
            Edit Friend
          </Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input ref={initialRef} placeholder="First name" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder="Last name" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        <Button colorScheme="teal" size="sm">
          Remove Friend
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PromptHeader;
