import { userAuthActions } from "../constants/authConstants";
import { tokenName } from "..";

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case userAuthActions.LOADING:
      return { ...state, loading: true, error: null };

    case userAuthActions.LOAD_USER:
      if (payload.token !== "" || !payload.token) {
        window.localStorage.setItem(tokenName, payload.token);
      }

      return {
        ...state,
        loading: false,
        modalOpen: false,
        user: { token: payload.token, details: payload.user },
      };

    case userAuthActions.ERROR:
      return {
        ...state,
        loading: false,
        user: {},
        fetchError: payload,
      };

    case userAuthActions.LOAD_USER_PROFILE:
      return {
        ...state,
        loading: false,
        user: { ...state.user, details: payload },
      };

    case userAuthActions.LOGOUT: {
      window.localStorage.removeItem(tokenName);

      return {
        ...state,
        user: { token: null, details: null },
      };
    }
  }
};

export default authReducer;
