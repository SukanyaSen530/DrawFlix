import { useReducer, useContext, createContext } from "react";

import dataReducer from "../reducers/dataReducer";

const dataContext = createContext();

const initialState = {};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <dataContext.Provider
      value={{
        dataState: state,
        dataDispatch: dispatch,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

const useDataContext = () => useContext(dataContext);

export { DataProvider, useDataContext };
