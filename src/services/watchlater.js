import axios from "axios";

import { watchLaterConstants } from "../context";

import getConfig from "./config";

export const loadwatchLaterVideos = async (dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: watchLaterConstants.LOADING });
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/user/watchlater`,
      config
    );

    if (response.status === 200) {
      dispatch({
        type: watchLaterConstants.GET_WATCH_LATER,
        payload: response.data.watchlater,
      });
    }
  } catch (e) {
    dispatch({
      type: watchLaterConstants.ERROR,
      payload: "Oops! Something went wrong :(",
    });
  }
};

export const addToWatchLater = async (video, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/watchlater`,
      { video },
      config
    );

    if (response.status === 201) {
      openAlert({ message: "Added to Watch Later!", type: "info" });
      dispatch({
        type: watchLaterConstants.ADD_TO_WATCH_LATER,
        payload: response.data.watchlater,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const removeFromWatchLater = async (id, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/watchlater/${id}`,
      config
    );

    if (response.status === 200) {
      openAlert({ message: "Removed from Watch Later!", type: "info" });
      dispatch({
        type: watchLaterConstants.REMOVE_FROM_WATCH_LATER,
        payload: response.data.watchlater,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};