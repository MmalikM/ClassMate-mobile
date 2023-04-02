import axios from "axios";
import {
  fetchAsignmen,
  fetchAsignmenById,
  loadingAsignmen,
} from "./actionType";

const baseUrl = "http://localhost:3000/students/";

export const fetchAsignmens = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(baseUrl + "assignments");
      dispatch(fetchAsignmenSuccess(data));
      dispatch(loadingAsignemSucsess());
    } catch (error) {
      throw error;
    }
  };
};

export const fetchAsignmensById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(baseUrl + "assignments/" + id);
      dispatch(fetchAsignmenByIdSuccess(data))
      dispatch(loadingAsignemSucsess())
    } catch (error) {
      throw error;
    }
  };
};

export const fetchAsignmenSuccess = (payload) => {
  return {
    type: fetchAsignmen,
    payload,
  };
};
export const fetchAsignmenByIdSuccess = (payload) => {
  return {
    type: fetchAsignmenById,
    payload,
  };
};
export const loadingAsignemSucsess = () => {
  return {
    type: loadingAsignmen,
    payload: false,
  };
};
