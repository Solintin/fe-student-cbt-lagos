import { combineReducers } from "redux";
import User from "./user";
import examination from "./examination";

const appReducer = combineReducers({
  user: User,
  examination: examination,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // storage.removeItem('persist:otherKey')
    localStorage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
