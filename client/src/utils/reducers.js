import { QUERY_ME } from './actions';

export default reducer = (state, action) => {
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
