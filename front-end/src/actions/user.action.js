import axios from "axios";
import axiosIntance from "../helpers/axios";
import { userConstant } from "./constant";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.USER_REGISTER_REQUEST });
    const res = await axiosIntance.post("/signup", user);

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstant.USER_REGISTTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstant.USER_REGISTER_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
