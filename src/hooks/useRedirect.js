import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirect = (token, path, delay) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setTimeout(() => navigate(path), delay);
    }
  }, [token, path, delay]);
};

export default useRedirect;
