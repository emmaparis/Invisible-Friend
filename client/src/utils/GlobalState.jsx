import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const initialState = {
    user: {
      Me: { _id: '', username: '', email: '', friends: [], experts: [] },
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
