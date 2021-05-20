import { AUTH, ERROR } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    console.log("signin called on actions");
    const { data } = await api.signIn(formData);
    // console.log(data);
    if (data.error) {
      console.log("there is an error detect in actions");
      dispatch({ type: ERROR, data });
      // alert(data.error);
    } else {
      console.log("no error detect in actions signin with data");

      dispatch({ type: AUTH, data });
      router.push("/");
    }
    // dispatch({ type: AUTH, data });
    // router.push("/");
  } catch (error) {
    console.log("catch in signin action");
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log("signup called on actions");

    const { data } = await api.signUp(formData);
    console.log(data);
    // api.signUp(formData);
    if (data.error) {
      dispatch({ type: ERROR, data });
    } else {
      router.push("/email_confirm");
    }
    // dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};
export const activateUser = (token, router) => async (dispatch) => {
  console.log("activate User called in actions");
  const { data } = await api.activateUser(token);
  console.log(data);
  if (data.error) {
    dispatch({ type: ERROR, data });
  } else {
    dispatch({ type: AUTH, data });
    alert(data.message);
    router.push("/");
  }
  // dispatch({ type: AUTH, data });
};
