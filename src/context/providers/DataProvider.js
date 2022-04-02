import { useReducer, useContext, createContext } from "react";

import { compose, filterByCategory, getSearchResults } from "../helper";

import dataReducer from "../reducers/dataReducer";

const dataContext = createContext();

const initialState = {
  categories: [],
  vid: {
    loading: false,
    items: [],
    error: null,
    single_video: {},
    filterOptions: {
      searchQuery: "",
      category: "all",
    },
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

  const filteredVideos =
    compose(getSearchResults, filterByCategory)(
      state,
      state?.vid?.items || []
    ) || [];

  return (
    <dataContext.Provider
      value={{
        dataState: { ...state, filteredVideos },
        dataDispatch: dispatch,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

const useDataContext = () => useContext(dataContext);

export { DataProvider, useDataContext };
