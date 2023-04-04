const initialState = { asignmens: [],returned:[],detailAsignmen:[], loadingAsignmen: false };

function asignmens(state = initialState, action) {
  switch (action.type) {
    case "fetchAsignmen":
      return {
        ...state,
        asignmens: action.payload,
      };
      case "fetchReturned":
        return {
          ...state,
          returned: action.payload,
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

export default asignmens;