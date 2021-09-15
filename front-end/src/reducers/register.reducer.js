import {
  profileConstant,
  registerConstant,
  userConstant,
} from "../actions/constant";

const initState = {
  error: "",
  message: "",
  loading: false,
  //   registerData: {
  //     name: "",
  //     rollNo: "",
  //     branch: "",
  //     email: "",
  //     gender: "",
  //     bitrhDate: "",
  //     regisrered: false,
  //   },
  registerData: [],
  viewProfile: {},
  editProfile: {},
  isEdit: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case registerConstant.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case registerConstant.REGISTTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        // message: action.payload.message,
        authenticate: true,
      };
      break;
    case registerConstant.REGISTER_FAIL:
      state = {
        loading: false,
        error: action.payload.error,
      };
      break;
    case registerConstant.GET_REGISTTER_SUCCESS:
      state = {
        ...state,
        registerData: action.payload.data,
      };
      break;
    case profileConstant.PROFILE_SUCCESS:
      state = {
        ...state,
        viewProfile: action.payload.data,
      };
      break;
    case profileConstant.EDIT_PROFILE_SUCCESS:
      state = {
        ...state,
        editProfile: action.payload.data,
        isEdit: true,
      };
      break;
  }
  return state;
};
