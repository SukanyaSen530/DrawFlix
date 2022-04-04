import axios from "axios";

import { historyConstants } from "../context";
import getConfig from "./config";

// History
export const loadHistoryVideos = async (dispatch) => {
  const config = getConfig();

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
  const config = getConfig();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/history`,
      { video },
      config
    );

    if (response.status === 201) {
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
  const config = getConfig();

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
  const config = getConfig();

  dispatch({ type: historyConstants.LOADING });
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/history/all`,
      config
    );

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