import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Select } from 'chakra-react-select';
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
  useDisclosure,
} from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_FRIEND, QUERY_EXPERT } from '../utils/queries';
import { UPDATE_FRIEND, UPDATE_EXPERT } from '../utils/mutations';

const PromptHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBotName, setNewBotName] = useState('');
  const [languageSelect, setLanguageSelect] = useState('');
  const [temperamentSelect, setTemperamentSelect] = useState('');
  const [ageSelect, setAgeSelect] = useState('');
  const [expertiseSelect, setExpertiseSelect] = useState('');

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

  const [updateFriend] = useMutation(UPDATE_FRIEND);
  const [updateExpert] = useMutation(UPDATE_EXPERT);

  const [botData, setBotData] = useState({});

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Portugese', label: 'Portugese' },
  ];

  const handleLanguageSelect = (option) => {
    setLanguageSelect(option);
  };

  const temperamentOptions = [
    { value: 'Happy', label: 'Happy' },
    { value: 'Sad', label: 'Sad' },
    { value: 'Neutral', label: 'Neutral' },
    { value: 'Caring', label: 'Caring' },
    { value: 'Stern', label: 'Stern' },
    { value: 'Flirty', label: 'Flirty' },
    { value: 'Drunk', label: 'Drunk' },
  ];

  const handleTemperamentSelect = (option) => {
    setTemperamentSelect(option);
  };

  const ageOptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
    { value: '40', label: '40' },
    { value: '50', label: '50' },
    { value: '60', label: '60' },
    { value: '70', label: '70' },
  ];

  const handleAgeSelect = (option) => {
    setAgeSelect(option);
  };

  const expertiseOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Languages', label: 'Languages' },
  ];

  const handleExpertiseSelect = (option) => {
    setExpertiseSelect(option);
  };

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
      getExpert({
        variables: { id: botId },
      });
    }
  };

  useEffect(() => {
    getBotData();
  }, []);

  useEffect(() => {
    if (friendData) {
      setBotData(friendData.friend);
    } else if (expertData) {
      setBotData(expertData.expert);
    }
  }, [friendData, friendLoading, expertData, expertLoading]);

  const handleUpdateFriend = async () => {
    try {
      if (botType === 'Friend') {
        const { data } = await updateFriend({
          variables: {
            _id: botId,
            name: newBotName,
            language: languageSelect.value,
            mood: temperamentSelect.value,
            age: Number(ageSelect.value),
            user: botData.user._id,
          },
        });
      } else if (botType === 'Teacher') {
        console.log({
          _id: botId,
          name: newBotName,
          language: languageSelect.value,
          expertise: expertiseSelect.value,
          user: botData.user._id,
        });
        const { data } = await updateExpert({
          variables: {
            _id: botId,
            name: newBotName,
            language: languageSelect.value,
            expertise: expertiseSelect.value,
            user: botData.user._id,
          },
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <ButtonGroup>
        <>
          <Button onClick={onOpen} colorScheme="teal" size="sm">
            Edit
          </Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder={botData.name}
                    value={newBotName}
                    onChange={(e) => setNewBotName(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Language</FormLabel>
                  <Select
                    name="language"
                    classNamePrefix="Language-Select"
                    options={languageOptions}
                    placeholder="Language"
                    closeMenuOnSelect
                    size="lg"
                    chakraStyles={{
                      dropdownIndicator: (
                        prev,
                        { selectProps: { menuIsOpen } }
                      ) => ({
                        ...prev,
                        '> svg': {
                          transitionDuration: 'normal',
                          transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
                        },
                      }),
                    }}
                    onChange={handleLanguageSelect}
                    value={languageSelect}
                  />
                </FormControl>

                {botType === 'Friend' && (
                  <>
                    <FormControl p={4}>
                      <FormLabel>Mood</FormLabel>
                      <Select
                        name="temperament"
                        classNamePrefix="Temperament-Select"
                        options={temperamentOptions}
                        placeholder="Temperament"
                        closeMenuOnSelect
                        size="lg"
                        chakraStyles={{
                          dropdownIndicator: (
                            prev,
                            { selectProps: { menuIsOpen } }
                          ) => ({
                            ...prev,
                            '> svg': {
                              transitionDuration: 'normal',
                              transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
                            },
                          }),
                        }}
                        onChange={handleTemperamentSelect}
                        value={temperamentSelect}
                      />
                    </FormControl>
                    <FormControl p={4}>
                      <FormLabel>Age</FormLabel>
                      <Select
                        name="age"
                        classNamePrefix="Age-Select"
                        options={ageOptions}
                        placeholder="Age"
                        closeMenuOnSelect
                        size="lg"
                        chakraStyles={{
                          dropdownIndicator: (
                            prev,
                            { selectProps: { menuIsOpen } }
                          ) => ({
                            ...prev,
                            '> svg': {
                              transitionDuration: 'normal',
                              transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
                            },
                          }),
                        }}
                        onChange={handleAgeSelect}
                        value={ageSelect}
                      />
                    </FormControl>
                  </>
                )}
                {botType === 'Teacher' && (
                  <>
                    <FormControl p={4}>
                      <FormLabel>Expertise</FormLabel>
                      <Select
                        name="expertise"
                        classNamePrefix="Expertise-Select"
                        options={expertiseOptions}
                        placeholder="Expertise"
                        closeMenuOnSelect
                        size="lg"
                        chakraStyles={{
                          dropdownIndicator: (
                            prev,
                            { selectProps: { menuIsOpen } }
                          ) => ({
                            ...prev,
                            '> svg': {
                              transitionDuration: 'normal',
                              transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
                            },
                          }),
                        }}
                        onChange={handleExpertiseSelect}
                        value={expertiseSelect}
                      />
                    </FormControl>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleUpdateFriend}>
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
