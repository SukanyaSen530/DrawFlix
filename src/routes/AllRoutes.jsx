import { Routes, Route } from "react-router-dom";

import PreventedRoutes from "./PreventedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

import { Home, VideoListing, SignIn, SignUp } from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<VideoListing />} />

      {/* Protected Routes */}
      <Route path="/likes" element={<ProtectedRoutes></ProtectedRoutes>} />
      <Route path="/watchlater" element={<ProtectedRoutes></ProtectedRoutes>} />
      <Route path="/playlists" element={<ProtectedRoutes></ProtectedRoutes>} />
      <Route
        path="/playlists/:id"
        element={<ProtectedRoutes></ProtectedRoutes>}
      />

      {/* Prevented Routes */}
      <Route
        path="/signin"
        element={
          <PreventedRoutes>
            <SignIn />
          </PreventedRoutes>
        }
      />
      <Route
        path="/signup"
        element={
          <PreventedRoutes>
            <SignUp />
          </PreventedRoutes>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
