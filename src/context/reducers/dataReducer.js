import {
  videoConstants,
  likeConstants,
  watchLaterConstants,
  historyConstants,
  playlistConstants,
  notesConstants,
} from "../actions/dataActions";
import { tokenName } from "../providers/AuthProvider";

const isLoggedIn = () => {
  if (window.localStorage.getItem(tokenName)) return true;
  else return false;
};

import { addedorRemovedVideo } from "../helper";

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case videoConstants.LOADING:
      return {
        ...state,
        vid: { ...state.vid, loading: true },
      };

    case videoConstants.GET_VIDEOS:
      return {
        ...state,
        vid: {
          ...state.vid,
          error: null,
          loading: false,
          items: payload,
        },
      };

    case videoConstants.GET_VIDEO:
      if (isLoggedIn()) {
        return {
          ...state,
          liked: {
            ...state.liked,
            items: state.liked.items?.map((item) =>
              item._id === payload._id ? payload : item
            ),
          },
          watchLater: {
            ...state.watchLater,
            items: state.watchLater.items?.map((item) =>
              item._id === payload._id ? payload : item
            ),
          },
          history: {
            ...state.history,
            items: state.history.items?.map((item) =>
              item._id === payload._id ? payload : item
            ),
          },
          vid: {
            ...state.vid,
            items: state.vid.items?.map((item) =>
              item._id === payload._id ? payload : item
            ),
            error: null,
            loading: false,
            single_video: payload,
          },
        };
      } else {
        return {
          ...state,
          vid: {
            ...state.vid,
            items: state.vid.items?.map((item) =>
              item._id === payload._id ? payload : item
            ),
            error: null,
            loading: false,
            single_video: payload,
          },
        };
      }

    case videoConstants.ERROR:
      return {
        ...state,
        vid: { ...state.vid, error: payload, loading: false, items: [] },
      };

    case videoConstants.FILTER_CATEGORY:
      return {
        ...state,
        vid: {
          ...state.vid,
          filterOptions: {
            ...state.vid.filterOptions,
            category: payload,
          },
        },
      };

    case videoConstants.FILTER_BY_TIME:
      return {
        ...state,
        vid: {
          ...state.vid,
          filterOptions: {
            ...state.vid.filterOptions,
            time: payload,
          },
        },
      };

    case videoConstants.SEARCH:
      return {
        ...state,
        vid: {
          ...state.vid,
          filterOptions: {
            ...state.vid.filterOptions,
            searchQuery: payload,
          },
        },
      };

    //Likes

    case likeConstants.LOADING:
      return {
        ...state,
        liked: { ...state.liked, loading: true, error: null },
      };

    case likeConstants.GET_LIKED:
      return {
        ...state,
        liked: {
          error: null,
          loading: false,
          items: payload,
        },
      };

    case likeConstants.ERROR:
      return {
        ...state,
        liked: { error: payload, loading: false, items: [] },
      };

    case likeConstants.ADD_TO_LIKED:
      return {
        ...state,
        liked: {
          error: null,
          loading: false,
          items: payload,
        },
      };

    case likeConstants.REMOVE_FROM_LIKED:
      return {
        ...state,
        liked: {
          error: null,
          loading: false,
          items: payload,
        },
      };

    // Watch Later

    case watchLaterConstants.LOADING:
      return {
        ...state,
        watchLater: { ...state.watchLater, loading: true, error: null },
      };

    case watchLaterConstants.GET_WATCH_LATER:
      return {
        ...state,
        watchLater: {
          error: null,
          loading: false,
          items: payload,
        },
      };

    case watchLaterConstants.ERROR:
      return {
        ...state,
        watchLater: { error: payload, loading: false, items: [] },
      };

    case watchLaterConstants.ADD_TO_WATCH_LATER:
      return {
        ...state,
        watchLater: {
          error: null,
          loading: false,
          items: payload,
        },
      };

    case watchLaterConstants.REMOVE_FROM_WATCH_LATER:
      return {
        ...state,
        watchLater: {
          ...state.watchLater,
          items: payload,
        },
      };

    // History

    case historyConstants.LOADING:
      return { ...state, history: { ...state.history, loading: true } };

    case historyConstants.GET_HISTORY:
      return {
        ...state,
        history: { loading: false, error: null, items: payload },
      };

    case historyConstants.ERROR:
      return {
        ...state,
        history: { loading: false, error: payload, items: [] },
      };

    case historyConstants.ADD_TO_HISTORY:
      return {
        ...state,
        history: {
          ...state.history,
          items: payload,
        },
      };

    case historyConstants.REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: {
          ...state.history,
          items: payload,
        },
      };

    case historyConstants.CLEAR_HISTORY:
      return {
        ...state,
        history: {
          ...state.history,
          loading: false,
          items: [],
        },
      };

    // Playlist

    case playlistConstants.OPEN_MODAL:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          playlistModal: true,
          video: payload,
        },
      };

    case playlistConstants.CLOSE_MODAL:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          playlistModal: false,
          video: {},
        },
      };

    case playlistConstants.LOADING:
      return { ...state, playlist: { ...state.playlist, loading: true } };

    case playlistConstants.GET_PLAYLIST:
      return {
        ...state,
        playlist: { ...state.playlist, loading: false, items: payload },
      };

    case playlistConstants.ERROR:
      return {
        ...state,
        playlist: { ...state.playlist, loading: false, error: payload },
      };

    case playlistConstants.CREATE_PLAYLIST:
      return {
        ...state,
        playlist: { ...state.playlist, items: payload },
      };

    case playlistConstants.DELETE_PLAYLIST:
      return {
        ...state,
        playlist: { ...state.playlist, items: payload },
      };

    case playlistConstants.ADD_TO_PLAYLIST:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          items: addedorRemovedVideo(state.playlist.items, payload),
        },
      };

    case playlistConstants.REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          items: addedorRemovedVideo(state.playlist.items, payload),
        },
      };

    case playlistConstants.DELETE_PLAYLIST:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          items: payload,
        },
      };

    // Notes
    case notesConstants.LOADING:
      return { ...state, notes: { ...state.notes, loading: true } };

    case notesConstants.ERROR:
      return { ...state, notes: { loading: false, item: {}, error: payload } };

    case notesConstants.GET_NOTES:
      return {
        ...state,
        notes: {
          loading: false,
          error: null,
          item: payload,
        },
      };

    case notesConstants.CREATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          item: payload,
        },
      };

    case notesConstants.UPDATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          item: payload,
        },
      };

    case notesConstants.DELETE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          item: payload,
        },
      };

    case notesConstants.DELETE_ALL_NOTES:
      return {
        ...state,
        notes: { ...state.notes, item: { ...state.notes.item, notes: [] } },
      };
  }
};

export default userReducer;
