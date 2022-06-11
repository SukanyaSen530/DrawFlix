import { useDataContext, useGlobalContext } from "../../context";

import EmptyState from "../EmptyState/EmptyState";
import { Loader, HorizontalCard } from "../../components";
import { clearHistory } from "../../services";
import useScrollToTop from "../../hooks/useScrollToTop";

import "./history.scss";

const History = () => {
  const {
    dataState: {
      history: { loading, error, items: historyVideos },
    },
    dataDispatch,
  } = useDataContext();
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  useScrollToTop();

  const handleClearHistory = () => {
    clearHistory(dataDispatch, openAlert);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <EmptyState msg={error} type="error" path="/explore" />;
  }

  return (
    <section className="history-section pad-default">
      {historyVideos?.length === 0 ? (
        <EmptyState
          type="empty"
          msg="You haven't watched any video..."
          path="/explore"
          buttonText="browse"
        />
      ) : (
        <>
          <div className="flex flex-space-between flex-center-y">
            <h1 className="h3 b-margin-lg">
              History ({historyVideos?.length})
            </h1>
            <button
              className="btn btn-contained danger btn-md"
              onClick={handleClearHistory}
            >
              Clear History
            </button>
          </div>

          <div className="history-section__videos">
            {historyVideos?.map((video) => (
              <HorizontalCard key={video._id} video={video} type="history" />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default History;
