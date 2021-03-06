import { tokenName } from "../providers/AuthProvider";

import { authActions } from "../actions/authActions";

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case authActions.LOADING:
      return { ...state, loading: true };

    case authActions.LOAD_USER:
      if (payload.token !== "" || !payload.token) {
        window.sessionStorage.setItem(tokenName, payload.token);
      }
      if (payload.token !== "" || !payload.token) {
        window.sessionStorage.setItem(
          "userDetails",
          JSON.stringify(payload.user)
        );
      }
      return {
        ...state,
        loading: false,
        user: { token: payload.token, details: payload.user },
      };

    case authActions.LOAD_USER_PROFILE:
      return {
        ...state,
        loading: false,
        user: { ...state.user, details: payload },
      };

    case authActions.LOGOUT: {
      window.sessionStorage.clear()
      return {
        ...state,
        user: { token: null, details: null },
      };
    }
  }
};

export default authReducer;
