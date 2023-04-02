import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  fetchAsignmen,
  fetchAsignmenById,
  loadingAsignmen,
} from "./actionType";

const baseUrl = "https://e7e4-120-188-38-174.ap.ngrok.io/students/";

export const fetchAsignmens = () => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      console.log(access_token);
      const { data } = await axios.get(baseUrl + "assignments", {
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchAsignmenSuccess(data));
      dispatch(loadingAsignemSucsess());
    } catch (error) {
      throw error;
    }
  };
};

export const fetchAsignmensById = (id) => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios.get(baseUrl + "assignments/" + id, {
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchAsignmenByIdSuccess(data));
      dispatch(loadingAsignemSucsess());
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
