import {
  videoConstants,
  likeConstants,
  watchLaterConstants,
  historyConstants,
  playlistConstants,
} from "../actions/dataActions";

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
      return {
        ...state,
        vid: {
          ...state.vid,
          error: null,
          loading: false,
          single_video: payload,
        },
      };

    case videoConstants.ERROR:
      return {
        ...state,
        vid: { ...state.vid, error: payload, loading: false, items: [] },
      };
  }
};

export default userReducer;
