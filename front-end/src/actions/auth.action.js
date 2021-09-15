import axios from "axios";
import axiosIntance from "../helpers/axios";
import { authConstant } from "./constant";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_REQUEST });
    const res = await axiosIntance.post("/signin", user);

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: authConstant.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstant.LOGIN_FAIL,
          payload: { error: res.message },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstant.LOGIN_FAIL,
        payload: { error: "error" },
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUOT_REQUEST });
    const res = await axiosIntance.post("/signout");

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstant.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstant.LOGOUOT_FAIL,
        payload: { error: res.data.error },
      });
    }
  };
};
