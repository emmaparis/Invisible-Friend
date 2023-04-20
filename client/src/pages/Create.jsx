import React, {useState} from 'react';
import { Container, 
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
import avatar1 from '../assets/images/avatars/avatar-1.png'
import avatar2 from '../assets/images/avatars/avatar-2.png'
import avatar3 from '../assets/images/avatars/avatar-3.png'
import avatar4 from '../assets/images/avatars/avatar-4.png'
import avatar5 from '../assets/images/avatars/avatar-5.png'
import avatar6 from '../assets/images/avatars/avatar-6.png'

const avatarImages = [ ]
for (let x=1; x<=6; x++){
  avatarImages.push('avatar' + x)
};

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

export default function Create() {
  const [friendSelect, setFriendSelect] = useState('')
  const [temperamentSelect, setTemperamentSelect] = useState('')
  const [ageSelect, setAgeSelect] = useState('')
  const [languageSelect, setLanguageSelect] = useState('')

  const handleFriendSelect = (option) => {
    setFriendSelect(option);
  }

  const handleTemperamentSelect = (option) => {
    setTemperamentSelect(option);
  }

  const handleAgeSelect = (option) => {
    setAgeSelect(option);
  }

  const handleLanguageSelect = (option) => {
    setLanguageSelect(option);
  }

  return (
    <Container className='mainCard' sx={{width:'100%'}} p={15} mb={16}>
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
      <FormControl p={4} >
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
      <FormControl p={4} >
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
      <FormControl p={4} >
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
      <FormControl as='fieldset'>
        <FormLabel as='legend' htmlFor={null}>
          Choose a Friend
        </FormLabel>
        <RadioGroup defaultValue='Itachi'>
          <HStack spacing='24px'>
            <Radio value='Avatar1' > 
              <img src={avatar1}/>
            </Radio>
            <Radio value='Avatar2' > 
              <img src={avatar2}/>
            </Radio>
            <Radio value='Avatar3' > 
              <img src={avatar3}/>
            </Radio>
          </HStack>
          <HStack spacing='24px'>
            <Radio value='Avatar4' > 
              <img src={avatar4}/>
            </Radio>
            <Radio value='Avatar5' > 
              <img src={avatar5}/>
            </Radio>
            <Radio value='Avatar6' > 
              <img src={avatar6}/>
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <Button mt={6} style={{backgroundColor:'#319795'}}>Initiate Friend</Button>
    </Container>
    
  );
}
