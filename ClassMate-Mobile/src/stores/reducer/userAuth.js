import { loggedIn } from "../action/actionType";

const initialState = {
  loggedIn: false,
  classes: [],
  loginLoading: false,
};

function userAuth(state = initialState, action) {
  switch (action.type) {
    case loggedIn:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case "fetchAsignmenById":
      return {
        ...state,
        detailAsignmen: action.payload,
      };
    case "loadingAsignmens":
      return {
        ...state,
        loadingAsignmen: action.payload,
      };
    default:
      return state;
  }
}

export default userAuth;
