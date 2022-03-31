import { useReducer, useContext, createContext } from "react";

import globalReducer from "../reducers/globalReducer";

const globalContext = createContext();

const initialState = {
  alert: {
    show: false,
    message: "",
    type: "",
  },
  modal: {
    show: false,
  },
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <globalContext.Provider
      value={{
        globalState: state,
        globalDispatch: dispatch,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

const useGlobalContext = () => useContext(globalContext);

export { GlobalProvider, useGlobalContext };
