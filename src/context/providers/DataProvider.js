import { useReducer, useContext, createContext, useEffect } from "react";

import {
  compose,
  filterByCategory,
  filterByTime,
  getSearchResults,
} from "../helper";
import { useAuthContext } from "./AuthProvider";
import { playlistConstants } from "../";
import {
  loadLikedVideos,
  loadwatchLaterVideos,
  loadHistoryVideos,
} from "../../services";

import dataReducer from "../reducers/dataReducer";

const dataContext = createContext();

const initialState = {
  vid: {
    loading: false,
    items: [],
    error: null,
    single_video: {},
    filterOptions: {
      searchQuery: "",
      category: "all",
      time: "latest",
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
    playlistModal: false,
    video: {},
    single_playlist: {},
  },
  notes: {
    loading: false,
    item: {},
    error: null,
  },
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const openPModal = (video) =>
    dispatch({ type: playlistConstants.OPEN_MODAL, payload: video });

  const closePModal = () => dispatch({ type: playlistConstants.CLOSE_MODAL });

  const filteredVideos = compose(
    filterByCategory,
    filterByTime,
    getSearchResults
  )(state, state?.vid?.items || []);

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
        handlers: { openPModal, closePModal },
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

const useDataContext = () => useContext(dataContext);

export { DataProvider, useDataContext };
