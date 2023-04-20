import { QUERY_ME } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case QUERY_ME:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
