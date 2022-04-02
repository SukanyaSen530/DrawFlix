import axios from "axios";

import { likeConstants } from "../context";

//Likes
export const loadLikedVideos = async (dispatch) => {
  try {
    dispatch({ type: likeConstants.LOADING });
    const response = await axios.get(`${process.env.REACT_APP_URL}/user/likes`);

    if (response.status === 200) {
      dispatch({
        type: likeConstants.GET_LIKED,
        payload: response.data.likes,
      });
    }
  } catch (e) {
    dispatch({
      type: likeConstants.ERROR,
      payload: "Oops! Something went wrong :(",
    });
  }
};

export const addToLiked = async (video, dispatch, openAlert) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/likes`,
      config,
      video
    );

    if (response.status === 200) {
      openAlert({ message: "Added to Liked videos!", type: "info" });
      dispatch({
        type: likeConstants.ADD_TO_LIKED,
        payload: response.data.likes,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const removeFromLiked = async (id, dispatch, openAlert) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/likes/${id}`
    );

    if (response.status === 200) {
      openAlert({ message: "Removed from Liked videos!", type: "info" });
      dispatch({
        type: likeConstants.REMOVE_FROM_LIKED,
        payload: response.data.likes,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};