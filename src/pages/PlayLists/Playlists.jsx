import { useState, useEffect } from "react";

import "./playlists.scss";

import EmptyState from "../EmptyState/EmptyState";
import { Loader, HorizontalCard } from "../../components";
import { useDataContext, useGlobalContext } from "../../context";
import { Fragment } from "react/cjs/react.production.min";

const Playlists = () => {
  const [displayPlaylist, setDisplayPlaylist] = useState([]);

  const {
    dataState: { playlist },
    handlers: { openPModal },
  } = useDataContext();

  const { loading, items: playlists, error } = playlist;

  const handleCreate = () => openPModal();

  console.log("displayPL", displayPlaylist);

  useEffect(() => {
    if (playlists.length !== 0) setDisplayPlaylist(playlists[0]);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <EmptyState msg={error} type="error" path="/explore" />;
  }

  return (
    <section className="playlist-section pad-default">
      <div className="playlist-tabs">
        <div className="flex flex-space-between flex-center-y">
          <p>All Playlists</p>
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
            onClick={() => setDisplayPlaylist(item)}
          >
            <p className="playlist-tabs__tab__title">{item.title}</p>

            <div className="flex flex-space-between flex-center-y">
              <span className="playlist-tabs__tab__length">
                <i className="fa-solid fa-play"></i> {item?.videos.length}{" "}
                Videos
              </span>
              <button
                className="btn btn-icon btn-sm danger"
                onClick={() => alert("hi")}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="playlist-info">
        <span className="playlist-info__title">{displayPlaylist?.title}</span>
        <div className="playlist-info__videos">
          {displayPlaylist?.videos?.map((item) => (
            <HorizontalCard key={item._id} video={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playlists;
