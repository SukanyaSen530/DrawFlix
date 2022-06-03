import "./playlist.scss";

import { useDataContext, useGlobalContext } from "../../context";
import { addToPlaylist, removeFromPlaylist } from "../../services";

const Playlist = () => {
  const {
    dataState: {
      playlist: { video, items: playlists },
    },
    dataDispatch,
  } = useDataContext();
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  const isVideoInPlaylist = (playlist) =>
    playlist.videos.some((item) => item?._id === video?._id);

  const handleAddRemove = (item) => {
    if (!isVideoInPlaylist(item))
      addToPlaylist(item._id, video, dataDispatch, openAlert);
    else removeFromPlaylist(item?._id, video?._id, dataDispatch, openAlert);
  };

  return (
    <div className="playlist scrollbar">
      {playlists?.map((item) => (
        <div className="playlist__input-container" key={item._id}>
          <input
            type="checkbox"
            className="playlist__input"
            value={item._id}
            checked={isVideoInPlaylist(item)}
            onChange={() => handleAddRemove(item)}
          />
          <label className="playlist__label" htmlFor={item._id}>
            {item.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
