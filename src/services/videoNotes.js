import axios from "axios";

import { notesConstants } from "../context";
import getConfig from "./config";

// Playlists
export const loadAllNotes = async (dispatch) => {
  const config = getConfig();

  try {
    dispatch({ type: notesConstants.LOADING });
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/user/notes`,
      config
    );

    if (response.status === 200) {
      dispatch({
        type: notesConstants.GET_NOTES,
        payload: response.data.notes,
      });
    }
  } catch (e) {
    dispatch({
      type: notesConstants.ERROR,
      payload: "Oops! Something went wrong :(",
    });
  }
};
