import { useReducer, useContext, createContext } from "react";

import dataReducer from "../reducers/dataReducer";

const dataContext = createContext();

const initialState = {
  vid: {
    loading: false,
    items: [],
    error: null,
    single_video: {},
  },
  liked: {
    loading: false,
    items: [],
    error: null,
  },
  watchLater: {
    loading: false,
    items: [],
    error: null,
  },
  history: {
    loading: false,
    items: [],
    error: null,
  },
  playlist: {
    loading: false,
    items: [],
    error: null,
    single_playlist: [],
  },
};

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
