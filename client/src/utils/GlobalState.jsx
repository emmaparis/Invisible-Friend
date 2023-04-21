import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = (props) => {
  const [state, dispatch] = useProductReducer();

  return <Provider value={[state, dispatch]} {...props} />; //eslint-disable-line
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
