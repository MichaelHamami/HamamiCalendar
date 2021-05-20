import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    case actionType.ERROR:
      console.log(
        `Error case in reducers with error message: ${action?.data?.error}`
      );
      return {
        ...state,
        errors: action?.data?.error,
        loading: false,
        authData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
