import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    console.log("signin called on actions");
    const { data } = await api.signIn(formData);
    
    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log("catch in action");

    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log("signup called on actions");

    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};