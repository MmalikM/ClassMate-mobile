import axios from "axios"
import { fetchAsignmen, loadingAsignmen } from "./actionType"

const baseUrl = 'http://localhost:3000/students/'

export const fetchAsignmens = () => {
    return async (dispatch) =>{
        try {
            const {data} = await axios.get(baseUrl + 'assignments')
            dispatch(fetchAsignmenSuccess(data))
            dispatch(loadingAsignemSucsess())
        } catch (error) {
            throw error
        }
    }
}
export const fetchAsignmenSuccess = (payload) => {
    return {
      type: fetchAsignmen,
      payload,
    };
  };
  export const loadingAsignemSucsess = () => {
    return {
      type: loadingAsignmen,
      payload: false,
    };
  };