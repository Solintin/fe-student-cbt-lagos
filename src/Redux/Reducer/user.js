import * as type from "../Actions/Types";

const initailState = {
  currentUser: null,
  userData:null,
  token: "",
  error: "",
};
const User = (state = initailState, action) => {
  switch (action.type) {
    case type.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload,
      };
    case type.FETCH_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case type.GET_JOB_SUCCESS:
      return {
        ...state,
        job: action.payload,
      };
    case type.LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case type.LOGOUT:
      return {
        ...state,
        currentUser: null,
        token: "",
        error: "",
      };

    default:
      return state;
  }
};

export default User;
