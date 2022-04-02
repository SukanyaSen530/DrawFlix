import { useNavigate } from "react-router-dom";

import "./empty-state.scss";
import errorImage from "../../assets/error.png";
import emptyImage from "../../assets/no-video.png";

const EmptyState = ({
  msg = "Unable to fetch data. Check your internet connection!",
  imgSrc = errorImage,
  buttonText = "Go back",
  path,
  type = "error",
}) => {
  const navigate = useNavigate();

  return (
    <section className="error-section">
      <img
        src={
          type === "error" ? errorImage : type === "empty" ? emptyImage : imgSrc
        }
        alt={`${type} image`}
        className="error-img"
      />
      <div>
        <p className="error-text t-margin-sm b-margin-sm">{msg}</p>
        <button
          className="btn btn-contained secondaryLight btn-sm"
          onClick={() => (path ? navigate(path) : navigate(-1))}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default EmptyState;
