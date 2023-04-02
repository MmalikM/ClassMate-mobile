import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { loggedIn } from "./actionType";

// const baseUrl = "https://e7e4-120-188-38-174.ap.ngrok.io/students/";
const baseUrl = "http://localhost:3000/students/";

export function isLoggedIn(payload) {
  return {
    type: loggedIn,
    payload,
  };
}

export function loginLoading(payload) {
  return {
    type: loginLoading,
    payload,
  };
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginLoading(true));
      const input = { email, password };
      const { data } = await axios.post(baseUrl + "login", input);

      await AsyncStorage.setItem("access_token", data.access_token);
      dispatch(isLoggedIn(true));

      dispatch(loginLoading(false));
      return data;
    } catch (error) {
      dispatch(loginLoading(false));
      throw error;
    }
  };
};

export const register = (input) => {
  return async () => {
    try {
      console.log(input);
      const { data } = await axios.post(baseUrl + "register", input);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(loginLoading(true));

      await AsyncStorage.clear();
      dispatch(isLoggedIn(false));

      dispatch(loginLoading(false));
    } catch (err) {
      dispatch(loginLoading(false));
      throw err;
    }
  };
};
