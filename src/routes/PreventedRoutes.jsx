import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context";

const PreventedRoutes = ({ children }) => {
  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  const location = useLocation();
  const pathName = location?.state?.from?.pathname || "/explore";

  if (token) {
    return <Navigate to={pathName} state={{ from: location }} replace />;
  }

  return children;
};

export default PreventedRoutes;
