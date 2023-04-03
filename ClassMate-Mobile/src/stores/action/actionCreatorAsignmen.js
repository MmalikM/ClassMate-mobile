import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  fetchAsignmen,
  fetchAsignmenById,
  loadingAsignmen,
} from "./actionType";

// const baseUrl = "https://e7e4-120-188-38-174.ap.ngrok.io/students/";
const baseUrl = "http://localhost:3000/students/";

export const fetchAsignmens = () => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      console.log(access_token);
      const { data } = await axios.get(baseUrl + "answers", {
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

// export const uploadImage = (image,id) => {
//   const access_token =  AsyncStorage.getItem("access_token");
//   console.log(access_token);
//   let data = {
//     sale_id: 1,
//     note_type_id: 4,
//     description: "test",
//     note_content_item: " hi from broker hub",
//   };
//   const formData = new FormData();
//   formData.append("data", JSON.stringify(data));
//   formData.append("Note", {
//     uri: image,
//     type: "image/jpeg",
//     name: "imagename.jpg",
//   });
//   axios({
//     url: baseUrl+"upload/"+id,
//     method: "POST",
//     data: formData,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//       "access_token": "",
//     },
//   })
//     .then(function (response) {
//       console.log("response :", response);
//     })
//     .catch(function (error) {
//       console.log("error from image :");
//     });
// };

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
