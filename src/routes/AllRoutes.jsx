import { Routes, Route } from "react-router-dom";

import { Home, VideoListing, SignIn, SignUp } from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<VideoListing />} />

      {/* Prevented Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
