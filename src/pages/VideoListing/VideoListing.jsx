import { useEffect } from "react";

import { useDataContext } from "../../context";

import { getCategories, loadVideos } from "../../services/videos";
import { Loader, VideoCard } from "../../components";
import EmptyState from "../EmptyState/EmptyState";

import "./video-listing.scss";

const VideoListing = () => {
  const {
    dataState: {
      categories,
      vid: { loading, error },
      filteredVideos,
    },
    dataDispatch,
  } = useDataContext();

  useEffect(() => {
    if (filteredVideos?.length === 0) loadVideos(dataDispatch);
  }, []);

  useEffect(() => {
    if (categories?.length === 0) getCategories(dataDispatch);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <EmptyState msg={error} type="error" />;
  }

  if (filteredVideos?.length === 0) {
    return (
      <EmptyState
        type="empty"
        msg="Currently no videos to watch :( Come back later!"
      />
    );
  }

  return (
    <section className="explore-section pad-default">
      <div className="explore-section__videos">
        {filteredVideos?.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </div>
    </section>
  );
};

export default VideoListing;
