import { useDataContext, useGlobalContext } from "../../context";

import EmptyState from "../EmptyState/EmptyState";
import { Loader, HorizontalCard } from "../../components";
import { clearHistory } from "../../services/history";

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
          msg="Look's like you have no videos! Add some..."
        />
      ) : (
        <>
          <div className="flex flex-space-between">
            <h1 className="h3 b-margin-lg">
              History ({historyVideos?.length})
            </h1>
            <button
              className="btn btn-float danger btn-lg"
              onClick={handleClearHistory}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>

          <div className="history-section__videos">
            {historyVideos?.map((video) => (
              <HorizontalCard key={video._id} {...video} type="history" />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default History;
