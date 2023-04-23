import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/actions';
import { QUERY_ME } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_USERPASSWORD } from '../utils/mutations';
import Auth from '../utils/auth';

function UpdatePassword() {
  const [{ user }, dispatch] = useStoreContext();
  const [customError, setCustomError] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState({
    password1: '',
    password2: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loadUserData, { called, loading, data }] = useLazyQuery(QUERY_ME, {
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
    fetchPolicy: 'network-only',
    pollInterval: 500,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (user.username === '') {
      loadUserData();
    }
  }, [user]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [updateUserPassword, { updateError }] =
    useMutation(UPDATE_USERPASSWORD);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else {
      setNewPassword({ ...newPassword, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    try {
      if (!oldPassword || !newPassword.password1 || !newPassword.password2) {
        setCustomError('All fields are required');
        return;
      }

      if (newPassword.password1 !== newPassword.password2) {
        setCustomError('New passwords do not match');
        return;
      }

      console.log(user._id, oldPassword, newPassword.password1);

      const { data } = await updateUserPassword({
        variables: {
          _id: user._id,
          oldPassword,
          newPassword: newPassword.password1,
        },
        context: {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        },
      });
      console.log('data:', data);
      onClose();
    } catch (err) {
      console.error(err);
      setCustomError('Something went wrong');
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="teal" size="sm">
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
          <ModalHeader>Update Password</ModalHeader>
          {customError && (
            <ModalHeader
              className="my-3 p-3 bg-danger text-white"
              textColor={'red'}
            >
              {customError}
            </ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Old password</FormLabel>
              <Input
                ref={initialRef}
                placeholder="*******"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="*******"
                name="password1"
                type="password"
                value={newPassword.password1}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                placeholder="*******"
                name="password2"
                type="password"
                value={newPassword.password2}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdatePassword;
