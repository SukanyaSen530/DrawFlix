import { useNavigate } from "react-router-dom";

import "./empty-state.scss";
import errorImage from "../../assets/error.png";
import emptyImage from "../../assets/no-video.png";
import notFoundImage from "../../assets/pageNotFound.png";

const EmptyState = ({
  msg = "Unable to fetch data. Check your internet connection!",
  imgSrc,
  buttonText = "Go back",
  path,
  type,
}) => {
  const navigate = useNavigate();

  let image = null;

  switch (type) {
    case "error":
      image = errorImage;
      break;
    case "empty":
      image = emptyImage;
      break;
    case "not found":
      image = notFoundImage;
      break;
  }

  return (
    <section className="error-section">
      <img
        src={type ? image : imgSrc}
        alt={`${type} image`}
        className="error-img"
      />
      <div>
        <p className="error-text t-margin-sm b-margin-sm">{msg}</p>
        {path ? (
          <button
            className="btn btn-contained secondaryLight btn-sm empty-btn"
            onClick={() => navigate(path)}
          >
            {buttonText}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default EmptyState;
