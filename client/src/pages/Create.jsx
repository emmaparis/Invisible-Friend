import React from 'react';
import { Container, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

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
  return (
    <Container mb={16}>
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
        />
      </FormControl>
    </Container>
  );
}
