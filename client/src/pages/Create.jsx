import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Select } from 'chakra-react-select';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  HStack,
  RadioGroup,
  Radio,
  Button,
  Heading,
} from '@chakra-ui/react';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/actions';
import Auth from '../utils/auth';
import { ADD_FRIEND, ADD_EXPERT } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';
import avatar1 from '../assets/images/avatars/avatar-1.png';
import avatar2 from '../assets/images/avatars/avatar-2.png';
import avatar3 from '../assets/images/avatars/avatar-3.png';
import avatar4 from '../assets/images/avatars/avatar-4.png';
import avatar5 from '../assets/images/avatars/avatar-5.png';
import avatar6 from '../assets/images/avatars/avatar-6.png';

export default function Create() {
  const [showTemperament, setShowTemperament] = useState(false);
  const [showExpertise, setShowExpertise] = useState(false);
  const [botNameState, setBotNameState] = useState('');
  const [friendSelect, setFriendSelect] = useState('');
  const [temperamentSelect, setTemperamentSelect] = useState('');
  const [ageSelect, setAgeSelect] = useState('');
  const [languageSelect, setLanguageSelect] = useState('');
  const [state, dispatch] = useStoreContext();
  const [expertiseSelect, setExpertiseSelect] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [avatarSelect, setAvatarSelect] = useState('');
  const [addFriend] = useMutation(ADD_FRIEND);
  const [addExpert] = useMutation(ADD_EXPERT);
  const navigate = useNavigate();
  const [loadUserData] = useLazyQuery(QUERY_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
    onCompleted: (data) => {
      dispatch({
        type: UPDATE_USER,
        user: data.me,
      });
    },
    onError: (error) => {
      console.error(error);
      setErrorMessage(
        'There has been an error trying to load your data. Please refresh the page.'
      );
    },
  });

  const friendTypeOptions = [
    { value: 'Friend', label: 'Friend' },
    { value: 'Teacher', label: 'Teacher' },
  ];

  const temperamentOptions = [
    { value: 'Happy', label: 'Happy' },
    { value: 'Sad', label: 'Sad' },
    { value: 'Neutral', label: 'Neutral' },
    { value: 'Caring', label: 'Caring' },
    { value: 'Stern', label: 'Stern' },
    { value: 'Flirty', label: 'Flirty' },
    { value: 'Drunk', label: 'Drunk' },
  ];

  const expertiseOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Languages', label: 'Languages' },
  ];

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

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Portugese', label: 'Portugese' },
  ];

  const handleFriendSelect = (option) => {
    setFriendSelect(option);
  };

  const handleTemperamentSelect = (option) => {
    setTemperamentSelect(option);
  };

  const handleAgeSelect = (option) => {
    setAgeSelect(option);
  };

  const handleLanguageSelect = (option) => {
    setLanguageSelect(option);
  };
  const handleAvatarSelect = (value) => {
    setAvatarSelect(value);
  };

  const handleExpertiseSelect = (option) => {
    setExpertiseSelect(option);
  };

  const handleBotNameChange = (event) => {
    setBotNameState(event.target.value);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (friendSelect && friendSelect.value === 'Friend') {
      setShowTemperament(true);
      setShowExpertise(false);
    } else if (friendSelect && friendSelect.value === 'Teacher') {
      setShowTemperament(false);
      setShowExpertise(true);
    } else {
      setShowTemperament(false);
      setShowExpertise(false);
    }
  }, [friendSelect]);

  const handleAddFriend = async () => {
    try {
      if (friendSelect.value === 'Friend') {
        console.log({
          name: botNameState,
          language: languageSelect.value,
          age: parseInt(ageSelect.value, 10),
          mood: temperamentSelect.value,
          user: state.user._id,
          avatar: avatarSelect,
        });
        const { data } = await addFriend({
          variables: {
            name: botNameState,
            language: languageSelect.value,
            age: parseInt(ageSelect.value, 10),
            mood: temperamentSelect.value,
            user: state.user._id,
            avatar: avatarSelect,
          },
        });

        console.log('New friend added:', data.addFriend);
        // Navigate to the /prompt/:id route using the newly added friend's _id
        navigate(`/prompt/${friendSelect.value}/${data.addFriend._id}`);
      } else {
        console.log({
          name: botNameState,
          language: languageSelect.value,
          expertise: expertiseSelect.value,
          user: state.user._id,
          avatar: avatarSelect,
        });
        const { data } = await addExpert({
          variables: {
            name: botNameState,
            language: languageSelect.value,
            expertise: expertiseSelect.value,
            user: state.user._id,
            avatar: avatarSelect,
          },
        });

        console.log('New Expert added:', data.addExpert);
        // Navigate to the /prompt/:id route using the newly added expert's _id
        navigate(`/prompt/${friendSelect.value}/${data.addExpert._id}`);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      setErrorMessage('Error creating bot. Please try again.');
    }
  };

  return (
    <div className="mainPage">
      <Container
        className="mainCard"
        sx={{ width: '100%' }}
        p={15}
        mb={16}
        m={8}
      >
        <div className={`error-message ${errorMessage ? '' : 'hidden'}`}>
          {errorMessage}
        </div>
        <Heading>Build Your Friend</Heading>
        <FormControl p={4}>
          {/* add input for enter bot name */}
          <Input
            name="botName"
            placeholder="Enter Bot Name"
            size="lg"
            value={botNameState}
            onChange={handleBotNameChange}
          />
        </FormControl>
        <FormControl p={4}>
          <Select
            name="type"
            classNamePrefix="Friend-Type-Select"
            options={friendTypeOptions}
            placeholder="Friend Type"
            closeMenuOnSelect
            size="lg"
            chakraStyles={{
              dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
                ...prev,
                '> svg': {
                  transitionDuration: 'normal',
                  transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
                },
              }),
            }}
            onChange={handleFriendSelect}
            value={friendSelect}
          />
        </FormControl>
        {showTemperament && (
          <FormControl p={4}>
            <Select
              name="temperament"
              classNamePrefix="Temperament-Select"
              options={temperamentOptions}
              placeholder="Temperament"
              closeMenuOnSelect
              size="lg"
              chakraStyles={{
                dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
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
        )}
        {showExpertise && (
          <FormControl p={4}>
            <Select
              name="expertise"
              classNamePrefix="Expertise-Select"
              options={expertiseOptions}
              placeholder="Expertise"
              closeMenuOnSelect
              size="lg"
              chakraStyles={{
                dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
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
        )}
        {!showExpertise && (
          <FormControl p={4}>
            <Select
              name="age"
              classNamePrefix="Age-Select"
              options={ageOptions}
              placeholder="Age"
              closeMenuOnSelect
              size="lg"
              chakraStyles={{
                dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
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
        )}
        <FormControl p={4}>
          <Select
            name="language"
            classNamePrefix="Language-Select"
            options={languageOptions}
            placeholder="Language"
            closeMenuOnSelect
            size="lg"
            chakraStyles={{
              dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
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
        <FormControl as="fieldset">
          <FormLabel ml={10} as="legend" htmlFor={null} sx={{ margin: 'auto' }}>
            Select Friends Avatar
          </FormLabel>
          <RadioGroup
            defaultValue="Itachi"
            onChange={handleAvatarSelect}
            value={avatarSelect}
            sx={{ mt: 4 }}
          >
            <HStack spacing="24px">
              <Radio name="avatar1" value="avatar1">
                <img src={avatar1} alt="girl with pink hair and overalls" />
              </Radio>
              <Radio name="avatar2" value="avatar2">
                <img src={avatar2} alt="beared hipster with glasses" />
              </Radio>
              <Radio name="avatar3" value="avatar3">
                <img src={avatar3} alt="blonde boy sticking out his tongue" />
              </Radio>
            </HStack>
            <HStack spacing="24px">
              <Radio name="avatar4" value="avatar4">
                <img src={avatar4} alt="Freddy Mercury" />
              </Radio>
              <Radio name="avatar5" value="avatar5">
                <img
                  src={avatar5}
                  alt="Chain smoking emo girl with sunglasses"
                />
              </Radio>
              <Radio name="avatar6" value="avatar6">
                <img src={avatar6} alt="Happy nerdy girl" />
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button
          onClick={handleAddFriend}
          mt={6}
          style={{ backgroundColor: '#319795' }}
        >
          Initiate Friend
        </Button>
      </Container>
    </div>
  );
}
