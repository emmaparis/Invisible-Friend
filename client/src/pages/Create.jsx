import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND, ADD_EXPERT } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  HStack,
  RadioGroup,
  Radio,
  FormHelperText,
  Button,
  Heading,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import avatar1 from '../assets/images/avatars/avatar-1.png';
import avatar2 from '../assets/images/avatars/avatar-2.png';
import avatar3 from '../assets/images/avatars/avatar-3.png';
import avatar4 from '../assets/images/avatars/avatar-4.png';
import avatar5 from '../assets/images/avatars/avatar-5.png';
import avatar6 from '../assets/images/avatars/avatar-6.png';

const avatarImages = [];
for (let x = 1; x <= 6; x++) {
  avatarImages.push('avatar' + x);
}

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
  { value: 'Impaired', label: 'Impaired' },
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

const avatarOptions = [
  { value: avatar1, label: 'avatar1' },
  { value: avatar2, label: 'avatar2' },
  { value: avatar3, label: 'avatar3' },
  { value: avatar4, label: 'avatar4' },
  { value: avatar5, label: 'avatar5' },
  { value: avatar6, label: 'avatar6' },
];

export default function Create(props) {
  const {
    friendSelect,
    temperamentSelect,
    ageSelect,
    languageSelect,
    promptEntered,
    avatarSelect,
    setFriendSelect,
    setTemperamentSelect,
    setAgeSelect,
    setLanguageSelect,
    setPromptEntered,
    setAvatarSelect,
  } = props;
  const [state, dispatch] = useStoreContext();

  const [addFriend, { data, loading, error }] = useMutation(ADD_FRIEND);
  const [
    addExpert,
    { data: expertData, loading: expertLoading, error: expertError },
  ] = useMutation(ADD_EXPERT);
  const navigate = useNavigate();

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
  const handleAvatarSelect = (option) => {
    setAvatarSelect(option);
  };

  const handleAddFriend = async () => {
    try {
      console.log(
        'This is the data',
        languageSelect,
        ageSelect,
        temperamentSelect,
        state.user._id,
        friendSelect
      );

      if (friendSelect.value === 'Friend') {
        const { data } = await addFriend({
          variables: {
            name: 'system',
            language: languageSelect.value,
            age: parseInt(ageSelect.value),
            mood: temperamentSelect.value,
            user: state.user._id,
            avatar: avatarSelect.value,
          },
        });
      } else {
        // const { data } = await addExpert({
        //   variables: {
        //     name: 'system',
        //     language: languageSelect.value,
        //     expertise: expertiseSelect.value,
        //     user: state.user._id,
        //     avatar: avatarSelect.value,
        //   },
        // });
      }

      console.log('New friend added:', data.addFriend);
      // Navigate to the /prompt/:id route using the newly added friend's _id
      navigate(`/prompt/${data.addFriend._id}`);
    } catch (error) {
      console.error('Error adding friend:', error);
      navigate(`/404`);
    }
  };

  return (
    <div className="mainPage">
      <Container className="mainCard" sx={{ width: '100%' }} p={15} mb={16}>
        <Heading>Build Your Friend</Heading>
        <FormControl p={4}>
          <Select
            name="colors"
            classNamePrefix="Friend-Type-Select"
            options={friendTypeOptions}
            placeholder="Friend Type"
            closeMenuOnSelect={true}
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
        <FormControl p={4}>
          <Select
            name="colors"
            classNamePrefix="Temperament-Select"
            options={temperamentOptions}
            placeholder="Temperament"
            closeMenuOnSelect={true}
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
        <FormControl p={4}>
          <Select
            name="colors"
            classNamePrefix="Age-Select"
            options={ageOptions}
            placeholder="Age"
            closeMenuOnSelect={true}
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
        <FormControl p={4}>
          <Select
            name="colors"
            classNamePrefix="Language-Select"
            options={languageOptions}
            placeholder="Language"
            closeMenuOnSelect={true}
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
          <FormLabel ml={10} as="legend" htmlFor={null}>
            Choose a Friend
          </FormLabel>
          <RadioGroup
            defaultValue="Itachi"
            onChange={handleAvatarSelect}
            value={avatarSelect}
          >
            <HStack spacing="24px">
              <Radio value={avatar1}>
                <img src={avatar1} />
              </Radio>
              <Radio value={avatar2}>
                <img src={avatar2} />
              </Radio>
              <Radio value={avatar3}>
                <img src={avatar3} />
              </Radio>
            </HStack>
            <HStack spacing="24px">
              <Radio value={avatar4}>
                <img src={avatar4} />
              </Radio>
              <Radio value={avatar5}>
                <img src={avatar5} />
              </Radio>
              <Radio value={avatar6}>
                <img src={avatar6} />
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Link colorscheme="teal">
          <Button
            onClick={handleAddFriend}
            mt={6}
            style={{ backgroundColor: '#319795' }}
          >
            Initiate Friend
          </Button>
        </Link>
      </Container>
    </div>
  );
}
