import { useReducer, useContext, createContext } from "react";

export const tokenName = "drawFlixToken";

import authReducer from "../reducers/authReducer";

const authContext = createContext();

const initialState = {
  loading: false,
  user: {
    token: window.sessionStorage.getItem(`${tokenName}`),
    details: JSON.parse(window.sessionStorage.getItem("userDetails")),
  },
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider
      value={{
        authState: state,
        authDispatch: dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuthContext = () => useContext(authContext);

export { AuthProvider, useAuthContext };
