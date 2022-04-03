import axios from "axios";

import { videoConstants } from "../context";

//Videos
export const loadVideos = async (dispatch) => {
  try {
    dispatch({ type: videoConstants.LOADING });
    const response = await axios.get(`${process.env.REACT_APP_URL}/videos`);

    if (response.status === 200) {
      dispatch({
        type: videoConstants.GET_VIDEOS,
        payload: response.data.videos,
      });
    }
  } catch (e) {
    dispatch({
      type: videoConstants.ERROR,
      payload: "Oops! Something went wrong :(",
    });
  }
};

export const loadSingleVideo = async (id, dispatch) => {
  try {
    dispatch({ type: videoConstants.LOADING });
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/video/${id}`
    );

    if (response.status === 200) {
      dispatch({
        type: videoConstants.GET_VIDEO,
        payload: response.data.video,
      });
    }
  } catch (e) {
    dispatch({
      type: videoConstants.ERROR,
      payload: "The requested video can not loaded!",
    });
  }
};

export const getCategories = async (setCategories) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/categories`);

    if (response.status === 200) {
      setCategories(response?.data.categories);
    }
  } catch (e) {
    console.log(e);
  }
};