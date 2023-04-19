import React from 'react'
import { Container, FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

const friendTypeOptions = [
    {value: "Friend", label: "Friend"},
    {value: "Teacher", label: "Teacher"}
]

export default function Create() {
  return (
    <Container mb={16}>
    <FormControl p={4}>
      {/* <FormLabel>chakra-react-select demo</FormLabel> */}
      <Select
        name="colors"
        classNamePrefix="Friend-Type-Select"
        options={friendTypeOptions}
        placeholder="Friend Type"
        _placeholder={{ fontSize: "100px" }}
        closeMenuOnSelect={false}
        chakraStyles={{
          dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
            ...prev,
            "> svg": {
              transitionDuration: "normal",
              transform: `rotate(${menuIsOpen ? -180 : 0}deg)`
            }
          })
        }}
      />
    </FormControl>
  </Container>
  )
}
