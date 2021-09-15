import axiosIntance from "../helpers/axios";
import { profileConstant, registerConstant } from "./constant";

export const registration = (registerData) => {
  return async (dispatch) => {
    dispatch({ type: registerConstant.REGISTER_REQUEST });
    const res = await axiosIntance.post("/registration", registerData);
    if (res.status === 200) {
      dispatch({
        type: registerConstant.REGISTTER_SUCCESS,
        payload: { registerData },
      });
    } else {
      dispatch({
        type: registerConstant.REGISTER_FAIL,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getRegistration = () => {
  return async (dispatch) => {
    dispatch({ type: registerConstant.GET_REGISTER_REQUEST });
    const res = await axiosIntance.get("/getRegistration");

    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: registerConstant.GET_REGISTTER_SUCCESS,
        payload: { data },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: registerConstant.GET_REGISTER_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const getProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: profileConstant.PROFILE_REQUEST });
    const res = await axiosIntance.get(`/profile/${id}`);

    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: profileConstant.PROFILE_SUCCESS,
        payload: { data },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: profileConstant.PROFILE_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const removeProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: profileConstant.REMOVE_PROFILE_REQUEST });
    const res = await axiosIntance.delete(`/removeProfile/${id}`);

    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: profileConstant.PROFILE_SUCCESS,
        payload: { data },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: profileConstant.REMOVE_PROFILE_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const editProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: profileConstant.EDIT_PROFILE_REQUEST });
    const res = await axiosIntance.get(`/profile/${id}`);

    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: profileConstant.EDIT_PROFILE_SUCCESS,
        payload: { data },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: profileConstant.EDIT_PROFILE_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const updateData = (data) => {
  return async (dispatch) => {
    dispatch({ type: profileConstant.UPDATE_PROFILE_REQUEST });
    const res = await axiosIntance.patch(
      `/updateProfile/${data.updateId}`,
      data.data
    );

    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: profileConstant.UPDATE_PROFILE_SUCCESS,
        payload: { data },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: profileConstant.UPDATE_PROFILE_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
