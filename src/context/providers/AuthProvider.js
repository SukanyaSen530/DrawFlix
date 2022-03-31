import { useReducer, useContext, createContext } from "react";

import authReducer from "../reducers/authReducer";

const authContext = createContext();

const initialState = {
  loading: false,
  error: null,
  user: {
    token: localStorage.getItem("weeboToken"),
    details: null,
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
