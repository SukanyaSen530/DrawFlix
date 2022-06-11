import { Routes, Route } from "react-router-dom";

import PreventedRoutes from "./PreventedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import {
  Home,
  VideoListing,
  SignIn,
  SignUp,
  VideoPage,
  Liked,
  WatchLater,
  History,
  EmptyState,
  Playlists,
  UserProfile,
} from "../pages";
import Mockman from "mockman-js";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<VideoListing />} />
      <Route path="/explore/:id" element={<VideoPage />} />
      {/* Protected Routes */}
      <Route
        path="/liked"
        element={
          <ProtectedRoutes>
            <Liked />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/watchlater"
        element={
          <ProtectedRoutes>
            <WatchLater />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoutes>
            <History />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/playlists"
        element={
          <ProtectedRoutes>
            <Playlists />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <UserProfile />
          </ProtectedRoutes>
        }
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
      <Route
        path="/mockman"
        element={
          <div style={{ paddingTop: "20rem" }}>
            <Mockman />
          </div>
        }
      />
      ;
      <Route
        path="*"
        element={
          <EmptyState
            type="not found"
            msg="The page you are looking for does not exist!"
          />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
