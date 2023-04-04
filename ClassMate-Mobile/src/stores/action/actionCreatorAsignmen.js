import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  fetchAsignmen,
  fetchAsignmenById,
  loadingAsignmen,
} from "./actionType";

const baseUrl =
  "https://ff1d-2001-448a-1129-129b-b019-1ebb-37b9-9dd6.ap.ngrok.io/students/";
// const baseUrl = "http://localhost:3000/students/";

export const fetchAsignmens = () => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      // console.log(access_token);
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

export const fetchAsignmensById = (idAssignmet) => {
  // console.log(idAssignmet);
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const { data } = await axios.get(baseUrl + "assignments/" + idAssignmet, {
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchAsignmenByIdSuccess(data));
      dispatch(loadingAsignemSucsess());
    } catch (error) {
      console.log(error);
    }
  };
};

export const uploadImage = async (image, id) => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    console.log(id);
    console.log(image);
    // let data = {
    //   sale_id: 1,
    //   note_type_id: 4,
    //   description: "test",
    //   note_content_item: " hi from broker hub",
    // };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("image", {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    let { data } = await axios({
      url: baseUrl + "upload/" + id,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: access_token,
      },
    });
    console.log("response :", data);
  } catch (error) {
    console.log(error);
  }
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
