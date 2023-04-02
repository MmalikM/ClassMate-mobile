import axios from "axios";

const baseUrl = " https://52c1-139-228-76-114.ap.ngrok.io/students/";

export const login = (email, password) => {
  return async () => {
    try {
      const input = { email, password };
      const {data} = await axios.post(baseUrl + "login", input);
      return data
    } catch (error) {
        throw error
    }
  };
};

export const register = (input) => {
    return async () => {
      try {
        console.log(input);
        const {data} = await axios.post(baseUrl + "register", input);
        return data
      } catch (error) {
          throw error
      }
    };
  };

