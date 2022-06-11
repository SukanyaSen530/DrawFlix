import { useState, useEffect } from "react";

import "./playlists.scss";

import { EmptyState } from "../";
import { Loader, HorizontalCard } from "../../components";
import { useDataContext, useGlobalContext } from "../../context";
import { deletePlaylist } from "../../services";
import useScrollToTop from "../../hooks/useScrollToTop";

const Playlists = () => {
  const [playlistId, setplaylistId] = useState("");

  const {
    dataState: { playlist },
    dataDispatch,
    handlers: { openPModal },
  } = useDataContext();
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  const { loading, items: playlists, error } = playlist;

  const handleCreate = () => openPModal();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deletePlaylist(id, dataDispatch, openAlert);
  };

  const displayPlaylist =
    playlists.filter((item) => item._id === playlistId)[0] || {};

  useScrollToTop();

  useEffect(() => {
    if (playlists.length !== 0) {
      setplaylistId(playlists[0]._id);
    }
  }, [playlists]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <EmptyState msg={error} type="error" path="/explore" />;
  }

  return (
    <section className="playlist-section pad-default">
      <div className="playlist-tabs scrollbar">
        <div className="flex flex-space-between flex-center-y">
          <p className="h4">All Playlists</p>
          <button
            className="btn btn-contained btn-sm defaultDark"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>

        {playlists?.map((item) => (
          <div
            className="playlist-tabs__tab"
            key={item._id}
            onClick={() => setplaylistId(item._id)}
          >
            <p className="playlist-tabs__tab__title">{item.title}</p>

            <div className="flex flex-space-between flex-center-y">
              <span className="playlist-tabs__tab__length">
                <i className="fa-solid fa-play"></i> {item?.videos.length}{" "}
                Videos
              </span>
              <button
                className="btn btn-icon btn-sm danger"
                onClick={(e) => handleDelete(e, item._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="playlist-info scrollbar">
        <span className="playlist-info__title">{displayPlaylist?.title}</span>
        {Object.keys(displayPlaylist).length > 0 ? (
          <div className="playlist-info__videos">
            {displayPlaylist?.videos?.length === 0 ? (
              <EmptyState
                type="empty"
                msg="Your playlist is empty! :( Add videos..."
                buttonText="browse"
                path="/explore"
              />
            ) : (
              displayPlaylist?.videos?.map((item) => (
                <HorizontalCard
                  key={item._id}
                  video={item}
                  playlistId={displayPlaylist._id}
                />
              ))
            )}
          </div>
        ) : (
          <EmptyState
            type="empty"
            msg="Look's like you don't have any playlist!"
            buttonText="browse"
            path="/explore"
          />
        )}
      </div>
    </section>
  );
};

export default Playlists;
