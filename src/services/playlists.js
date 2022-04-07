import axios from "axios";

import { playlistConstants } from "../context";
import getConfig from "./config";

// Playlists
export const loadAllPlaylists = async (dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: playlistConstants.LOADING });
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/user/playlists`,
      config
    );

    if (response.status === 200) {
      dispatch({
        type: playlistConstants.GET_PLAYLIST,
        payload: response.data.playlists,
      });
    }
  } catch (e) {
    dispatch({
      type: playlistConstants.ERROR,
      payload: "Oops! Something went wrong :(",
    });
  }
};

export const createPlaylist = async (playlist, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/playlists`,
      { playlist },
      config
    );

    if (response.status === 201) {
      openAlert({ message: "Created a new playlist!", type: "info" });
      dispatch({
        type: playlistConstants.CREATE_PLAYLIST,
        payload: response.data.playlists,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};



export const addToPlaylist = async (id, video, dispatch, openAlert) => {
  const config = getConfig();

  if (!video || Object.keys(video).length === 0) return;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/playlists/${id}`,
      { video },
      config
    );

    if (response.status === 201) {
      openAlert({ message: "Added to playlist!", type: "info" });
      dispatch({
        type: playlistConstants.ADD_TO_PLAYLIST,
        payload: response.data.playlist,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const removeFromPlaylist = async (id, videoId, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/playlists/${id}/${videoId}`,
      config
    );

    if (response.status === 200) {
      openAlert({ message: "Removed from playlist!", type: "info" });
      dispatch({
        type: playlistConstants.ADD_TO_PLAYLIST,
        payload: response.data.playlist,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const deletePlaylist = async (id, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/playlists/${id}`,
      config
    );

    if (response.status === 200) {
      openAlert({ message: "Deleted the playlist!", type: "info" });
      dispatch({
        type: playlistConstants.DELETE_PLAYLIST,
        payload: response.data.playlists,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};