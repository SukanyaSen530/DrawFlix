import { useEffect, useState, useRef } from "react";
import { useDataContext } from "../../context";

import { loadVideos, getCategories } from "../../services";
import { Loader, VideoCard, SearchFilter } from "../../components";
import EmptyState from "../EmptyState/EmptyState";
import useScrollToTop from "../../hooks/useScrollToTop";

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

  useScrollToTop();

  useEffect(() => {
    if (filteredVideos?.length === 0) loadVideos(dataDispatch);
  }, []);

  useEffect(() => {
    if (categories.length === 0) getCategories(setCategories);
  }, []);

  // Infinite Laoding
  const numOfVideosToShow = 6;
  const loadingRef = useRef(null);
  const [page, setPage] = useState(1);
  const videosLength = filteredVideos.length;
  const hasMoreVideos = page <= Math.floor(videosLength / page);
  const [infinteLoading, setInfiniteLoading] = useState(false);
  let interval = null;

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMoreVideos) {
      setInfiniteLoading(true);
      interval = setTimeout(() => {
        setInfiniteLoading(false);
        setPage((prevPage) => prevPage + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    const currentTarget = loadingRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
      root: null,
      rootMargin: "0px",
    });
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (interval) clearInterval(interval);
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMoreVideos]);

  const lazyLoadedVideos = filteredVideos.slice(0, page * numOfVideosToShow);

  if (loading) return <Loader />;
  if (error) <EmptyState msg={error} type="error" />;

  return (
    <section className="explore-section pad-default">
      <SearchFilter categories={categories} />

      {filteredVideos.length !== 0 ? (
        <>
          <div className="explore-section__videos">
            {lazyLoadedVideos?.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
          <div ref={loadingRef} className="t-margin-md b-margin-md">
            {infinteLoading && hasMoreVideos ? <Loader size="sm" /> : null}
          </div>
        </>
      ) : (
        <EmptyState type="empty" msg="No videos found!" />
      )}
    </section>
  );
};

export default VideoListing;
