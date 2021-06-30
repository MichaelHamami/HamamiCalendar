import * as actionType from "../constants/actionTypes";

const profileReducer = (
  state = { profile_message: null, message_type: null },
  action
) => {
  switch (action.type) {
    case actionType.PROFILE_ERROR:
      console.log(`Error asdas in profile Reducer`);
      console.log(action);
      console.log(state);

      return {
        ...state,
        profile_message: action.data.message,
        message_type: "Error",
      };

    case actionType.PROFILE_SUCCESS:
      console.log(`Success  in profile Reducer`);
      // console.log(action);
      // console.log(state);

      return {
        ...state,
        profile_message: action.data.message,
        message_type: "Success",
      };
    case actionType.PROFILE_AUTH:
      console.log(`Success  in profile Reducer`);
      // console.log(action);
      // console.log(state);
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return {
        ...state,
        profile_message: action.data.message,
        message_type: "Success",
      };
    default:
      // console.log(`defualt reducer in profileReducer`);
      return { ...state, profile_message: null, message_type: null };
  }
};

export default profileReducer;
