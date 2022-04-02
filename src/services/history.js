import axios from "axios";

import { historyConstants } from "../context";

// History
export const loadHistoryVideos = async (dispatch) => {
  try {
    dispatch({ type: historyConstants.LOADING });
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/user/history`,
      config
    );

    if (response.status === 200) {
      dispatch({
        type: historyConstants.GET_HISTORY,
        payload: response.data.history,
      });
    }
  } catch (e) {
    dispatch({
      type: historyConstants.ERROR,
      payload: "Oops! Something went wrong :(",
    });
  }
};

export const addToHistory = async (video, dispatch, openAlert) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/hisotry`,
      config,
      video
    );

    if (response.status === 200) {
      openAlert({ message: "Added to History!", type: "info" });
      dispatch({
        type: historyConstants.ADD_TO_HISTORY,
        payload: response.data.history,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const removeFromHistory = async (id, dispatch, openAlert) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/history/${id}`,
      config
    );

    if (response.status === 200) {
      openAlert({ message: "Removed from History!", type: "info" });
      dispatch({
        type: historyConstants.REMOVE_FROM_HISTORY,
        payload: response.data.history,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const clearHistory = async (dispatch, openAlert) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/history/all`,
      config
    );

    console.log(response);

    if (response.status === 200) {
      openAlert({ message: "Cleared History!", type: "info" });
      dispatch({
        type: historyConstants.CLEAR_HISTORY,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};