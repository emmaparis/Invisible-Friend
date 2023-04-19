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

export default function Create() {
  return (
    <Container mb={16}>
      <FormControl p={4}>
        <Select
          name="colors"
          classNamePrefix="Friend-Type-Select"
          options={friendTypeOptions}
          placeholder="Friend Type"
          closeMenuOnSelect={false}
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
          closeMenuOnSelect={false}
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
      {/* <Input placeholder='large size' size='lg' sx={{width: "70vw"}} /> */}
    </Container>
  );
}
