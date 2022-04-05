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

export const removePlaylist = async (id, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/history/${id}`,
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