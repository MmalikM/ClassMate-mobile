import { combineReducers } from "redux";
import asignmens from "./asignmen";
import userAuth from "./userAuth";

const rootReducer = combineReducers({
  asignmens: asignmens,
  login: userAuth,
});

export default rootReducer;
