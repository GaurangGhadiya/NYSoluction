import { authConstant } from "../actions/constant";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};
export default (state = initState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstant.LOGIN_FAIL:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case authConstant.LOGOUOT_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      break;
    case authConstant.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstant.LOGOUOT_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
