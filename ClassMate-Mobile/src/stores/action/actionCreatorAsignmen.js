import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  fetchAsignmen,
  fetchAsignmenById,
  fetchReturn,
  fetchReturnStat,
  loadingAsignmen,
} from "./actionType";

// const baseUrl =
// "https://ff1d-2001-448a-1129-129b-b019-1ebb-37b9-9dd6.ap.ngrok.io/students/";
const baseUrl = "http://localhost:3000/students/";

export const fetchAsignmens = () => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      // console.log(access_token);
      const { data } = await axios.get(baseUrl + "answers/assigned", {
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
export const fetchReturned = () => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      // console.log(access_token);
      const { data } = await axios.get(baseUrl + "answers/returned", {
        headers: {
          access_token: access_token,
        },
      });
      dispatch(fetchReturnedSuccess(data));
      dispatch(loadingAsignemSucsess());
    } catch (error) {
      throw error;
    }
  };
};

export const fetchReturnedStat = () => {
  return async (dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      // console.log(access_token);
      let score=[]
      let title=[]
      const { data } = await axios.get(baseUrl + "answers/returned", {
        headers: {
          access_token: access_token,
        },
      });
      //logic nambah score
      data.forEach(el => {
        if (!score.length) {
          score=[el.score]
          title =[el.Assignment.name]
        }else{
          score.push(el.score)
          title.push(el.Assignment.name)
        }
      });
      let result ={
        score,
        title
      }
      const minVal = Math.min(...result.score);
      const maxVal = Math.max(...result.score);
      const sum = result.score.reduce((total, val) => total + val);
      const avg = sum / result.score.length;
      result.max = maxVal
      result.min = minVal
      result.avg = avg

      let notice=''
      if(avg<60) notice = 'Jangan Malas, Ayo blajar !'
      if(avg>=60&& avg<=85) notice = 'Tingkatkan lagi Belajarnya!'
      if(avg>85) notice = 'Pertahankan! Jangan Mudah Puas'

      result.notice = notice

      console.log(result,"<<data action");
      dispatch(fetchReturnedStatSuccess(result));
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

export const fetchAsignmenSuccess = (payload) => {
  return {
    type: fetchAsignmen,
    payload,
  };
};

export const fetchReturnedSuccess = (payload) => {
  return {
    type: fetchAsignmen,
    payload,
  };
};
export const fetchReturnedStatSuccess = (payload) => {
  // console.log(payload, "<<dari succes");
  return {
    type: fetchReturnStat,
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
    payload: true,
  };
};
