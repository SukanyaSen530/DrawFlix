import { loginUser, registerUser } from "./authentication";
import { loadVideos, loadSingleVideo, getCategories } from "./videos";
import {
  loadHistoryVideos,
  addToHistory,
  removeFromHistory,
  clearHistory,
} from "./history";
import { loadLikedVideos, addToLiked, removeFromLiked } from "./likes";
import {
  loadAllPlaylists,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
} from "./playlists";
import {
  loadwatchLaterVideos,
  addToWatchLater,
  removeFromWatchLater,
} from "./watchlater";
import {
  loadAllNotes,
  createNote,
  updateNote,
  deleteNote,
  deleteAllNotes,
} from "./videoNotes";

export {
  loginUser,
  registerUser,
  loadVideos,
  loadSingleVideo,
  getCategories,
  loadHistoryVideos,
  addToHistory,
  removeFromHistory,
  clearHistory,
  loadLikedVideos,
  addToLiked,
  removeFromLiked,
  loadAllPlaylists,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
  loadwatchLaterVideos,
  addToWatchLater,
  removeFromWatchLater,
  loadAllNotes,
  createNote,
  updateNote,
  deleteNote,
  deleteAllNotes,
};
