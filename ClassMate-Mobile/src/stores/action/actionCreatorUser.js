import axios from "axios";

const baseUrl = "http://localhost:3000/students/";

export const login = (email, password) => {
  return async () => {
    try {
      const input = { email, password };
      const data = await axios.post(baseUrl + "login", input);
      return data
    } catch (error) {
        throw error
    }
  };
};
