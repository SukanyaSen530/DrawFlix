import axios from "axios";

import { authActions } from "../context";

// Auth
export const loginUser = async (payload, dispatch, openAlert) => {
  try {
    dispatch({ type: authActions.LOADING, payload: true });
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/auth/login`,
      payload
    );

    if (response.status === 200) {
      openAlert({ message: "Successfully signed in!", type: "success" });
      dispatch({
        type: authActions.LOAD_USER,
        payload: {
          token: response.data.encodedToken,
          user: response.data.foundUser,
        },
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};

export const registerUser = async (payload, dispatch, openAlert) => {
  try {
    dispatch({ type: authActions.LOADING, payload: true });
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/auth/signup`,
      payload
    );

    if (response.status === 201) {
      openAlert({
        message: "Successfully created an account with us!",
        type: "success",
      });
      dispatch({
        type: authActions.LOAD_USER,
        payload: {
          token: response.data.encodedToken,
          user: response.data.createdUser,
        },
      });
    }
  } catch (e) {
    openAlert({ message: e?.response?.data?.errors[0], type: "error" });
  }
};
