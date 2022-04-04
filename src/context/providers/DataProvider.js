import { useReducer, useContext, createContext, useEffect } from "react";

import { compose, filterByCategory, getSearchResults } from "../helper";
import { useAuthContext } from "./AuthProvider";
import { loadLikedVideos } from "../../services/likes";
import { loadwatchLaterVideos } from "../../services/watchlater";

import dataReducer from "../reducers/dataReducer";
import { loadHistoryVideos } from "../../services/history";

const dataContext = createContext();

const initialState = {
  vid: {
    loading: false,
    items: [],
    error: null,
    single_video: {},
    filterOptions: {
      searchQuery: "",
      category: "",
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

  const filteredVideos = compose(filterByCategory, getSearchResults)(
    state,
    state?.vid?.items || []
  );

  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  useEffect(() => {
    if (state.liked.items?.length === 0 && token) loadLikedVideos(dispatch);
  }, [token]);

  useEffect(() => {
    if (state.watchLater.items?.length === 0 && token)
      loadwatchLaterVideos(dispatch);
  }, [token]);

  useEffect(() => {
    if (state.history.items?.length === 0 && token) loadHistoryVideos(dispatch);
  }, [token]);

  return (
    <dataContext.Provider
      value={{
        dataState: state,
        dataDispatch: dispatch,
        filteredVideos,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

const useDataContext = () => useContext(dataContext);

export { DataProvider, useDataContext };
