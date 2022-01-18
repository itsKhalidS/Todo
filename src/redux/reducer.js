import { SIGN_IN_USER, SIGN_OUT_USER } from "./actions";

const initialState = {
  user: null,
  isUserLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        user: action.payload,
        isUserLoading: false,
      };

    case SIGN_OUT_USER:
      return {
        ...state,
        user: null,
        isUserLoading: false,
      };

    default:
      return state;
  }
};
export default reducer;
