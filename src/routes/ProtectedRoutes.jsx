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
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoutes;
