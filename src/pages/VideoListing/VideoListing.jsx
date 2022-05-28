import { useEffect, useState } from "react";

import { useDataContext } from "../../context";

import { loadVideos, getCategories } from "../../services/videos";
import { Loader, VideoCard, SearchFilter } from "../../components";
import EmptyState from "../EmptyState/EmptyState";

import "./video-listing.scss";

const VideoListing = () => {
  const {
    dataState: {
      vid: { loading, error },
    },
    dataDispatch,
    filteredVideos,
  } = useDataContext();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (filteredVideos?.length === 0) loadVideos(dataDispatch);
  }, []);

  useEffect(() => {
    if (categories.length === 0) getCategories(setCategories);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <EmptyState msg={error} type="error" />;
  }

  return (
    <section className="explore-section pad-default">
      <SearchFilter categories={categories} />
      {filteredVideos.length !== 0 ? (
        <div className="explore-section__videos">
          {filteredVideos?.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <EmptyState type="empty" msg="No videos found!" />
      )}
    </section>
  );
};

export default VideoListing;
