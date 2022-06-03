import axios from "axios";

import { notesConstants } from "../context";
import getConfig from "./config";

// Notes
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

export const createNote = async (note, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/notes`,
      { note },
      config
    );

    if (response.status === 201) {
      openAlert({ message: "Created note", type: "success" });
      dispatch({
        type: notesConstants.CREATE_NOTE,
        payload: response.data.notes,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const upadteNote = async (note, dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_URL}/user/notes`,
      { description },
      config
    );

    if (response.status === 200) {
      openAlert({ message: "Updated note", type: "success" });
      dispatch({
        type: notesConstants.CREATE_NOTE,
        payload: response.data.notes,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const deleteNote = async (ids, dispatch, openAlert) => {
  const config = getConfig();

  const { videoId, noteId } = ids;

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL}/user/notes/${videoId}/${noteId}`,
      config
    );

    if (response.status === 200) {
      openAlert({ message: "Deleted note!", type: "success" });
      dispatch({
        type: notesConstants.DELETE_NOTE,
        payload: response.data.notes,
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const deleteAllNotes = async (dispatch, openAlert) => {
  const config = getConfig();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/user/notes`,
      { note },
      config
    );

    if (response.status === 200) {
      openAlert({ message: "Deleted all notes!", type: "success" });
      dispatch({ type: notesConstants.DELETE_ALL_NOTES });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};
