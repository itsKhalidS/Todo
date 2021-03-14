import { SIGN_IN_USER, SIGN_OUT_USER } from './actions';

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SIGN_OUT_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
export default reducer;
