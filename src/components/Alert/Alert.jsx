import { useEffect } from "react";

import "./alert.scss";

import { useGlobalContext } from "../../context";

const Alert = () => {
  const {
    globalState: {
      alert: { message, type, show },
    },
    globalHandlers: { closeAlert },
  } = useGlobalContext();

  useEffect(() => {
    if (show) {
      setTimeout(() => closeAlert(), 1000);
    }
  }, [show]);

  let alertTypeClass = "alert—info";
  switch (type) {
    case "error":
      alertTypeClass = "alert-error";
      break;
    case "info":
      alertTypeClass = "alert-info";
      break;
    case "warning":
      alertTypeClass = "alert-warning";
      break;
    case "success":
      alertTypeClass = "alert-success";
      break;
  }

  if (show)
    return (
      <article className={`alert ${alertTypeClass} ${show ? "animate" : ""}`}>
        {message}
      </article>
    );

  return <></>;
};

export default Alert;
