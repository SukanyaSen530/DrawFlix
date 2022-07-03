import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PreventedRoutes from "./PreventedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

import { Loader } from "../components";

import EmptyState from "../pages/EmptyState/EmptyState";

const Home = lazy(() => import("../pages/Home/Home"));
const SignIn = lazy(() => import("../pages/Auth/Signin"));
const SignUp = lazy(() => import("../pages/Auth/Signup"));
const VideoListing = lazy(() => import("../pages/VideoListing/VideoListing"));
const VideoPage = lazy(() => import("../pages/VideoPage/VideoPage"));
const Liked = lazy(() => import("../pages/Liked/Liked"));
const WatchLater = lazy(() => import("../pages/WatchLater/WatchLater"));
const History = lazy(() => import("../pages/History/History"));
const Playlists = lazy(() => import("../pages/PlayLists/Playlists"));
const UserProfile = lazy(() => import("../pages/User/UserProfile"));

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/explore"
        element={
          <Suspense fallback={<Loader />}>
            <VideoListing />
          </Suspense>
        }
      />
      <Route
        path="/explore/:id"
        element={
          <Suspense fallback={<Loader />}>
            <VideoPage />
          </Suspense>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/liked"
        element={
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Liked />
            </Suspense>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/watchlater"
        element={
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <WatchLater />
            </Suspense>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <History />
            </Suspense>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/playlists"
        element={
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Playlists />
            </Suspense>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <UserProfile />
            </Suspense>
          </ProtectedRoutes>
        }
      />

      {/* Prevented Routes */}
      <Route
        path="/signin"
        element={
          <PreventedRoutes>
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>
          </PreventedRoutes>
        }
      />
      <Route
        path="/signup"
        element={
          <PreventedRoutes>
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          </PreventedRoutes>
        }
      />

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
