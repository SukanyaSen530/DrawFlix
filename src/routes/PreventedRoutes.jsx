import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context";

const PreventedRoutes = ({ children }) => {
  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  let location = useLocation();

  if (token) {
    return <Navigate to="/explore" state={{ from: location }} replace />;
  }

  return children;
};

export default PreventedRoutes;
