import { combineReducers } from "redux";
import User from "./user";
import Dashboard from "./dashboard";
import Explore from "./explore";


const appReducer = combineReducers({
  user: User,
  dashboard: Dashboard,
  explore: Explore,

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
