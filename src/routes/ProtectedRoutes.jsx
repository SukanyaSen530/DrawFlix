import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context";

const ProtectedRoutes = ({ children }) => {
  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
