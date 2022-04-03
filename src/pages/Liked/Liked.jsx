import { useDataContext } from "../../context";

import EmptyState from "../EmptyState/EmptyState";
import { Loader, VideoCard } from "../../components";

import "./liked.scss";

const Liked = () => {
  const { dataState } = useDataContext();

  const {
    liked: { loading, error, items: likedVideos },
  } = dataState;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <EmptyState msg={error} type="error" path="/explore" />;
  }

  return (
    <section className="liked-section pad-default">
      {likedVideos?.length === 0 ? (
        <EmptyState
          type="empty"
          msg="Look's like you have no videos! Add some..."
        />
      ) : (
        <>
          <h1 className="h3 b-margin-lg">
            Liked Videos ({likedVideos?.length})
          </h1>

          <div className="liked-section__videos">
            {likedVideos?.map((video) => (
              <VideoCard key={video._id} {...video} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Liked;
