const initialState = { asignmens: [], loadingAsignmen: false };

function asignmens(state = initialState, action) {
  switch (action.type) {
    case "fetchAsignmen":
      return {
        ...state,
        asignmens: action.payload,
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

export default asignmens;