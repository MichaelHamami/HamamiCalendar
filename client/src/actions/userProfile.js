import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  PROFILE_AUTH,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const changeEmail = (formData, router) => async (dispatch) => {
  console.log("change Email called in actions");
  const { data } = await api.changeEmail(formData);
  console.log(data);
  if (data.type === PROFILE_ERROR) {
    dispatch({ type: PROFILE_ERROR, data });
  } else {
    dispatch({ type: PROFILE_SUCCESS, data });
  }
};

export const confirmEmail = (token, router) => async (dispatch) => {
  console.log("confirm Email  called in actions");
  const { data } = await api.confirmEmail(token);
  console.log(data);
  if (data.type === PROFILE_ERROR) {
    dispatch({ type: PROFILE_ERROR, data });
  } else {
    dispatch({ type: PROFILE_AUTH, data });
    // alert(data.message);
    // router.push("/");
  }
  // dispatch({ type: AUTH, data });
};
