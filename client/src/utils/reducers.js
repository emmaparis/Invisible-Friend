import { useReducer } from 'react';
import { UPDATE_USER } from './actions';

const initialState = {
  user: {
    _id: '',
    username: '',
    email: '',
    friends: [],
    experts: [],
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export function useProductReducer() {
  return useReducer(reducer, initialState);
}
