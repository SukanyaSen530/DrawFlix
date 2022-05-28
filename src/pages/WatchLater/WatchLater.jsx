import { useDataContext } from "../../context";

import EmptyState from "../EmptyState/EmptyState";
import { Loader, VideoCard } from "../../components";
import useScrollToTop from "../../hooks/useScrollToTop";

import "./water-later.scss";

const WatchLater = () => {
  const { dataState } = useDataContext();

  const {
    watchLater: { loading, error, items: watchLaterVideos },
  } = dataState;

  useScrollToTop();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <EmptyState msg={error} type="error" path="/explore" />;
  }

  return (
    <section className="watchLater-section pad-default">
      {watchLaterVideos?.length === 0 ? (
        <EmptyState
          type="empty"
          msg="You haven't added any video to watch list..."
          path="/explore"
          buttonText="browse"
        />
      ) : (
        <>
          <h1 className="h3 b-margin-lg">
            Videos to Watch Later ({watchLaterVideos?.length})
          </h1>

          <div className="watchLater-section__videos">
            {watchLaterVideos?.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default WatchLater;
