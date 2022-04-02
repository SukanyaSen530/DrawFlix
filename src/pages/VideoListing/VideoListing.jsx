import { useEffect } from "react";

import { useDataContext } from "../../context";

import { getCategories, loadVideos } from "../../services/videos";
import { Loader, VideoCard } from "../../components";
import EmptyState from "../EmptyState/EmptyState";

const VideoListing = () => {
  const {
    dataState: {
      categories,
      vid: { loading, error, items: videos },
    },
    dataDispatch,
  } = useDataContext();

  useEffect(() => {
    if (videos?.length === 0) loadVideos(dataDispatch);
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

  if (videos.length === 0) {
    return (
      <EmptyState
        type="empty"
        msg="Currently no videos to watch :( Come back later!"
      />
    );
  }

  return (
    <section className="explore-section pad-default">
      {/* <select
        className="sort-dropdown"
        value={sortOption}
        onChange={(e) =>
          dispatch({
            type: filterActions.SORT_OPTION,
            payload: e.target.value,
          })
        }
      >
        <option value=""> Sort Options </option>
        {sortData.map((data) => (
          <option key={data.id} value={data.sortType}>
            {data.name}
          </option>
        ))}
      </select> */}
      {/* 
      <div className="explore-section__videos">
        {videos?.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </div> */}
    </section>
  );
};

export default VideoListing;
