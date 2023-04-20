import { QUERY_ME, UPDATE_USER } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case QUERY_ME:
      return {
        ...state,
        user: action.user,
      };

    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
