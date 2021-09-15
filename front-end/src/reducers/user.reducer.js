import { userConstant } from "../actions/constant";

const initState = {
  error: "",
  message: "",
  loading: false,
  authenticate: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstant.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstant.USER_REGISTTER_SUCCESS:
      state = {
        loading: false,
        message: action.payload.message,
        authenticate: true,
      };
      break;
    case userConstant.USER_REGISTER_FAIL:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
